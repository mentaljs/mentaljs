import * as React from 'react';
import { XViewProps, XView } from './XView';

export interface XImageProps extends XViewProps {

}

export const XImage = (props: XImageProps) => {
    return (<XView as="img" {...props}>{props.children}</XView>)
}