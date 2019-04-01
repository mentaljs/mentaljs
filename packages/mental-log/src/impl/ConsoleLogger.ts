import { Logger } from "../Logger";

export class ConsoleLogger implements Logger {
    readonly _tag: string;

    constructor(tag: string) {
        this._tag = tag;
    }

    log = (msg: string) => {
        console.log(msg);
    };

    error = (e: any) => {
        console.error(e);
    };

    warn = (e: any) => {
        console.warn(e);
    };
}