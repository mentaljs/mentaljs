import { prepareStyles } from "./prepareStyles";
import { extractModifier } from "./extractModifier";

export function extractStyles(src: any) {
    let normal = prepareStyles(src);
    let hover = prepareStyles(extractModifier('hover', src));
    return {
        ...normal,
        '&:hover, &:focus': hover
    }
}