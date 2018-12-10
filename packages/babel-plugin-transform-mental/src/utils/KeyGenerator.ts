import * as UUID from 'uuid';

export interface KeyGenerator {
    generateKey(): string;
}

export const KeyGeneratorDefault: KeyGenerator = {
    generateKey() {
        return UUID.v4();
    }
}