<?php
declare(strict_types=1);

// Typed models for the Logotypes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** All entity data model. */
class All
{
    public ?string $name = null;
    public ?string $url = null;
    public ?array $variant = null;
    public ?array $version = null;
}

/** Request payload for All#list. */
class AllListMatch
{
    public ?string $name = null;
    public ?string $url = null;
    public ?array $variant = null;
    public ?array $version = null;
}

/** Data entity data model. */
class Data
{
    public ?string $name = null;
    public ?string $url = null;
    public ?array $variant = null;
    public ?array $version = null;
}

/** Request payload for Data#list. */
class DataListMatch
{
    public ?string $logo_name = null;
}

/** GetLogoByName entity data model. */
class GetLogoByName
{
}

/** Request payload for GetLogoByName#load. */
class GetLogoByNameLoadMatch
{
    public string $id;
}

/** Logo entity data model. */
class Logo
{
}

/** Request payload for Logo#load. */
class LogoLoadMatch
{
}

