import type { SchemaOptions, TSchema } from '../schema';
import type { TupleToUnion, Evaluate, Ensure } from '../helpers';
import { type TRecursive } from '../recursive';
import type { TMappedKey, TMappedResult } from '../mapped';
import { type TIntersect } from '../intersect';
import { type TUnion } from '../union';
import { type TObject, type TProperties } from '../object';
import { type TIndexPropertyKeys } from '../indexed';
import { type TOmitFromMappedKey } from './omit-from-mapped-key';
import { type TOmitFromMappedResult } from './omit-from-mapped-result';
type TFromIntersect<T extends TSchema[], K extends PropertyKey[], Acc extends TSchema[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromIntersect<R, K, [...Acc, TOmit<L, K>]> : Acc);
type TFromUnion<T extends TSchema[], K extends PropertyKey[], Acc extends TSchema[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromUnion<R, K, [...Acc, TOmit<L, K>]> : Acc);
type TFromProperties<T extends TProperties, K extends PropertyKey[], I extends PropertyKey = TupleToUnion<K>> = Evaluate<Omit<T, I>>;
type TFromObject<T extends TObject, K extends PropertyKey[], Properties extends TProperties = T['properties']> = Ensure<TObject<(TFromProperties<Properties, K>)>>;
export type TOmit<T extends TProperties, K extends PropertyKey[]> = (T extends TRecursive<infer S extends TSchema> ? TRecursive<TOmit<S, K>> : T extends TIntersect<infer S extends TSchema[]> ? TIntersect<TFromIntersect<S, K>> : T extends TUnion<infer S extends TSchema[]> ? TUnion<TFromUnion<S, K>> : T extends TObject<infer S extends TProperties> ? TFromObject<TObject<S>, K> : TObject<{}>);
/** `[Json]` Constructs a type whose keys are omitted from the given type */
export declare function Omit<T extends TMappedResult, K extends PropertyKey[]>(T: T, K: [...K], options?: SchemaOptions): TOmitFromMappedResult<T, K>;
/** `[Json]` Constructs a type whose keys are omitted from the given type */
export declare function Omit<T extends TSchema, K extends TMappedKey>(T: T, K: K, options?: SchemaOptions): TOmitFromMappedKey<T, K>;
/** `[Json]` Constructs a type whose keys are omitted from the given type */
export declare function Omit<T extends TSchema, K extends TSchema, I extends PropertyKey[] = TIndexPropertyKeys<K>>(T: T, K: K, options?: SchemaOptions): TOmit<T, I>;
/** `[Json]` Constructs a type whose keys are omitted from the given type */
export declare function Omit<T extends TSchema, K extends PropertyKey[]>(T: T, K: readonly [...K], options?: SchemaOptions): TOmit<T, K>;
export {};
