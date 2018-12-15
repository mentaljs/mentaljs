import { XStyleFactoryRegistry } from 'mental-styles';
import { css } from 'glamor';
XStyleFactoryRegistry.registerFactory({
    createStyle: (styles) => {
        return css(styles).toString()
    }
})
