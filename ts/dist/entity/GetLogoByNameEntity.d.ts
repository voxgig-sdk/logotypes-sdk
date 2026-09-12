import { LogotypesEntityBase } from '../LogotypesEntityBase';
import type { LogotypesSDK } from '../LogotypesSDK';
import type { Control } from '../types';
import type { GetLogoByName, GetLogoByNameLoadMatch } from '../LogotypesTypes';
declare class GetLogoByNameEntity extends LogotypesEntityBase<GetLogoByName> {
    constructor(client: LogotypesSDK, entopts: any);
    make(this: GetLogoByNameEntity): GetLogoByNameEntity;
    load(this: any, reqmatch?: GetLogoByNameLoadMatch, ctrl?: Control): Promise<GetLogoByNameEntity>;
}
export { GetLogoByNameEntity };
