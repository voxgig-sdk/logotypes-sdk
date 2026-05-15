package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAllEntityFunc func(client *LogotypesSDK, entopts map[string]any) LogotypesEntity

var NewDataEntityFunc func(client *LogotypesSDK, entopts map[string]any) LogotypesEntity

var NewGetLogoByNameEntityFunc func(client *LogotypesSDK, entopts map[string]any) LogotypesEntity

var NewLogoEntityFunc func(client *LogotypesSDK, entopts map[string]any) LogotypesEntity

