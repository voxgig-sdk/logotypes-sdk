# Logotypes SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Logotypes",
            "slug": "logotypes",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.logotypes.dev",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "all": {},
                "data": {},
                "get_logo_by_name": {},
                "logo": {},
            },
        },
        "entity": {
      "all": {
        "fields": [
          {
            "name": "name",
            "short": "The name of the logo",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "The URL to access the logo",
            "type": "`$STRING`",
          },
          {
            "name": "variants",
            "short": "Available variants for the logo",
            "type": "`$ARRAY`",
          },
          {
            "name": "versions",
            "short": "Available color versions for the logo",
            "type": "`$ARRAY`",
          },
        ],
        "name": "all",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/all",
                "segments": [
                  {
                    "lit": "all",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "all",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "data": {
        "fields": [
          {
            "name": "name",
            "short": "The name of the logo",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "The URL to access the logo",
            "type": "`$STRING`",
          },
          {
            "name": "variants",
            "short": "Available variants for the logo",
            "type": "`$ARRAY`",
          },
          {
            "name": "versions",
            "short": "Available color versions for the logo",
            "type": "`$ARRAY`",
          },
        ],
        "name": "data",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "variant",
                      "orig": "variant",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/random/data",
                "segments": [
                  {
                    "lit": "random",
                  },
                  {
                    "lit": "data",
                  },
                ],
                "select": {
                  "exist": [
                    "variant",
                    "version",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "random",
                  "data",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "spotify",
                      "kind": "param",
                      "name": "logo_name",
                      "orig": "logo_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{logoName}/data",
                "rename": {
                  "param": {
                    "logoName": "logo_name",
                  },
                },
                "segments": [
                  {
                    "var": "logo_name",
                  },
                  {
                    "lit": "data",
                  },
                ],
                "select": {
                  "exist": [
                    "logo_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "{logo_name}",
                  "data",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_logo_by_name": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "get_logo_by_name",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "spotify",
                      "kind": "param",
                      "name": "id",
                      "orig": "logo_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "variant",
                      "orig": "variant",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{logoName}",
                "rename": {
                  "param": {
                    "logoName": "id",
                  },
                },
                "segments": [
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "variant",
                    "version",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "logo": {
        "fields": [],
        "name": "logo",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "variant",
                      "orig": "variant",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/random",
                "segments": [
                  {
                    "lit": "random",
                  },
                ],
                "select": {
                  "exist": [
                    "variant",
                    "version",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "random",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
