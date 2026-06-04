# Logotypes SDK

Fetch brand logos by name or at random, with glyph/wordmark variants and color/black/white versions

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Logotypes API

[Logotypes](https://www.logotypes.dev) is an open-source logo catalogue served as a small HTTP API. It is maintained by [@yceballost](https://github.com/yceballost) and indexes a wide range of brand logos that you can pull into projects such as design tools, dashboards, and demos.

What you get from the API:

- A random logo via `/random`, or a random logo's metadata via `/random/data`.
- A specific logo by slug via `/{logoname}` (for example `/spotify`, `/apple`), and its metadata via `/{logoname}/data`.
- The full catalogue listing via `/all`.
- Query parameters `variant` (`glyph`, `wordmark`) and `version` (`color`, `black`, `white`) to choose which rendering to return.

Operational notes: no authentication is required, CORS is enabled, and responses are typically served in the low-seconds range. Rate limits are not published — treat the service as a best-effort community resource.

## Try it

**TypeScript**
```bash
npm install logotypes
```

**Python**
```bash
pip install logotypes-sdk
```

**PHP**
```bash
composer require voxgig/logotypes-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/logotypes-sdk/go
```

**Ruby**
```bash
gem install logotypes-sdk
```

**Lua**
```bash
luarocks install logotypes-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { LogotypesSDK } from 'logotypes'

const client = new LogotypesSDK({})

// List all alls
const alls = await client.All().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o logotypes-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "logotypes": {
      "command": "/abs/path/to/logotypes-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **All** | The complete logo catalogue listing, served from `/all`. | `/all` |
| **Data** | Metadata responses describing a logo (name, available variants and versions), reachable via `/{logoname}/data` and `/random/data`. | `/random/data` |
| **GetLogoByName** | Retrieves a specific logo by its slug, e.g. `/spotify` or `/apple`, with optional `variant` and `version` query parameters. | `/{logoName}` |
| **Logo** | A single logo image resource returned by `/{logoname}` or `/random`, optionally filtered with `variant=glyph|wordmark` and `version=color|black|white`. | `/random` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from logotypes_sdk import LogotypesSDK

client = LogotypesSDK({})

# List all alls
alls, err = client.All(None).list(None, None)
```

### PHP

```php
<?php
require_once 'logotypes_sdk.php';

$client = new LogotypesSDK([]);

// List all alls
[$alls, $err] = $client->All(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/logotypes-sdk/go"

client := sdk.NewLogotypesSDK(map[string]any{})

// List all alls
alls, err := client.All(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Logotypes_sdk"

client = LogotypesSDK.new({})

# List all alls
alls, err = client.All(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("logotypes_sdk")

local client = sdk.new({})

-- List all alls
local alls, err = client:All(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = LogotypesSDK.test()
const result = await client.All().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = LogotypesSDK.test(None, None)
result, err = client.All(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = LogotypesSDK::test(null, null);
[$result, $err] = $client->All(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.All(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = LogotypesSDK.test(nil, nil)
result, err = client.All(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:All(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Logotypes API

- Upstream: [https://www.logotypes.dev](https://www.logotypes.dev)

- The Logotypes project itself is open source and maintained on GitHub by [@yceballost](https://github.com/yceballost).
- Logos are trademarks of their respective brand owners; you are responsible for respecting each brand's usage guidelines.
- No authentication or API key required at the time of writing.
- Attribution: © Logotypes.dev.

---

Generated from the Logotypes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
