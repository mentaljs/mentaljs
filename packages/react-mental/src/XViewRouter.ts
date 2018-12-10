export interface XViewRouter {
    navigate(to: string | { path?: string, search?: string, hash?: string }, replace?: boolean): void;
}

export interface XViewRoute {
    readonly href: string;
    readonly protocol: string;
    readonly hostName: string;
    readonly path: string;
    readonly query: { [key: string]: any };
}