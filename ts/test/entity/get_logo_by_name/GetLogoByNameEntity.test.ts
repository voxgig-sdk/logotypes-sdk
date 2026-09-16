

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LogotypesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetLogoByNameEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOGOTYPES_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOGOTYPES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LogotypesSDK.test()
    const ent = testsdk.GetLogoByName()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOGOTYPES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_logo_by_name.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"get_logo_by_name","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"spotify","kind":"param","name":"id","orig":"logo_name","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"variant","orig":"variant","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"version","orig":"version","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{logoName}","json":"{\"operationId\":\"getLogoByName\",\"parameters\":[{\"description\":\"The name of the logo to retrieve (e.g., 'spotify', 'apple')\",\"example\":\"spotify\",\"in\":\"path\",\"name\":\"logoName\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The variant of the logo to retrieve\",\"in\":\"query\",\"name\":\"variant\",\"required\":false,\"schema\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"}},{\"description\":\"The color version of the logo to retrieve\",\"in\":\"query\",\"name\":\"version\",\"required\":false,\"schema\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/svg+xml\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully retrieved the specified logo image\"},\"404\":{\"description\":\"Logo not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{logoName}","rename":{"param":{"logoName":"id"}},"segments":[{"var":"id"}],"select":{"exist":["id","variant","version"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_logo_by_name","name__orig":"get_logo_by_name","Name":"GetLogoByName","name_":"get_logo_by_name","name-":"get-logo-by-name","NAME":"GET_LOGO_BY_NAME","index$":2}, {"active":true,"entity":"get_logo_by_name","key$":"BasicGetLogoByNameFlow","kind":"basic","name":"BasicGetLogoByNameFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_logo_by_name_ref01","srcdatavar":"get_logo_by_name_ref01_data","suffix":"_dt0"},"match":{"id":"get_logo_by_name01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_logo_by_name_ref01"}}],"index$":0}]}, 'GetLogoByName')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_logo_by_name_ref01_data = Object.values(setup.data.existing.get_logo_by_name)[0] as any

    // LOAD
    const get_logo_by_name_ref01_ent = client.GetLogoByName()
    const get_logo_by_name_ref01_match_dt0: any = {}
    get_logo_by_name_ref01_match_dt0.id = get_logo_by_name_ref01_data.id
    const get_logo_by_name_ref01_data_dt0 = (await get_logo_by_name_ref01_ent.load(get_logo_by_name_ref01_match_dt0)).data()
    assert(get_logo_by_name_ref01_data_dt0.id === get_logo_by_name_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_logo_by_name/GetLogoByNameTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LogotypesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_logo_by_name01','get_logo_by_name02','get_logo_by_name03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID': idmap,
    'LOGOTYPES_TEST_LIVE': 'FALSE',
    'LOGOTYPES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID']

  const live = 'TRUE' === env.LOGOTYPES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOGOTYPES_TEST_GET_LOGO_BY_NAME_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LogotypesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
