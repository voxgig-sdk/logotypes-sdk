

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


describe('LogoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOGOTYPES_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOGOTYPES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LogotypesSDK.test()
    const ent = testsdk.Logo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOGOTYPES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'logo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"logo","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"variant","orig":"variant","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"version","orig":"version","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /random","json":"{\"operationId\":\"getRandomLogo\",\"parameters\":[{\"description\":\"The variant of the logo to retrieve\",\"in\":\"query\",\"name\":\"variant\",\"required\":false,\"schema\":{\"enum\":[\"glyph\",\"wordmark\"],\"type\":\"string\"}},{\"description\":\"The color version of the logo to retrieve\",\"in\":\"query\",\"name\":\"version\",\"required\":false,\"schema\":{\"enum\":[\"color\",\"white\",\"black\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/svg+xml\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully retrieved a random logo image\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/random","segments":[{"lit":"random"}],"select":{"exist":["variant","version"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"logo","name__orig":"logo","Name":"Logo","name_":"logo","name-":"logo","NAME":"LOGO","index$":3}, {"active":true,"entity":"logo","key$":"BasicLogoFlow","kind":"basic","name":"BasicLogoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"logo_ref01","srcdatavar":"logo_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-logo_ref01"}}],"index$":0}]}, 'Logo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let logo_ref01_data = Object.values(setup.data.existing.logo)[0] as any

    // LOAD
    const logo_ref01_ent = client.Logo()
    const logo_ref01_match_dt0: any = {}
    const logo_ref01_data_dt0 = (await logo_ref01_ent.load(logo_ref01_match_dt0)).data()
    assert(null != logo_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/logo/LogoTestData.json')

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
    ['logo01','logo02','logo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOGOTYPES_TEST_LOGO_ENTID': idmap,
    'LOGOTYPES_TEST_LIVE': 'FALSE',
    'LOGOTYPES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LOGOTYPES_TEST_LOGO_ENTID']

  const live = 'TRUE' === env.LOGOTYPES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOGOTYPES_TEST_LOGO_ENTID']
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
  
