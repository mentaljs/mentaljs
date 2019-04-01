import { Logger } from "../Logger";

export const NoOpLogger: Logger = {
    log: (msg: string) => {
        // NO OP
    },
    error: (e: any) => {
        // NO OP
    },
    warn: (e: any) => {
        // NO OP
    }
}