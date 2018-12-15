export const stylesMacroFields = {
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
        if (src.margin !== undefined && src.margin !== null) {
            src.marginTop = src.margin;
            src.marginBottom = src.margin;
            src.marginLeft = src.margin;
            src.marginRight = src.margin;
        }
    }
]