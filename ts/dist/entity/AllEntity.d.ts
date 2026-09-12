import { LogotypesEntityBase } from '../LogotypesEntityBase';
import type { LogotypesSDK } from '../LogotypesSDK';
import type { Control } from '../types';
import type { All, AllListMatch } from '../LogotypesTypes';
declare class AllEntity extends LogotypesEntityBase<All> {
    constructor(client: LogotypesSDK, entopts: any);
    make(this: AllEntity): AllEntity;
    list(this: any, reqmatch?: AllListMatch, ctrl?: Control): Promise<AllEntity[]>;
}
export { AllEntity };
