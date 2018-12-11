import * as t from '@babel/types';
import { XStyleKeys } from 'mental-styles'; // Do not use absolute path
import { VisitNodeObject, NodePath } from '@babel/traverse';
import { KeyGenerator } from './KeyGenerator';
import { extractStyles } from './exportStyles';

export function createTraversal(keyGenerator: KeyGenerator) {
    let isImported = false;
    let pageHasStyles = false;
    let body: t.Statement[] = [];
    let pending: t.Statement[] = [];
    let imported = new Set<string>();
    function loadStyles(src: any) {
        let exported = extractStyles(src);
        if (!imported.has(exported.key)) {
            imported.add(exported.key);
            pending.push(t.importDeclaration([], t.stringLiteral(exported.path)));
        }
        return exported.key;
    }
    const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement>, Program: VisitNodeObject<t.Program> } = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                isImported = false;
                pageHasStyles = false;
                body = traversePath.node.body;
                pending = [];
                imported.clear();
            },
            exit(traversePath: NodePath<t.Program>) {
                if (!isImported && pageHasStyles) {
                    for (let p of pending) {
                        body.unshift(p);
                    }
                    body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                }
            }
        },
        JSXElement: {
            enter(traversePath: NodePath<t.JSXElement>) {
                if ((traversePath.node.openingElement.name as t.JSXIdentifier).name !== 'XView') {
                    return;
                }
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let stylesObj: any = {};
                let stylesSelectedObj: any = {};
                let hasStyles = false;
                let hasSelectedStyles = false;
                let hasNormalStyles = false;
                let hasOnlyStaticStyles = true;
                for (let a of attrs) {
                    removed = false;
                    if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                        if (XStyleKeys.findIndex((v) => v === (a as any).name.name) >= 0) {
                            if (a.value.type === 'StringLiteral') {
                                if (a.name.name.startsWith('selected')) {
                                    let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                    stylesSelectedObj[c] = a.value.value;
                                    hasSelectedStyles = true;
                                } else {
                                    stylesObj[a.name.name] = a.value.value;
                                    hasNormalStyles = true;
                                }
                                // styles[a.name.name] = a.value;
                                traversePath.node.openingElement.attributes.splice(i, 1);
                                removed = true;
                                hasStyles = true;
                                pageHasStyles = true;
                            } else if (a.value.type === 'JSXExpressionContainer') {
                                if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                    // styles[a.name.name] = a.value.expression;
                                    if (a.name.name.startsWith('selected')) {
                                        let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                        stylesSelectedObj[c] = a.value.expression.value;
                                        hasSelectedStyles = true;
                                    } else {
                                        stylesObj[a.name.name] = a.value.expression.value;
                                        hasNormalStyles = true;
                                    }
                                    traversePath.node.openingElement.attributes.splice(i, 1);
                                    removed = true;
                                    hasStyles = true;
                                    pageHasStyles = true;
                                } else {
                                    hasOnlyStaticStyles = false;
                                }
                            }
                        } else {
                            if (a.name.name !== 'key' &&
                                a.name.name !== 'ref' &&
                                a.name.name !== 'onMouseDown' &&
                                a.name.name !== 'onMouseEnter' &&
                                a.name.name !== 'onMouseUp' &&
                                a.name.name !== 'onClick') {
                                hasOnlyStaticStyles = false;
                            }
                        }
                    }

                    if (!removed) {
                        i++;
                    }
                }

                if (hasStyles) {
                    let key = keyGenerator.generateKey();
                    while (key.indexOf('-') > 0) {
                        key = key.replace('-', '_');
                    }
                    if (!hasSelectedStyles && hasOnlyStaticStyles) {
                        let exported = loadStyles(stylesObj);
                        traversePath.node.openingElement.name = t.jsxIdentifier('div');
                        if (traversePath.node.closingElement) {
                            traversePath.node.closingElement!.name = t.jsxIdentifier('div');
                        }
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                            t.jsxIdentifier('className'),
                            t.stringLiteral('x ' + exported)
                        ))
                    } else {
                        if (hasNormalStyles) {
                            let exported = loadStyles(stylesObj);
                            traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                                t.jsxIdentifier('__styleClassName'),
                                t.stringLiteral(exported)
                            ))
                            // traversePath.node.
                        }

                        if (hasSelectedStyles) {
                            let exported = loadStyles({ ...stylesObj, ...stylesSelectedObj });

                            traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                                t.jsxIdentifier('__styleSelectedClassName'),
                                t.stringLiteral(exported)
                            ))
                            traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                                t.jsxIdentifier('__styleSelectable'),
                                t.jsxExpressionContainer(t.booleanLiteral(true))
                            ));
                        }
                    }
                }
            }
        }
    };
    return traverseOptions;
}