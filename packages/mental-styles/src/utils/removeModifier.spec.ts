import { removeModifier } from "./removeModifier";

describe('removeModifier', () => {
    it('should remove modifier', () => {
        expect(removeModifier('selected', 'selectedBackgroundColor')).toBe('backgroundColor');
    })
});