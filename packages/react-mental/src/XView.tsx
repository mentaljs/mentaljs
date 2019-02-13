import * as React from 'react';
import { XStyles } from 'mental-styles';
import { calculateStyles } from 'mental-styles';
import { XViewSelectedContext } from './XViewSelectedContext';
import { XViewRouterContext } from './XViewRouterContext';
import { XViewRouteContext } from './XViewRouteContext';

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export interface XViewProps extends XStyles {

    // State and rendering
    selected?: boolean;
    linkStrict?: boolean;
    as?: 'div' | 'a' | 'img';

    // Callbacks
    onClick?: React.MouseEventHandler<any>;
    onMouseDown?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseLeave?: React.MouseEventHandler<any>;
    onMouseUp?: React.MouseEventHandler<any>;

    // Navigation
    target?: '_blank';
    href?: any;
    path?: string;
    replace?: boolean;
    linkSelectable?: boolean;

    // Image
    src?: string;
    srcSet?: string;

    // React
    ref?: any;
    children?: any;
}

export const XView = React.memo((props: XViewProps) => {

    let router = undefined;

    if (props.path) {
        let router = React.useContext(XViewRouterContext);
    }

    // Resolve on click
    let onClick = React.useMemo<React.MouseEventHandler<any> | undefined>(() => {
        if (props.path) {
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
    let enforceSelected = false;
    if (shouldTrackSelected) {
        if (props.linkSelectable && props.path) {
            let route = React.useContext(XViewRouteContext);
            if (route) {
                let path = normalizePath(route.path);
                if (path === props.path || (props.linkStrict && path.startsWith(props.path + '/'))) {
                    enforceSelected = true;
                    selected = true;
                } else {
                    selected = false;
                }
            } else {
                selected = false;
            }
        } else {
            let context = React.useContext(XViewSelectedContext);
            selected = context;
        }
    } else if (props.selected !== undefined) {
        enforceSelected = true;
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

    let render: any;
    if (props.as === 'a') {
        render = (
            <a className={className} onClick={onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} onMouseUp={props.onMouseUp} target={props.target} href={href} ref={props.ref} >
                {props.children}
            </a>
        );
    } else if (props.as === 'img') {
        render = (
            <img className={className} onClick={onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} onMouseUp={props.onMouseUp} ref={props.ref} src={props.src} srcSet={props.srcSet} />
        )
    } else {
        render = (
            <div className={className} onClick={onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} onMouseUp={props.onMouseUp} ref={props.ref} >
                {props.children}
            </div>
        );
    }

    if (enforceSelected) {
        return (
            <XViewSelectedContext.Provider value={selected}>
                {render}
            </XViewSelectedContext.Provider>
        );
    } else {
        return render;
    }
});

XView.displayName = 'XView';