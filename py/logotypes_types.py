# Typed models for the Logotypes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class All:
    name: Optional[str] = None
    url: Optional[str] = None
    variant: Optional[list] = None
    version: Optional[list] = None


@dataclass
class AllListMatch:
    name: Optional[str] = None
    url: Optional[str] = None
    variant: Optional[list] = None
    version: Optional[list] = None


@dataclass
class Data:
    name: Optional[str] = None
    url: Optional[str] = None
    variant: Optional[list] = None
    version: Optional[list] = None


@dataclass
class DataListMatch:
    logo_name: str


@dataclass
class GetLogoByName:
    pass


@dataclass
class GetLogoByNameLoadMatch:
    id: str


@dataclass
class Logo:
    pass


@dataclass
class LogoLoadMatch:
    pass

