export function removeModifier(modifier: string, name: string) {
    return name.substring(modifier.length, modifier.length + 1).toLowerCase() + name.substr(modifier.length + 1);
}