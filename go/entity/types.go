// Typed models for the Logotypes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// All is the typed data model for the all entity.
type All struct {
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *[]any `json:"variant,omitempty"`
	Version *[]any `json:"version,omitempty"`
}

// AllListMatch mirrors the all fields as an all-optional match
// filter (Go analog of Partial<All>).
type AllListMatch struct {
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *[]any `json:"variant,omitempty"`
	Version *[]any `json:"version,omitempty"`
}

// Data is the typed data model for the data entity.
type Data struct {
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *[]any `json:"variant,omitempty"`
	Version *[]any `json:"version,omitempty"`
}

// DataListMatch is the typed request payload for Data.ListTyped.
type DataListMatch struct {
	LogoName string `json:"logo_name"`
}

// GetLogoByName is the typed data model for the get_logo_by_name entity.
type GetLogoByName struct {
}

// GetLogoByNameLoadMatch is the typed request payload for GetLogoByName.LoadTyped.
type GetLogoByNameLoadMatch struct {
	Id string `json:"id"`
}

// Logo is the typed data model for the logo entity.
type Logo struct {
}

// LogoLoadMatch mirrors the logo fields as an all-optional match
// filter (Go analog of Partial<Logo>).
type LogoLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
