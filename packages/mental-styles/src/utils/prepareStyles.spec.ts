import { prepareStyles } from "./prepareStyles";

describe('prepareStyles', () => {
    it('should expand margin', () => {
        let res = prepareStyles({ margin: 10 });
        expect(Object.keys(res).length).toBe(4);
        expect(res.marginTop).toBe(10);
        expect(res.marginBottom).toBe(10);
        expect(res.marginLeft).toBe(10);
        expect(res.marginRight).toBe(10);
    });
    it('should expand marginVertical', () => {
        let res = prepareStyles({ marginVertical: 10 });
        expect(Object.keys(res).length).toBe(2);
        expect(res.marginTop).toBe(10);
        expect(res.marginBottom).toBe(10);
    });
    it('should expand marginHorizontal', () => {
        let res = prepareStyles({ marginHorizontal: 10 });
        expect(Object.keys(res).length).toBe(2);
        expect(res.marginRight).toBe(10);
        expect(res.marginLeft).toBe(10);
    });
});