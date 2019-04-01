import { Logger } from "../Logger";

export class ConsoleLogger implements Logger {
    readonly _tag: string;

    constructor(tag: string) {
        this._tag = tag;
    }

    log = (msg: string) => {
        console.log(this._tag + ': ' + msg);
    };

    error = (e: any) => {
        console.error(this._tag + ': ', e);
    };

    warn = (e: any) => {
        console.warn(this._tag + ': ', e);
    };
}