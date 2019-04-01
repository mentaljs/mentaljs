import { Logger } from "./Logger";
import { ConsoleLogger } from "./impl/ConsoleLogger";
import { LoggingConfig } from "./impl/LoggingConfig";
import { NoOpLogger } from "./impl/NoOpLogger";

export function createLogger(tag: string): Logger {
    if (LoggingConfig.isDisabled(tag)) {
        return NoOpLogger;
    }
    return new ConsoleLogger(tag);
}