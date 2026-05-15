package = "voxgig-sdk-logotypes"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/logotypes-sdk.git"
}
description = {
  summary = "Logotypes SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["logotypes_sdk"] = "logotypes_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
