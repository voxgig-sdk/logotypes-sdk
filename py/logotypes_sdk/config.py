# Logotypes SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
                "parts": [
                  "all",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "random",
                  "data",
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
                "parts": [
                  "{logo_name}",
                  "data",
                ],
                "rename": {
                  "param": {
                    "logoName": "logo_name",
                  },
                },
                "select": {
                  "exist": [
                    "logo_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "logoName": "id",
                  },
                },
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
                "parts": [
                  "random",
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
