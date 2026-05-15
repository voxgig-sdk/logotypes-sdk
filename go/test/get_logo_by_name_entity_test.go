package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/logotypes-sdk"
	"github.com/voxgig-sdk/logotypes-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGetLogoByNameEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetLogoByName(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetLogoByNameEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_logo_by_nameBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_logo_by_name." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getLogoByNameRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_logo_by_name", setup.data)))
		var getLogoByNameRef01Data map[string]any
		if len(getLogoByNameRef01DataRaw) > 0 {
			getLogoByNameRef01Data = core.ToMapAny(getLogoByNameRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getLogoByNameRef01Data

		// LOAD
		getLogoByNameRef01Ent := client.GetLogoByName(nil)
		getLogoByNameRef01MatchDt0 := map[string]any{}
		getLogoByNameRef01DataDt0Loaded, err := getLogoByNameRef01Ent.Load(getLogoByNameRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getLogoByNameRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func get_logo_by_nameBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_logo_by_name", "GetLogoByNameTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_logo_by_name test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_logo_by_name test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_logo_by_name01", "get_logo_by_name02", "get_logo_by_name03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID": idmap,
		"LOGOTYPES_TEST_LIVE":      "FALSE",
		"LOGOTYPES_TEST_EXPLAIN":   "FALSE",
		"LOGOTYPES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LOGOTYPES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LOGOTYPES_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLogotypesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LOGOTYPES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LOGOTYPES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
