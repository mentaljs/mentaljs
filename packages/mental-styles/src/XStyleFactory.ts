export interface XStyleFactory {
    createStyle: (style: any) => string;
}

class XStyleFactoryHolder {
    private _factory?: XStyleFactory;

    get factory(): XStyleFactory {
        if (!this._factory) {
            throw Error('XStyleFactory is not set');
        }
        return this._factory;
    }

    registerFactory(factory: XStyleFactory) {
        // Should we throw an error or we just don't care?
        this._factory = factory;
    }
}

export const XStyleFactoryRegistry = new XStyleFactoryHolder();