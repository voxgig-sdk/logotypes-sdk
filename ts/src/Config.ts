
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Logotypes',
        slug: "logotypes",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.logotypes.dev",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      all: {
      },

      data: {
      },

      get_logo_by_name: {
      },

      logo: {
      },

    }
  }


  entity = {
    "all": {
      "fields": [
        {
          "name": "name",
          "short": "The name of the logo",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The URL to access the logo",
          "type": "`$STRING`"
        },
        {
          "name": "variants",
          "short": "Available variants for the logo",
          "type": "`$ARRAY`"
        },
        {
          "name": "versions",
          "short": "Available color versions for the logo",
          "type": "`$ARRAY`"
        }
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
                  "lit": "all"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "all"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "data": {
      "fields": [
        {
          "name": "name",
          "short": "The name of the logo",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The URL to access the logo",
          "type": "`$STRING`"
        },
        {
          "name": "variants",
          "short": "Available variants for the logo",
          "type": "`$ARRAY`"
        },
        {
          "name": "versions",
          "short": "Available color versions for the logo",
          "type": "`$ARRAY`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/random/data",
              "segments": [
                {
                  "lit": "random"
                },
                {
                  "lit": "data"
                }
              ],
              "select": {
                "exist": [
                  "variant",
                  "version"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "random",
                "data"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "example": "spotify",
                    "kind": "param",
                    "name": "logo_name",
                    "orig": "logo_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{logoName}/data",
              "rename": {
                "param": {
                  "logoName": "logo_name"
                }
              },
              "segments": [
                {
                  "var": "logo_name"
                },
                {
                  "lit": "data"
                }
              ],
              "select": {
                "exist": [
                  "logo_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{logo_name}",
                "data"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_logo_by_name": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "variant",
                    "orig": "variant",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{logoName}",
              "rename": {
                "param": {
                  "logoName": "id"
                }
              },
              "segments": [
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "variant",
                  "version"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/random",
              "segments": [
                {
                  "lit": "random"
                }
              ],
              "select": {
                "exist": [
                  "variant",
                  "version"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "random"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

