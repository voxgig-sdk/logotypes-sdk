-- Typed models for the Logotypes SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class All
---@field name? string
---@field url? string
---@field variant? table
---@field version? table

---@class AllListMatch
---@field name? string
---@field url? string
---@field variant? table
---@field version? table

---@class Data
---@field name? string
---@field url? string
---@field variant? table
---@field version? table

---@class DataListMatch
---@field logo_name string

---@class GetLogoByName

---@class GetLogoByNameLoadMatch
---@field id string

---@class Logo

---@class LogoLoadMatch

local M = {}

return M
