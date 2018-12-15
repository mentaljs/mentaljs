import { isValidStyleProp } from "./isValidStyleProp";

describe('isValidStyleProp', () => {
    it('should detect correctly', () => {
        expect(isValidStyleProp('margin')).toBe(true);
    })
});