import { LoggingConfig } from "./impl/LoggingConfig";

export function disableAll() {
    LoggingConfig.disableAll();
}

export function enableAll() {
    LoggingConfig.enableAll();
}

export function disableTag(tag: string) {
    LoggingConfig.disableTag(tag);
}

export function enableTag(tag: string) {
    LoggingConfig.enableTag(tag);
}