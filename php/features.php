<?php
declare(strict_types=1);

// Logotypes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LogotypesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LogotypesBaseFeature();
            case "test":
                return new LogotypesTestFeature();
            default:
                return new LogotypesBaseFeature();
        }
    }
}
