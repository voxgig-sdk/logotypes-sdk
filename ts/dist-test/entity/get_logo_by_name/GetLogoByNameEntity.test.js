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
(0, node_test_1.describe)('GetLogoByNameEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOGOTYPES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOGOTYPES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LogotypesSDK.test();
        const ent = testsdk.GetLogoByName();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOGOTYPES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_logo_by_name.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }], "id": { "field": "id", "name": "id" }, "name": "get_logo_by_name", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "spotify", "kind": "param", "name": "id", "orig": "logo_name", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "variant", "orig": "variant", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "version", "orig": "version", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /{logoName}", "json": "{\"operationId\":\"getLogoByName\",\"parameters\":[{\"description\":\"The name of the logo to retrieve (e.g., 'spotify', 'apple')\",\"example\":\"spotify\",\"in\":\"path\",\"name\":\"logoName\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The variant of the logo to retrieve\",\"in\":\"query\",\"name\":\"variant\",\"required\":false,\"schema\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"}},{\"description\":\"The color version of the logo to retrieve\",\"in\":\"query\",\"name\":\"version\",\"required\":false,\"schema\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/svg+xml\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully retrieved the specified logo image\"},\"404\":{\"description\":\"Logo not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{logoName}", "rename": { "param": { "logoName": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["id", "variant", "version"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_logo_by_name", "name__orig": "get_logo_by_name", "Name": "GetLogoByName", "name_": "get_logo_by_name", "name-": "get-logo-by-name", "NAME": "GET_LOGO_BY_NAME", "index$": 2 }, { "active": true, "entity": "get_logo_by_name", "key$": "BasicGetLogoByNameFlow", "kind": "basic", "name": "BasicGetLogoByNameFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_logo_by_name_ref01", "srcdatavar": "get_logo_by_name_ref01_data", "suffix": "_dt0" }, "match": { "id": "get_logo_by_name01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_logo_by_name_ref01" } }], "index$": 0 }] }, 'GetLogoByName');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_logo_by_name_ref01_data = Object.values(setup.data.existing.get_logo_by_name)[0];
        // LOAD
        const get_logo_by_name_ref01_ent = client.GetLogoByName();
        const get_logo_by_name_ref01_match_dt0 = {};
        get_logo_by_name_ref01_match_dt0.id = get_logo_by_name_ref01_data.id;
        const get_logo_by_name_ref01_data_dt0 = (await get_logo_by_name_ref01_ent.load(get_logo_by_name_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_logo_by_name_ref01_data_dt0.id === get_logo_by_name_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_logo_by_name/GetLogoByNameTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LogotypesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_logo_by_name01', 'get_logo_by_name02', 'get_logo_by_name03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID': idmap,
        'LOGOTYPES_TEST_LIVE': 'FALSE',
        'LOGOTYPES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID'];
    const live = 'TRUE' === env.LOGOTYPES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID'];
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
//# sourceMappingURL=GetLogoByNameEntity.test.js.map