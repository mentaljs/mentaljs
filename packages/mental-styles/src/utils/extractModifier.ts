export function extractModifier(name: string, src: any) {
    let res: any = {};
    for (let k of Object.keys(src)) {
        if (k.startsWith(name)) {
            let rk = k.substring(name.length, name.length + 1).toLowerCase() + k.substr(name.length + 1);
            res[rk] = src[k];
        }
    }
    return res;
}