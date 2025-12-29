
export declare type BooleanExpression<T> = (r: T) => boolean;
export declare type AnyExpression<T> = (r: T) => any;
export declare type TransformExpression<T, S> = (r: T) => S;
export declare type GenericConstructor<T> = new () => T;
export declare type OneToManyExpression<T, S> = (r: T) => Array<S>;

export type OneToManyExpressionProject<T, S> =
    (item: T, index?: number, source?: Array<T>) =>
        Iterable<S> | ArrayLike<S> | null | undefined;

