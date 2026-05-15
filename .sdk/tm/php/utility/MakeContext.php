<?php
declare(strict_types=1);

// Logotypes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LogotypesMakeContext
{
    public static function call(array $ctxmap, ?LogotypesContext $basectx): LogotypesContext
    {
        return new LogotypesContext($ctxmap, $basectx);
    }
}
