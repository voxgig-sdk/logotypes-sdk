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
---@field variants? table
---@field versions? table

---@class AllListMatch
---@field name? string
---@field url? string
---@field variants? table
---@field versions? table

---@class Data
---@field name? string
---@field url? string
---@field variants? table
---@field versions? table

---@class DataListMatch
---@field variant? string
---@field version? string

---@class GetLogoByName
---@field id? string

---@class GetLogoByNameLoadMatch
---@field id string
---@field variant? string
---@field version? string

---@class Logo

---@class LogoLoadMatch
---@field variant? string
---@field version? string

local M = {}

return M
