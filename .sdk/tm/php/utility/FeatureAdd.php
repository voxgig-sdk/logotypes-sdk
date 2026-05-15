<?php
declare(strict_types=1);

// Logotypes SDK utility: feature_add

class LogotypesFeatureAdd
{
    public static function call(LogotypesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
