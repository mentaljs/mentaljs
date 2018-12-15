import { extractStyles } from "./extractStyles";

describe('extractStyles', () => {
    it('should extract styles', () => {
        expect(extractStyles({
            color: 'red',
            hoverColor: 'blue'
        })).toMatchSnapshot();
    });
});