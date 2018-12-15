import { stylesMap } from "./stylesMap";

export function extractRules(src: any, modifier?: string) {
    let rules: any[] = [];
    for (let k of Object.keys(src)) {
        if (stylesMap[k]) {
            let value = src[k];
            if (value !== null && value !== undefined) {
                rules.push(stylesMap[k](src[k]));
            }
        }
    }
    return rules;
}