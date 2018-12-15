import { prepareStyles } from "./prepareStyles";
import { extractModifier } from "./extractModifier";

export function extractStyles(src: any) {
    let normal = prepareStyles(src);
    let hover = prepareStyles(extractModifier('hover', src));
    if (Object.keys(hover).length > 0) {
        return {
            ...normal,
            '&:hover, &:focus': hover
        }
    } else {
        return normal;
    }
}