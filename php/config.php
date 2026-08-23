<?php
declare(strict_types=1);

// Logotypes SDK configuration

class LogotypesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Logotypes",
                "slug" => "logotypes",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.logotypes.dev",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "all" => [],
                    "data" => [],
                    "get_logo_by_name" => [],
                    "logo" => [],
                ],
            ],
            "entity" => [
        'all' => [
          'fields' => [
            [
              'name' => 'name',
              'short' => 'The name of the logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'The URL to access the logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variants',
              'short' => 'Available variants for the logo',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'versions',
              'short' => 'Available color versions for the logo',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'all',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/all',
                  'parts' => [
                    'all',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'data' => [
          'fields' => [
            [
              'name' => 'name',
              'short' => 'The name of the logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'The URL to access the logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variants',
              'short' => 'Available variants for the logo',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'versions',
              'short' => 'Available color versions for the logo',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'variant',
                        'orig' => 'variant',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'version',
                        'orig' => 'version',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random/data',
                  'parts' => [
                    'random',
                    'data',
                  ],
                  'select' => [
                    'exist' => [
                      'variant',
                      'version',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'spotify',
                        'kind' => 'param',
                        'name' => 'logo_name',
                        'orig' => 'logo_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{logoName}/data',
                  'parts' => [
                    '{logo_name}',
                    'data',
                  ],
                  'rename' => [
                    'param' => [
                      'logoName' => 'logo_name',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'logo_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_logo_by_name' => [
          'fields' => [],
          'name' => 'get_logo_by_name',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'spotify',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'logo_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'variant',
                        'orig' => 'variant',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'version',
                        'orig' => 'version',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{logoName}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'logoName' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'variant',
                      'version',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'logo' => [
          'fields' => [],
          'name' => 'logo',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'variant',
                        'orig' => 'variant',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'version',
                        'orig' => 'version',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random',
                  'parts' => [
                    'random',
                  ],
                  'select' => [
                    'exist' => [
                      'variant',
                      'version',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LogotypesFeatures::make_feature($name);
    }
}
