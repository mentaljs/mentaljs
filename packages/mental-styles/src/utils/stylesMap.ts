export const stylesMap = {

    // Flex
    flexGrow: (v: number) => ({ flexGrow: v }),
    flexShrink: (v: number) => ({ flexShrink: v }),
    flexBasis: (v: number) => ({ flexBasis: v }),
    flexDirection: (v: 'row' | 'column') => ({ flexDirection: v }),
    alignSelf: (v: 'flex-start' | 'flex-end' | 'center' | 'stretch') => ({ alignSelf: v }),
    alignItems: (v: 'flex-start' | 'flex-end' | 'center' | 'stretch') => ({ alignItems: v }),
    justifyContent: (v: 'flex-start' | 'flex-end' | 'center' | 'space-between') => ({ justifyContent: v }),

    // Layouting
    position: (v: 'relative' | 'absolute' | 'fixed') => ({ position: v }),
    top: (v: number) => ({ top: v }),
    bottom: (v: number) => ({ bottom: v }),
    left: (v: number) => ({ left: v }),
    right: (v: number) => ({ right: v }),
    marginTop: (v: number) => ({ marginTop: v }),
    marginBottom: (v: number) => ({ marginBottom: v }),
    marginLeft: (v: number) => ({ marginLeft: v }),
    marginRight: (v: number) => ({ marginRight: v }),
    zIndex: (v: number) => ({ zIndex: v }),

    // Sizing
    paddingTop: (v: number) => ({ paddingTop: v }),
    paddingBottom: (v: number) => ({ paddingBottom: v }),
    paddingLeft: (v: number) => ({ paddingLeft: v }),
    paddingRight: (v: number) => ({ paddingRight: v }),
    height: (v: number) => ({ height: v }),
    width: (v: number) => ({ width: v }),
    minHeight: (v: number) => ({ minHeight: v }),
    minWidth: (v: number) => ({ minWidth: v }),
    maxHeight: (v: number) => ({ maxHeight: v }),
    maxWidth: (v: number) => ({ maxWidth: v }),

    // Styling
    overflow: (v: 'hidden') => ({ overflow: v }),
    borderRadius: (v: number | string) => ({ borderRadius: v }),
    borderWidth: (v: number) => ({ borderWidth: v, borderStyle: v > 0 ? 'solid' : 'hidden' }),
    borderColor: (v: string) => ({ borderColor: v }),
    cursor: (v: 'pointer') => ({ cursor: v }),
    opacity: (v: number) => ({ opacity: v }),
    color: (v: string) => ({ color: v }),
    backgroundColor: (v: string) => ({ backgroundColor: v }),
    backgroundImage: (v: string) => ({ backgroundImage: v }),
    backgroundRepeat: (v: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y') => ({ backgroundRepeat: v }),

    // Text
    fontSize: (v: number) => ({ fontSize: v }),
    fontWeight: (v: '400' | '600') => ({ fontWeight: v }),
    lineHeight: (v: number | string) => ({ lineHeight: v }),
    textOverflow: (v: 'ellipsis') => ({ textOverflow: v }),
    whiteSpace: (v: 'nowrap') => ({ whiteSpace: v })
};