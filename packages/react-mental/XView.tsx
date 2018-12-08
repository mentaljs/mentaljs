import * as React from 'react';
import { XStyles } from 'mental-styles/XStyles';
import { calculateStyles } from 'mental-styles/calculateStyles';
import { XViewSelectedContext } from './XViewSelectedContext';

export interface XViewProps extends XStyles {
    selected?: boolean;
    as?: 'div' | 'a';
    onClick?: React.MouseEventHandler<any>;
    onMouseDown?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseUp?: React.MouseEventHandler<any>;
    target?: string;
    href?: any;
    children?: any;
    ref?: any;
}

class XViewRenderer extends React.PureComponent<XViewProps> {
    render() {
        let className = calculateStyles(this.props, this.props.selected || false);

        if (this.props.selected) {
            if ((this.props as any).__styleSelectedClassName) {
                className = (this.props as any).__styleSelectedClassName + ' ' + className;
            } else if ((this.props as any).__styleClassName) {
                className = (this.props as any).__styleClassName + ' ' + className;
            }
        } else {
            if ((this.props as any).__styleClassName) {
                className = (this.props as any).__styleClassName + ' ' + className;
            }
        }
        if (this.props.as === 'a') {
            return (
                <a className={className} onClick={this.props.onClick} onMouseDown={this.props.onMouseDown} onMouseEnter={this.props.onMouseEnter} onMouseUp={this.props.onMouseUp} target={this.props.target} href={this.props.href} ref={this.props.ref} >
                    {this.props.children}
                </a>
            );
        } else {
            return (
                <div className={className} onClick={this.props.onClick} onMouseDown={this.props.onMouseDown} onMouseEnter={this.props.onMouseEnter} onMouseUp={this.props.onMouseUp} ref={this.props.ref} >
                    {this.props.children}
                </div>
            );
        }
    }
}

export const XView = (props: XViewProps) => {
    let shouldTrackSelected = props.selected === undefined && (
        props.selectedBackgroundColor || props.selectedHoverBackgroundColor || props.selectedColor || (props as any).__styleSelectable);
    if (shouldTrackSelected) {
        return (
            <XViewSelectedContext.Consumer>
                {selected => (<XViewRenderer selected={selected} {...props} />)}
            </XViewSelectedContext.Consumer>
        );
    } else {
        return (<XViewRenderer {...props} />);
    }
};