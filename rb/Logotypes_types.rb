# frozen_string_literal: true

# Typed models for the Logotypes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# All entity data model.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variants
#   @return [Array, nil]
#
# @!attribute [rw] versions
#   @return [Array, nil]
All = Struct.new(
  :name,
  :url,
  :variants,
  :versions,
  keyword_init: true
)

# Request payload for All#list.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variants
#   @return [Array, nil]
#
# @!attribute [rw] versions
#   @return [Array, nil]
AllListMatch = Struct.new(
  :name,
  :url,
  :variants,
  :versions,
  keyword_init: true
)

# Data entity data model.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variants
#   @return [Array, nil]
#
# @!attribute [rw] versions
#   @return [Array, nil]
DataType = Struct.new(
  :name,
  :url,
  :variants,
  :versions,
  keyword_init: true
)

# Request payload for Data#list.
#
# @!attribute [rw] variant
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
DataListMatch = Struct.new(
  :variant,
  :version,
  keyword_init: true
)

# GetLogoByName entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
GetLogoByName = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for GetLogoByName#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] variant
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GetLogoByNameLoadMatch = Struct.new(
  :id,
  :variant,
  :version,
  keyword_init: true
)

# Logo entity data model.
class Logo
end

# Request payload for Logo#load.
#
# @!attribute [rw] variant
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
LogoLoadMatch = Struct.new(
  :variant,
  :version,
  keyword_init: true
)

