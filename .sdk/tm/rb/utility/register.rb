# Logotypes SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LogotypesUtility.registrar = ->(u) {
  u.clean = LogotypesUtilities::Clean
  u.done = LogotypesUtilities::Done
  u.make_error = LogotypesUtilities::MakeError
  u.feature_add = LogotypesUtilities::FeatureAdd
  u.feature_hook = LogotypesUtilities::FeatureHook
  u.feature_init = LogotypesUtilities::FeatureInit
  u.fetcher = LogotypesUtilities::Fetcher
  u.make_fetch_def = LogotypesUtilities::MakeFetchDef
  u.make_context = LogotypesUtilities::MakeContext
  u.make_options = LogotypesUtilities::MakeOptions
  u.make_request = LogotypesUtilities::MakeRequest
  u.make_response = LogotypesUtilities::MakeResponse
  u.make_result = LogotypesUtilities::MakeResult
  u.make_point = LogotypesUtilities::MakePoint
  u.make_spec = LogotypesUtilities::MakeSpec
  u.make_url = LogotypesUtilities::MakeUrl
  u.param = LogotypesUtilities::Param
  u.prepare_auth = LogotypesUtilities::PrepareAuth
  u.prepare_body = LogotypesUtilities::PrepareBody
  u.prepare_headers = LogotypesUtilities::PrepareHeaders
  u.prepare_method = LogotypesUtilities::PrepareMethod
  u.prepare_params = LogotypesUtilities::PrepareParams
  u.prepare_path = LogotypesUtilities::PreparePath
  u.prepare_query = LogotypesUtilities::PrepareQuery
  u.result_basic = LogotypesUtilities::ResultBasic
  u.result_body = LogotypesUtilities::ResultBody
  u.result_headers = LogotypesUtilities::ResultHeaders
  u.transform_request = LogotypesUtilities::TransformRequest
  u.transform_response = LogotypesUtilities::TransformResponse
}
