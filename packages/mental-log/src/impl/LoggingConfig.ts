class LoggingConfigStatic {
    private disabled = false;
    private disabledTags = new Set<string>();

    isDisabled = (tag: string) => {
        if (this.disabled) {
            return true;
        }
        return this.disabledTags.has(tag);
    }

    disableAll = () => {
        this.disabled = true;
    }

    enableAll = () => {
        this.disabled = true;
    }

    disableTag = (tag: string) => {
        this.disabledTags.add(tag);
    }

    enableTag = (tag: string) => {
        this.disabledTags.delete(tag);
    }
}

export const LoggingConfig = new LoggingConfigStatic();