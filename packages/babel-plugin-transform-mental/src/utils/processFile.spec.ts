import { processFile } from "./processFile";
import { KeyGenerator } from "./KeyGenerator";

class TestKeyGenerator implements KeyGenerator {
    private values: string[];
    private index = 0;
    constructor(values: string[]) {
        this.values = values;
    }
    generateKey() {
        return this.values[this.index++ % this.values.length];
    }
}

describe('babel', () => {
    it('should extract static styles', () => {
        let source = `
            export class Bar extends React.Component {
                render() {
                    let a = 1;
                    return (
                        <XView margin={20} marginTop={a}>
                            Hello!
                        </XView>
                    );
                }
            }
        `;
        expect(processFile(source, new TestKeyGenerator(['key']))).toMatchSnapshot();
    });

    it('should replace with static div for static-only views', () => {
        let source = `
            export class Bar extends React.Component {
                render() {
                    return (
                        <XView margin={40}>
                            Hello!
                        </XView>
                    );
                }
            }
        `;
        expect(processFile(source, new TestKeyGenerator(['key']))).toMatchSnapshot();
    });

    it('should ignore keys and callbacks', () => {
        let source = `
        export class Bar extends React.Component {
            callback = () => { }
            render() {
                return (
                    <XView key="key" margin={40} onMouseDown={this.callback} onMouseUp={this.callback} onClick={this.callback}>
                        Hello!
                    </XView>
                );
            }
        }
    `;
        expect(processFile(source, new TestKeyGenerator(['key']))).toMatchSnapshot();
    });
});