import { stylesMap } from "./utils/stylesMap";
import { stylesMacroFields } from "./utils/stylesMacro";
import { removeModifier } from "./utils/removeModifier";

export function isValidStyleProp(name: string): boolean {
    if (name.startsWith('selectedHover')) {
        name = removeModifier('selectedHover', name);
    } else if (name.startsWith('selected')) {
        name = removeModifier('selected', name);
    } else if (name.startsWith('hover')) {
        name = removeModifier('hover', name);
    }
    return (!!stylesMap[name] || !!stylesMacroFields[name]);
}