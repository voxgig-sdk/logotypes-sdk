<?php
declare(strict_types=1);

// Logotypes SDK utility: result_headers

class LogotypesResultHeaders
{
    public static function call(LogotypesContext $ctx): ?LogotypesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
