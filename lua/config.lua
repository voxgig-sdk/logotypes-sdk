-- Logotypes SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Logotypes",
      slug = "logotypes",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.logotypes.dev",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["all"] = {},
        ["data"] = {},
        ["get_logo_by_name"] = {},
        ["logo"] = {},
      },
    },
    entity = {
      ["all"] = {
        ["fields"] = {
          {
            ["name"] = "name",
            ["short"] = "The name of the logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "The URL to access the logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "variants",
            ["short"] = "Available variants for the logo",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "versions",
            ["short"] = "Available color versions for the logo",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "all",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/all",
                ["parts"] = {
                  "all",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["data"] = {
        ["fields"] = {
          {
            ["name"] = "name",
            ["short"] = "The name of the logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "The URL to access the logo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "variants",
            ["short"] = "Available variants for the logo",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "versions",
            ["short"] = "Available color versions for the logo",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "variant",
                      ["orig"] = "variant",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "version",
                      ["orig"] = "version",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random/data",
                ["parts"] = {
                  "random",
                  "data",
                },
                ["select"] = {
                  ["exist"] = {
                    "variant",
                    "version",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "spotify",
                      ["kind"] = "param",
                      ["name"] = "logo_name",
                      ["orig"] = "logo_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{logoName}/data",
                ["parts"] = {
                  "{logo_name}",
                  "data",
                },
                ["rename"] = {
                  ["param"] = {
                    ["logoName"] = "logo_name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "logo_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_logo_by_name"] = {
        ["fields"] = {},
        ["name"] = "get_logo_by_name",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "spotify",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "logo_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "variant",
                      ["orig"] = "variant",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "version",
                      ["orig"] = "version",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{logoName}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["logoName"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "variant",
                    "version",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["logo"] = {
        ["fields"] = {},
        ["name"] = "logo",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "variant",
                      ["orig"] = "variant",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "version",
                      ["orig"] = "version",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random",
                ["parts"] = {
                  "random",
                },
                ["select"] = {
                  ["exist"] = {
                    "variant",
                    "version",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
