<?php
declare(strict_types=1);

// Logotypes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

LogotypesUtility::setRegistrar(function (LogotypesUtility $u): void {
    $u->clean = [LogotypesClean::class, 'call'];
    $u->done = [LogotypesDone::class, 'call'];
    $u->make_error = [LogotypesMakeError::class, 'call'];
    $u->feature_add = [LogotypesFeatureAdd::class, 'call'];
    $u->feature_hook = [LogotypesFeatureHook::class, 'call'];
    $u->feature_init = [LogotypesFeatureInit::class, 'call'];
    $u->fetcher = [LogotypesFetcher::class, 'call'];
    $u->make_fetch_def = [LogotypesMakeFetchDef::class, 'call'];
    $u->make_context = [LogotypesMakeContext::class, 'call'];
    $u->make_options = [LogotypesMakeOptions::class, 'call'];
    $u->make_request = [LogotypesMakeRequest::class, 'call'];
    $u->make_response = [LogotypesMakeResponse::class, 'call'];
    $u->make_result = [LogotypesMakeResult::class, 'call'];
    $u->make_point = [LogotypesMakePoint::class, 'call'];
    $u->make_spec = [LogotypesMakeSpec::class, 'call'];
    $u->make_url = [LogotypesMakeUrl::class, 'call'];
    $u->param = [LogotypesParam::class, 'call'];
    $u->prepare_auth = [LogotypesPrepareAuth::class, 'call'];
    $u->prepare_body = [LogotypesPrepareBody::class, 'call'];
    $u->prepare_headers = [LogotypesPrepareHeaders::class, 'call'];
    $u->prepare_method = [LogotypesPrepareMethod::class, 'call'];
    $u->prepare_params = [LogotypesPrepareParams::class, 'call'];
    $u->prepare_path = [LogotypesPreparePath::class, 'call'];
    $u->prepare_query = [LogotypesPrepareQuery::class, 'call'];
    $u->result_basic = [LogotypesResultBasic::class, 'call'];
    $u->result_body = [LogotypesResultBody::class, 'call'];
    $u->result_headers = [LogotypesResultHeaders::class, 'call'];
    $u->transform_request = [LogotypesTransformRequest::class, 'call'];
    $u->transform_response = [LogotypesTransformResponse::class, 'call'];
});
