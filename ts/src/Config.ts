
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Logotypes',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        },
        {
          "name": "variants",
          "type": "`$ARRAY`"
        },
        {
          "name": "versions",
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
              "parts": [
                "all"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        },
        {
          "name": "variants",
          "type": "`$ARRAY`"
        },
        {
          "name": "versions",
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
              "parts": [
                "random",
                "data"
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
              }
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
              "parts": [
                "{logo_name}",
                "data"
              ],
              "rename": {
                "param": {
                  "logoName": "logo_name"
                }
              },
              "select": {
                "exist": [
                  "logo_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_logo_by_name": {
      "fields": [],
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
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "logoName": "id"
                }
              },
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
              }
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
              "parts": [
                "random"
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
              }
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
  config
}

