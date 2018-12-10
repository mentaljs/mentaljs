import { createTraversal } from './utils/createTraversal';
import { KeyGeneratorDefault } from './utils/KeyGenerator';

export default () => {
    return { visitor: createTraversal(KeyGeneratorDefault) };
};