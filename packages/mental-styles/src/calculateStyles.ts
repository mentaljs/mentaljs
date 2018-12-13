import { XStyleFactoryRegistry } from './XStyleFactory';
import { XStyles } from './XStyles';

// Our styles cache. Can it be faster?
const stylesCache = new Map<string, string>();

export function calculateStyles(styles: XStyles, selected: boolean = false) {
    const factory = XStyleFactoryRegistry.factory;
    let css: string[] = ['x'];

    let position: 'relative' | 'absolute' | 'fixed' | undefined;

    let flexGrow: number | undefined;
    let flexShrink: number | undefined;
    let flexBasis: number | undefined;
    let flexDirection: 'row' | 'column' | undefined;
    let alignSelf: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | undefined;

    let top: number | undefined;
    let left: number | undefined;
    let right: number | undefined;
    let bottom: number | undefined;

    let marginTop: number | undefined;
    let marginBottom: number | undefined;
    let marginRight: number | undefined;
    let marginLeft: number | undefined;

    let paddingTop: number | undefined;
    let paddingBottom: number | undefined;
    let paddingRight: number | undefined;
    let paddingLeft: number | undefined;

    let width: number | string | undefined;
    let height: number | string | undefined;
    let minWidth: number | string | undefined;
    let minHeight: number | string | undefined;
    let maxWidth: number | string | undefined;
    let maxHeight: number | string | undefined;

    let zIndex: number | undefined;

    let opacity: number | undefined;
    let borderRadius: number | string | undefined;
    let borderWidth: number | undefined;
    let borderColor: string | undefined;
    let level: '1' | undefined;
    let backgroundColor: string | undefined;
    let hoverBackgroundColor: string | undefined;
    let backgroundImage: string | undefined;
    let hoverBackgroundImage: string | undefined;
    let color: string | undefined;
    let cursor: 'pointer' | undefined;

    let fontSize: number | undefined;
    let fontWeight: '400' | '600' | undefined;
    let lineHeight: number | string | undefined;
    let overflow: 'hidden' | undefined;
    let textOverflow: 'ellipsis' | undefined;
    let whiteSpace: 'nowrap' | undefined;

    //
    // Resolve visual styles
    //
    if (styles.opacity !== undefined && styles.opacity !== null) {
        opacity = styles.opacity;
    }
    if (styles.level !== undefined && styles.level !== null) {
        level = styles.level;
    }
    if (styles.borderRadius !== undefined && styles.borderRadius !== null) {
        borderRadius = styles.borderRadius;
    }
    if (styles.borderWidth !== undefined && styles.borderWidth !== null) {
        borderWidth = styles.borderWidth;
    }
    if (styles.borderColor !== undefined && styles.borderColor !== null) {
        borderColor = styles.borderColor;
    }
    if (styles.backgroundColor !== undefined && styles.backgroundColor !== null) {
        backgroundColor = styles.backgroundColor;
    }
    if (styles.hoverBackgroundColor !== undefined && styles.hoverBackgroundColor !== null) {
        hoverBackgroundColor = styles.hoverBackgroundColor;
    }
    if (styles.backgroundImage !== undefined && styles.backgroundImage !== null) {
        backgroundImage = styles.backgroundImage;
    }
    if (styles.hoverBackgroundImage !== undefined && styles.hoverBackgroundImage !== null) {
        hoverBackgroundImage = styles.hoverBackgroundImage;
    }
    if (styles.hoverBackgroundColor !== undefined && styles.hoverBackgroundColor !== null) {
        hoverBackgroundColor = styles.hoverBackgroundColor;
    }
    if (styles.selectedBackgroundColor !== undefined && styles.selectedBackgroundColor !== null) {
        if (selected) {
            backgroundColor = styles.selectedBackgroundColor;
        }
    }
    if (styles.selectedHoverBackgroundColor !== undefined && styles.selectedHoverBackgroundColor !== null) {
        if (selected) {
            hoverBackgroundColor = styles.selectedHoverBackgroundColor;
        }
    }
    if (styles.color !== undefined && styles.color !== null) {
        color = styles.color;
    }
    if (styles.selectedColor !== undefined && styles.selectedColor !== null) {
        if (selected) {
            color = styles.selectedColor;
        }
    }
    if (styles.fontSize !== undefined && styles.fontSize !== null) {
        fontSize = styles.fontSize;
    }
    if (styles.fontWeight !== undefined && styles.fontWeight !== null) {
        fontWeight = styles.fontWeight;
    }
    if (styles.lineHeight !== undefined && styles.lineHeight !== null) {
        lineHeight = styles.lineHeight;
    }
    if (styles.overflow !== undefined && styles.overflow !== null) {
        overflow = styles.overflow;
    }
    if (styles.textOverflow !== undefined && styles.textOverflow !== null) {
        textOverflow = styles.textOverflow;
    }
    if (styles.whiteSpace !== undefined && styles.whiteSpace !== null) {
        whiteSpace = styles.whiteSpace;
    }
    if (styles.cursor !== undefined && styles.cursor !== null) {
        cursor = styles.cursor;
    }

    //
    // Position
    //

    if (styles.position !== undefined && styles.position !== null) {
        position = styles.position;
    }
    if (styles.top !== undefined && styles.top !== null) {
        top = styles.top;
    }
    if (styles.bottom !== undefined && styles.bottom !== null) {
        bottom = styles.bottom;
    }
    if (styles.left !== undefined && styles.left !== null) {
        left = styles.left;
    }
    if (styles.right !== undefined && styles.right !== null) {
        right = styles.right;
    }
    if (styles.zIndex !== undefined && styles.zIndex !== null) {
        zIndex = styles.zIndex;
    }

    //
    // Flex Styles
    //

    if (styles.flexGrow !== undefined && styles.flexGrow !== null) {
        flexGrow = styles.flexGrow;
    }
    if (styles.flexShrink !== undefined && styles.flexShrink !== null) {
        flexShrink = styles.flexShrink;
    }
    if (styles.flexBasis !== undefined && styles.flexBasis !== null) {
        flexBasis = styles.flexBasis;
    }
    if (styles.flexDirection !== undefined && styles.flexDirection !== null) {
        flexDirection = styles.flexDirection;
    }
    if (styles.alignSelf !== undefined && styles.alignSelf !== null) {
        alignSelf = styles.alignSelf;
    }
    if (styles.alignItems !== undefined && styles.alignItems !== null) {
        alignItems = styles.alignItems;
    }
    if (styles.justifyContent !== undefined && styles.justifyContent !== null) {
        justifyContent = styles.justifyContent;
    }

    //
    // Resolve dimensions
    //
    if (styles.width !== undefined && styles.width !== null) {
        width = styles.width;
    }
    if (styles.height !== undefined && styles.height !== null) {
        height = styles.height;
    }
    if (styles.minWidth !== undefined && styles.minWidth !== null) {
        minWidth = styles.minWidth;
    }
    if (styles.maxWidth !== undefined && styles.maxWidth !== null) {
        maxWidth = styles.maxWidth;
    }
    if (styles.minHeight !== undefined && styles.minHeight !== null) {
        minHeight = styles.minHeight;
    }
    if (styles.maxHeight !== undefined && styles.maxHeight !== null) {
        maxHeight = styles.maxHeight;
    }

    //
    // Resolve margins
    //

    if (styles.margin !== undefined && styles.margin !== null) {
        marginTop = styles.margin;
        marginBottom = styles.margin;
        marginLeft = styles.margin;
        marginRight = styles.margin;
    }
    if (styles.marginTop !== undefined && styles.marginTop !== null) {
        marginTop = styles.marginTop;
    }
    if (styles.marginBottom !== undefined && styles.marginBottom !== null) {
        marginBottom = styles.marginBottom;
    }
    if (styles.marginLeft !== undefined && styles.marginLeft !== null) {
        marginLeft = styles.marginLeft;
    }
    if (styles.marginRight !== undefined && styles.marginRight !== null) {
        marginRight = styles.marginRight;
    }

    //
    // Resolve Paddings
    //

    if (styles.padding !== undefined && styles.padding !== null) {
        paddingTop = styles.padding;
        paddingBottom = styles.padding;
        paddingLeft = styles.padding;
        paddingRight = styles.padding;
    }
    if (styles.paddingTop !== undefined && styles.paddingTop !== null) {
        paddingTop = styles.paddingTop;
    }
    if (styles.paddingBottom !== undefined && styles.paddingBottom !== null) {
        paddingBottom = styles.paddingBottom;
    }
    if (styles.paddingLeft !== undefined && styles.paddingLeft !== null) {
        paddingLeft = styles.paddingLeft;
    }
    if (styles.paddingRight !== undefined && styles.paddingRight !== null) {
        paddingRight = styles.paddingRight;
    }

    if (flexGrow !== undefined) {
        let key = 'flex-grow: ' + flexGrow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ flexGrow: flexGrow }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexShrink !== undefined) {
        let key = 'flex-shrink: ' + flexShrink;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ flexShrink: flexShrink }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexBasis !== undefined) {
        let key = 'flex-basis: ' + flexBasis;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ flexBasis: flexBasis }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexDirection !== undefined) {
        let key = 'flex-direction: ' + flexDirection;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ flexDirection: flexDirection }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (alignSelf !== undefined) {
        let key = 'align-self: ' + alignSelf;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ alignSelf: alignSelf }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (alignItems !== undefined) {
        let key = 'align-items: ' + alignItems;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ alignItems: alignItems }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (justifyContent !== undefined) {
        let key = 'justify-content: ' + justifyContent;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ justifyContent: justifyContent }));
        }
        css.push(stylesCache.get(key)!);
    }

    if (marginTop !== undefined) {
        let key = 'margin-top: ' + marginTop;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ marginTop: marginTop }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginBottom !== undefined) {
        let key = 'margin-bottom: ' + marginBottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ marginBottom: marginBottom }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginLeft !== undefined) {
        let key = 'margin-left: ' + marginLeft;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ marginLeft: marginLeft }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginRight !== undefined) {
        let key = 'margin-right: ' + marginRight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ marginRight: marginRight }));
        }
        css.push(stylesCache.get(key)!);
    }

    if (paddingTop !== undefined) {
        let key = 'padding-top: ' + paddingTop;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ paddingTop: paddingTop }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingBottom !== undefined) {
        let key = 'padding-bottom: ' + paddingBottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ paddingBottom: paddingBottom }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingLeft !== undefined) {
        let key = 'padding-left: ' + paddingLeft;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ paddingLeft: paddingLeft }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingRight !== undefined) {
        let key = 'padding-right: ' + paddingRight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ paddingRight: paddingRight }));
        }
        css.push(stylesCache.get(key)!);
    }

    if (top !== undefined) {
        let key = 'top: ' + top;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ top: top }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (bottom !== undefined) {
        let key = 'bottom: ' + bottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ bottom: bottom }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (left !== undefined) {
        let key = 'left: ' + left;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ left: left }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (right !== undefined) {
        let key = 'right: ' + right;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ right: right }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (zIndex !== undefined) {
        let key = 'zIndex: ' + zIndex;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ zIndex: zIndex }));
        }
        css.push(stylesCache.get(key)!);
    }

    if (width !== undefined) {
        let key = 'width: ' + width;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ width: width }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (height !== undefined) {
        let key = 'height: ' + height;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ height: height }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (minWidth !== undefined) {
        let key = 'min-width: ' + minWidth;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ minWidth: minWidth }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (maxWidth !== undefined) {
        let key = 'max-width: ' + maxWidth;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ maxWidth: maxWidth }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (minHeight !== undefined) {
        let key = 'min-height: ' + minHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ minHeight: minHeight }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (maxHeight !== undefined) {
        let key = 'max-height: ' + maxHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ maxHeight: maxHeight }));
        }
        css.push(stylesCache.get(key)!);
    }

    if (opacity !== undefined) {
        let key = 'opacity: ' + opacity;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ opacity: opacity }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (borderRadius !== undefined) {
        let key = 'border-radius: ' + borderRadius;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ borderRadius: borderRadius }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (borderWidth !== undefined) {
        let key = 'border-width: ' + borderRadius;
        if (!stylesCache.has(key)) {
            if (borderWidth > 0) {
                stylesCache.set(key, factory.createStyle({
                    borderWidth: borderWidth,
                    borderStyle: 'solid'
                }));
            } else {
                stylesCache.set(key, factory.createStyle({
                    borderWidth: 0
                }));
            }
        }
        css.push(stylesCache.get(key)!);
    }
    if (borderColor !== undefined) {
        let key = 'border-color: ' + borderColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ borderColor: borderColor }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (backgroundColor !== undefined) {
        let key = 'background-color: ' + backgroundColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ backgroundColor: backgroundColor }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (hoverBackgroundColor !== undefined) {
        let key = 'hover-background-color: ' + hoverBackgroundColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({
                '&:hover, &:focus': {
                    backgroundColor: hoverBackgroundColor
                }
            }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (backgroundImage !== undefined) {
        let key = 'background-image: ' + backgroundImage;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ backgroundImage: backgroundImage }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (hoverBackgroundImage !== undefined) {
        let key = 'hover-background-image: ' + hoverBackgroundImage;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({
                '&:hover, &:focus': {
                    hoverBackgroundImage: hoverBackgroundImage
                }
            }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (color !== undefined) {
        let key = 'color: ' + color;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ color: color }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (fontSize !== undefined) {
        let key = 'font-size: ' + fontSize;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ fontSize: fontSize }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (fontWeight !== undefined) {
        let key = 'font-weight: ' + fontWeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ fontWeight: fontWeight }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (lineHeight !== undefined) {
        let key = 'line-height: ' + lineHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ lineHeight: lineHeight }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (overflow !== undefined) {
        let key = 'overflow: ' + overflow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ overflow: overflow }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (textOverflow !== undefined) {
        let key = 'text-overflow: ' + textOverflow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ textOverflow: textOverflow }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (whiteSpace !== undefined) {
        let key = 'white-space: ' + whiteSpace;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ whiteSpace: whiteSpace }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (position !== undefined) {
        let key = 'position: ' + position;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ position: position }));
        }
        css.push(stylesCache.get(key)!);
    }
    if (level !== undefined) {
        let key = 'level: ' + level;
        if (!stylesCache.has(key)) {
            if (level === '1') {
                stylesCache.set(key, factory.createStyle({ border: '1px solid #ececec' }));
            }
        }
        css.push(stylesCache.get(key)!);
    }
    if (cursor !== undefined) {
        let key = 'cursor: ' + cursor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({ cursor: cursor }));
        }
        css.push(stylesCache.get(key)!);
    }

    return css.join(' ');
}