package voxgiglogotypessdk

import (
	"github.com/voxgig-sdk/logotypes-sdk/go/core"
	"github.com/voxgig-sdk/logotypes-sdk/go/entity"
	"github.com/voxgig-sdk/logotypes-sdk/go/feature"
	_ "github.com/voxgig-sdk/logotypes-sdk/go/utility"
)

// Type aliases preserve external API.
type LogotypesSDK = core.LogotypesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LogotypesEntity = core.LogotypesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LogotypesError = core.LogotypesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAllEntityFunc = func(client *core.LogotypesSDK, entopts map[string]any) core.LogotypesEntity {
		return entity.NewAllEntity(client, entopts)
	}
	core.NewDataEntityFunc = func(client *core.LogotypesSDK, entopts map[string]any) core.LogotypesEntity {
		return entity.NewDataEntity(client, entopts)
	}
	core.NewGetLogoByNameEntityFunc = func(client *core.LogotypesSDK, entopts map[string]any) core.LogotypesEntity {
		return entity.NewGetLogoByNameEntity(client, entopts)
	}
	core.NewLogoEntityFunc = func(client *core.LogotypesSDK, entopts map[string]any) core.LogotypesEntity {
		return entity.NewLogoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLogotypesSDK = core.NewLogotypesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLogotypesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LogotypesSDK  { return NewLogotypesSDK(nil) }
func Test() *LogotypesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
