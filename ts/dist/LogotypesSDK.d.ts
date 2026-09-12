import { AllEntity } from './entity/AllEntity';
import { DataEntity } from './entity/DataEntity';
import { GetLogoByNameEntity } from './entity/GetLogoByNameEntity';
import { LogoEntity } from './entity/LogoEntity';
export type * from './LogotypesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LogotypesEntityBase } from './LogotypesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LogotypesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    All(entopts?: Record<string, any>): AllEntity;
    Data(entopts?: Record<string, any>): DataEntity;
    GetLogoByName(entopts?: Record<string, any>): GetLogoByNameEntity;
    Logo(entopts?: Record<string, any>): LogoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LogotypesSDK;
    tester(testopts?: any, sdkopts?: any): LogotypesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LogotypesSDK;
export { stdutil, config, BaseFeature, LogotypesEntityBase, LogotypesSDK, SDK, };
