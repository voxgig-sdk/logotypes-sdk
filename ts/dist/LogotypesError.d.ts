import { Context } from './Context';
declare class LogotypesError extends Error {
    isLogotypesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LogotypesError };
