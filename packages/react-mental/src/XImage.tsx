import * as React from 'react';
import { XViewProps, XView } from './XView';

export const XImage = (props: XViewProps) => {
    return (<XView as="img" {...props}>{props.children}</XView>)
}