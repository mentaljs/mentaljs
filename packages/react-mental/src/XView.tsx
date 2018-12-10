import * as React from 'react';
import { XStyles } from 'mental-styles';
import { calculateStyles } from 'mental-styles';
import { XViewSelectedContext } from './XViewSelectedContext';
import { XViewRouterContext } from './XViewRouterContext';

export interface XViewProps extends XStyles {

    // State and rendering
    selected?: boolean;
    as?: 'div' | 'a';

    // Callbacks
    onClick?: React.MouseEventHandler<any>;
    onMouseDown?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseUp?: React.MouseEventHandler<any>;

    // Navigation
    target?: '_blank';
    href?: any;
    path?: string;
    replace?: boolean;

    // React
    ref?: any;
    children?: any;
}

export const XView = React.memo((props: XViewProps) => {

    // Resolve on click
    let onClick = React.useMemo<React.MouseEventHandler<any> | undefined>(() => {
        if (props.path) {
            let router = React.useContext(XViewRouterContext);
            if (!router) {
                return props.onClick;
            }
            return (event) => {
                if (props.onClick) {
                    props.onClick(event);
                }
                // Ignore if already prevented
                if (event.defaultPrevented) {
                    return;
                }

                // Navigate
                event.preventDefault();
                router!.navigate(props.path!, props.replace);
            };
        } else {
            return props.onClick;
        }
    }, [props.onClick, props.path, props.replace]);

    // Resolve href
    let href = props.href;
    if (props.path) {
        href = props.path;
    }

    // Resolve selected state
    let selected = props.selected || false;
    let shouldTrackSelected = props.selected === undefined && (
        props.selectedBackgroundColor || props.selectedHoverBackgroundColor || props.selectedColor || (props as any).__styleSelectable);
    if (shouldTrackSelected) {
        let context = React.useContext(XViewSelectedContext);
        selected = context;
    }

    // Resolve style
    let className = calculateStyles(props, selected);
    if (selected) {
        if ((props as any).__styleSelectedClassName) {
            className = (props as any).__styleSelectedClassName + ' ' + className;
        } else if ((props as any).__styleClassName) {
            className = (props as any).__styleClassName + ' ' + className;
        }
    } else {
        if ((props as any).__styleClassName) {
            className = (props as any).__styleClassName + ' ' + className;
        }
    }

    // Render
    if (props.as === 'a') {
        return (
            <a className={className} onClick={onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} target={props.target} href={href} ref={props.ref} >
                {props.children}
            </a>
        );
    } else {
        return (
            <div className={className} onClick={onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} ref={props.ref} >
                {props.children}
            </div>
        );
    }
});