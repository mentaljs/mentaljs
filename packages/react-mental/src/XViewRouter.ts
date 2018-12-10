export interface XViewRouter {
    navigate(to: string | { path?: string, search?: string, hash?: string }, replace?: boolean): void;
}