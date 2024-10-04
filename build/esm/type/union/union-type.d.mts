import type { TSchema } from '../schema';
import type { Static } from '../static';
import { Kind } from '../symbols';
type UnionStatic<T extends TSchema[], P extends unknown[]> = {
    [K in keyof T]: T[K] extends TSchema ? Static<T[K], P> : never;
}[number];
export interface TUnion<T extends TSchema[] = TSchema[]> extends TSchema {
    [Kind]: 'Union';
    static: UnionStatic<T, this['params']>;
    anyOf: T;
}
export {};
