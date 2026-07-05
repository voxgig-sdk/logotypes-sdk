// Typed models for the Logotypes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface All {
  name?: string
  url?: string
  variant?: any[]
  version?: any[]
}

export interface AllListMatch {
  name?: string
  url?: string
  variant?: any[]
  version?: any[]
}

export interface Data {
  name?: string
  url?: string
  variant?: any[]
  version?: any[]
}

export interface DataListMatch {
  logo_name: string
}

export interface GetLogoByName {
}

export interface GetLogoByNameLoadMatch {
  id: string
}

export interface Logo {
}

export interface LogoLoadMatch {
}

