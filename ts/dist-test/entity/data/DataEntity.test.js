"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOGOTYPES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOGOTYPES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LogotypesSDK.test();
        const ent = testsdk.Data();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOGOTYPES_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "name", "req": false, "short": "The name of the logo", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "url", "req": false, "short": "The URL to access the logo", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "variants", "req": false, "short": "Available variants for the logo", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "versions", "req": false, "short": "Available color versions for the logo", "type": "`$ARRAY`", "index$": 3 }], "name": "data", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "variant", "orig": "variant", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "version", "orig": "version", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /random/data", "json": "{\"operationId\":\"getRandomLogoData\",\"parameters\":[{\"description\":\"The variant of the logo to retrieve data for\",\"in\":\"query\",\"name\":\"variant\",\"required\":false,\"schema\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"}},{\"description\":\"The color version of the logo to retrieve data for\",\"in\":\"query\",\"name\":\"version\",\"required\":false,\"schema\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Metadata information about a logo\",\"properties\":{\"name\":{\"description\":\"The name of the logo\",\"example\":\"spotify\",\"type\":\"string\"},\"url\":{\"description\":\"The URL to access the logo\",\"example\":\"https://www.logotypes.dev/spotify\",\"type\":\"string\"},\"variants\":{\"description\":\"Available variants for the logo\",\"items\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"},\"type\":\"array\"},\"versions\":{\"description\":\"Available color versions for the logo\",\"items\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved random logo data\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/random/data", "segments": [{ "lit": "random" }, { "lit": "data" }], "select": { "exist": ["variant", "version"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "spotify", "kind": "param", "name": "logo_name", "orig": "logo_name", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{logoName}/data", "json": "{\"operationId\":\"getLogoDataByName\",\"parameters\":[{\"description\":\"The name of the logo to retrieve data for (e.g., 'spotify', 'apple')\",\"example\":\"spotify\",\"in\":\"path\",\"name\":\"logoName\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Metadata information about a logo\",\"properties\":{\"name\":{\"description\":\"The name of the logo\",\"example\":\"spotify\",\"type\":\"string\"},\"url\":{\"description\":\"The URL to access the logo\",\"example\":\"https://www.logotypes.dev/spotify\",\"type\":\"string\"},\"variants\":{\"description\":\"Available variants for the logo\",\"items\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"},\"type\":\"array\"},\"versions\":{\"description\":\"Available color versions for the logo\",\"items\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved logo data\"},\"404\":{\"description\":\"Logo not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{logoName}/data", "rename": { "param": { "logoName": "logo_name" } }, "segments": [{ "var": "logo_name" }, { "lit": "data" }], "select": { "exist": ["logo_name"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "data", "name__orig": "data", "Name": "Data", "name_": "data", "name-": "data", "NAME": "DATA", "index$": 1 }, { "active": true, "entity": "data", "key$": "BasicDataFlow", "kind": "basic", "name": "BasicDataFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "logo_name": "logo_name01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "data_ref01" } }], "index$": 0 }] }, 'Data');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let data_ref01_data = Object.values(setup.data.existing.data)[0];
        // LIST
        const data_ref01_ent = client.Data();
        const data_ref01_match = {};
        data_ref01_match['logo_name'] = setup.idmap['logo_name01'];
        const data_ref01_list = (await data_ref01_ent.list(data_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/data/DataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LogotypesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['data01', 'data02', 'data03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOGOTYPES_TEST_DATA_ENTID': idmap,
        'LOGOTYPES_TEST_LIVE': 'FALSE',
        'LOGOTYPES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LOGOTYPES_TEST_DATA_ENTID'];
    const live = 'TRUE' === env.LOGOTYPES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOGOTYPES_TEST_DATA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LogotypesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LOGOTYPES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DataEntity.test.js.map