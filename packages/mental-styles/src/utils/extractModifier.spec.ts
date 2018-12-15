import { extractModifier } from "./extractModifier";

describe('extractModifier', () => {
    it('should extract values', () => {
        let res = extractModifier('hover', { hoverBackgroundColor: 'red', backgroundColor: 'white' });
        expect(Object.keys(res).length).toBe(1);
        expect(res.backgroundColor).toBe('red');
    });
})