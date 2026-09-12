import { LogotypesEntityBase } from '../LogotypesEntityBase';
import type { LogotypesSDK } from '../LogotypesSDK';
import type { Control } from '../types';
import type { Logo, LogoLoadMatch } from '../LogotypesTypes';
declare class LogoEntity extends LogotypesEntityBase<Logo> {
    constructor(client: LogotypesSDK, entopts: any);
    make(this: LogoEntity): LogoEntity;
    load(this: any, reqmatch?: LogoLoadMatch, ctrl?: Control): Promise<LogoEntity>;
}
export { LogoEntity };
