import { LogotypesEntityBase } from '../LogotypesEntityBase';
import type { LogotypesSDK } from '../LogotypesSDK';
import type { Control } from '../types';
import type { Data, DataListMatch } from '../LogotypesTypes';
declare class DataEntity extends LogotypesEntityBase<Data> {
    constructor(client: LogotypesSDK, entopts: any);
    make(this: DataEntity): DataEntity;
    list(this: any, reqmatch?: DataListMatch, ctrl?: Control): Promise<DataEntity[]>;
}
export { DataEntity };
