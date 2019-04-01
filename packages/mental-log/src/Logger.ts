export interface Logger {
    log: (msg: string) => void;
    error: (e: any) => void;
    warn: (e: any) => void;
}