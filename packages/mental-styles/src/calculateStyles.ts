import { XStyleFactoryRegistry } from './XStyleFactory';
import { XStyles } from './XStyles';
import { prepareStyles } from './utils/prepareStyles';
import { extractModifier } from './utils/extractModifier';
import { stylesMap } from './utils/stylesMap';

// Our styles cache. Can it be faster?
const stylesCache = new Map<string, string>();

export function calculateStyles(styles: XStyles, selected: boolean = false) {
    const factory = XStyleFactoryRegistry.factory;

    // Load styles
    let src = prepareStyles(styles);
    let srcHover = extractModifier('hover', src);
    if (selected) {
        src = { ...src, ...extractModifier('selected', src) };
        srcHover = { ...srcHover, ...extractModifier('selectedHover', src) };
    }

    // Building CSS class names
    let css: string[] = ['x'];
    for (let k of Object.keys(src)) {
        if (stylesMap[k]) {
            let v = src[k];
            let key = k + ': ' + v;
            if (!stylesCache.has(key)) {
                stylesCache.set(key, factory.createStyle(stylesMap[k](v)));
            }
            css.push(stylesCache.get(key)!);
        }
    }
    for (let k of Object.keys(srcHover)) {
        if (stylesMap[k]) {
            let v = src[k];
            let key = 'hover-' + k + ': ' + v;
            if (!stylesCache.has(key)) {
                stylesCache.set(key, factory.createStyle({
                    '&:hover, &:focus': stylesMap[k](v)
                }));
            }
            css.push(stylesCache.get(key)!);
        }
    }

    return css.join(' ');
}
