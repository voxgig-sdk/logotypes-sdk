<?php
declare(strict_types=1);

// Logotypes SDK base feature

class LogotypesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LogotypesContext $ctx, array $options): void {}
    public function PostConstruct(LogotypesContext $ctx): void {}
    public function PostConstructEntity(LogotypesContext $ctx): void {}
    public function SetData(LogotypesContext $ctx): void {}
    public function GetData(LogotypesContext $ctx): void {}
    public function GetMatch(LogotypesContext $ctx): void {}
    public function SetMatch(LogotypesContext $ctx): void {}
    public function PrePoint(LogotypesContext $ctx): void {}
    public function PreSpec(LogotypesContext $ctx): void {}
    public function PreRequest(LogotypesContext $ctx): void {}
    public function PreResponse(LogotypesContext $ctx): void {}
    public function PreResult(LogotypesContext $ctx): void {}
    public function PreDone(LogotypesContext $ctx): void {}
    public function PreUnexpected(LogotypesContext $ctx): void {}
}
