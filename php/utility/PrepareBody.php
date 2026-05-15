<?php
declare(strict_types=1);

// Logotypes SDK utility: prepare_body

class LogotypesPrepareBody
{
    public static function call(LogotypesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
