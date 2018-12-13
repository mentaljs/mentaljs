import { cssFor, css } from 'glamor';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export function extractStyles(styles: any) {
    let st = styles;
    if (st.borderWidth && st.borderWidth > 0) {
        st.borderStyle = 'solid';
    }
    let cssValue = cssFor(st);
    let fname = css(styles).toString();
    let root = path.join(process.cwd(), 'node_modules', '.cache', 'mentaljs', 'styles');
    let fpath = path.join(root, fname) + '.css';
    mkdirp.sync(root);
    if (!fs.existsSync(fname)) {
        fs.writeFileSync(fpath, cssValue);
    }
    return {
        path: fpath, key: fname
    };
}