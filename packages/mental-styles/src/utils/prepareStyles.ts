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
            res[k] = src[k];
        }
    }
    return res;
}