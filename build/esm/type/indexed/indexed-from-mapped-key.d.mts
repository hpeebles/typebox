import type { TSchema, SchemaOptions } from '../schema';
import type { Ensure, Evaluate } from '../helpers';
import type { TProperties } from '../object';
import { type TIndex } from './indexed.js';
import { type TMappedResult, type TMappedKey } from '../mapped';
type TMappedIndexPropertyKey<T extends TSchema, K extends PropertyKey> = {
    [_ in K]: TIndex<T, [K]>;
};
type TMappedIndexPropertyKeys<T extends TSchema, K extends PropertyKey[], Acc extends TProperties = {}> = (K extends [infer L extends PropertyKey, ...infer R extends PropertyKey[]] ? TMappedIndexPropertyKeys<T, R, Acc & TMappedIndexPropertyKey<T, L>> : Acc);
type TMappedIndexProperties<T extends TSchema, K extends TMappedKey> = Evaluate<TMappedIndexPropertyKeys<T, K['keys']>>;
export type TIndexFromMappedKey<T extends TSchema, K extends TMappedKey, P extends TProperties = TMappedIndexProperties<T, K>> = (Ensure<TMappedResult<P>>);
export declare function IndexFromMappedKey<T extends TSchema, K extends TMappedKey, P extends TProperties = TMappedIndexProperties<T, K>>(T: T, K: K, options?: SchemaOptions): TMappedResult<P>;
export {};
