import { extractRules } from "./extractRules";

describe('extractRules', () => {
    it('should extract rules', () => {
        let ex = extractRules({ width: 100 });
        expect(ex.length).toBe(1);
        expect(ex[0].width).toBe(100);
    })
    it('should ignore unknown rules', () => {
        let ex = extractRules({ width: 100, marginVertical: 100 });
        expect(ex.length).toBe(1);
        expect(ex[0].width).toBe(100);
    });
    it('should ignore rules with null value', () => {
        let ex = extractRules({ width: 100, marginTop: null });
        expect(ex.length).toBe(1);
        expect(ex[0].width).toBe(100);
    });
    it('should ignore rules with undefined value', () => {
        let ex = extractRules({ width: 100, marginTop: undefined });
        expect(ex.length).toBe(1);
        expect(ex[0].width).toBe(100);
    });
});