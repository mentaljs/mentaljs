export const stylesMacroFields = {
    padding: 1,
    paddingVertical: 1,
    paddingHorizontal: 1,
    margin: 1,
    marginVertical: 1,
    marginHorizontal: 1,
};

export const stylesMacro: ((src: any) => void)[] = [
    (src) => {
        if (src.marginVertical !== undefined && src.marginVertical !== null) {
            src.marginTop = src.marginVertical;
            src.marginBottom = src.marginVertical;
        }
        if (src.marginHorizontal !== undefined && src.marginHorizontal !== null) {
            src.marginLeft = src.marginHorizontal;
            src.marginRight = src.marginHorizontal;
        }
    },
    (src) => {
        if (src.paddingVertical !== undefined && src.paddingVertical !== null) {
            src.paddingTop = src.paddingVertical;
            src.paddingBottom = src.paddingVertical;
        }
        if (src.paddingHorizontal !== undefined && src.paddingHorizontal !== null) {
            src.paddingLeft = src.paddingHorizontal;
            src.paddingRight = src.paddingHorizontal;
        }
    },
    (src) => {
        if (src.margin !== undefined && src.margin !== null) {
            src.marginTop = src.margin;
            src.marginBottom = src.margin;
            src.marginLeft = src.margin;
            src.marginRight = src.margin;
        }
    },
    (src) => {
        if (src.padding !== undefined && src.padding !== null) {
            src.paddingTop = src.padding;
            src.paddingBottom = src.padding;
            src.paddingLeft = src.padding;
            src.paddingRight = src.padding;
        }
    }
]