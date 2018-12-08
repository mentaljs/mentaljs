import * as UUID from 'uuid';

export function generateKey() {
    return UUID.v4();
}