import { stylesMap } from "./stylesMap";
import { stylesMacro } from "./stylesMacro";

export function prepareStyles(src: any) {
    src = { ...src };
    for (let m of stylesMacro) {
        m(src);
    }
    let res: any = {};
    for (let k of Object.keys(src)) {
        if (stylesMap[k]) {
            let computedStyles = stylesMap[k](src[k]);

            for (let l of Object.keys(computedStyles)) {
                res[l] = computedStyles[l];
            }
        }
    }
    return res;
}