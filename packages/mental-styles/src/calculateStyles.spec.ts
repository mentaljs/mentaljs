import { XStyleFactoryRegistry } from './XStyleFactory';
import { css } from 'glamor';
import { calculateStyles } from "./calculateStyles";
XStyleFactoryRegistry.registerFactory({
    createStyle: (styles) => {
        return css(styles).toString()
    }
});

describe('calculateStyles', () => {
    it('should caluclate style', () => {
        let st = calculateStyles({ extractLayer: true });
        expect(st).toMatchSnapshot();
    })
});