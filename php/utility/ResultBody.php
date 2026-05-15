<?php
declare(strict_types=1);

// Logotypes SDK utility: result_body

class LogotypesResultBody
{
    public static function call(LogotypesContext $ctx): ?LogotypesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
