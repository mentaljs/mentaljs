import traverse from '@babel/traverse';
import { createTraversal } from './createTraversal';
import * as babelParser from '@babel/parser';
import babelGenerator from '@babel/generator';
import { Node } from '@babel/types';
import { KeyGenerator, KeyGeneratorDefault } from './KeyGenerator';

function parse(src: string) {
    return babelParser.parse(src, {
        plugins: [
            'asyncGenerators',
            'classProperties',
            'dynamicImport',
            'functionBind',
            'jsx',
            'objectRestSpread',
            'typescript'
        ],
        sourceType: 'module'
    });
}

function generate(ast: Node) {
    return babelGenerator(ast, {
        quotes: 'single'
    }).code;
}

export function processFile(content: string, keyGenerator: KeyGenerator = KeyGeneratorDefault) {
    let res = parse(content);
    traverse(res, createTraversal(keyGenerator));
    return generate(res);
}