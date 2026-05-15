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

func TestDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Data(nil)
		if ent == nil {
			t.Fatal("expected non-nil DataEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "data." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LOGOTYPES_TEST_DATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		dataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.data", setup.data)))
		var dataRef01Data map[string]any
		if len(dataRef01DataRaw) > 0 {
			dataRef01Data = core.ToMapAny(dataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = dataRef01Data

		// LIST
		dataRef01Ent := client.Data(nil)
		dataRef01Match := map[string]any{
			"logo_name": setup.idmap["logo_name01"],
		}

		dataRef01ListResult, err := dataRef01Ent.List(dataRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, dataRef01ListOk := dataRef01ListResult.([]any)
		if !dataRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", dataRef01ListResult)
		}

	})
}

func dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "data", "DataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"data01", "data02", "data03", "logo_name01"},
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
	entidEnvRaw := os.Getenv("LOGOTYPES_TEST_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOGOTYPES_TEST_DATA_ENTID": idmap,
		"LOGOTYPES_TEST_LIVE":      "FALSE",
		"LOGOTYPES_TEST_EXPLAIN":   "FALSE",
		"LOGOTYPES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LOGOTYPES_TEST_DATA_ENTID"])
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
