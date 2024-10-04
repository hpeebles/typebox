import type { TSchema } from '../schema';
import { type ZeroString, type UnionToTuple, type TIncrement } from '../helpers';
import type { TRecursive } from '../recursive';
import type { TIntersect } from '../intersect';
import type { TUnion } from '../union';
import type { TTuple } from '../tuple';
import type { TArray } from '../array';
import type { TObject, TProperties } from '../object';
import { type TSetUnionMany, type TSetIntersectMany } from '../sets';
type TFromRest<T extends TSchema[], Acc extends PropertyKey[][] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromRest<R, [...Acc, TKeyOfPropertyKeys<L>]> : Acc);
type TFromIntersect<T extends TSchema[], C extends PropertyKey[][] = TFromRest<T>, R extends PropertyKey[] = TSetUnionMany<C>> = R;
type TFromUnion<T extends TSchema[], C extends PropertyKey[][] = TFromRest<T>, R extends PropertyKey[] = TSetIntersectMany<C>> = R;
type TFromTuple<T extends TSchema[], I extends string = ZeroString, Acc extends PropertyKey[] = []> = T extends [infer _ extends TSchema, ...infer R extends TSchema[]] ? TFromTuple<R, TIncrement<I>, [...Acc, I]> : Acc;
type TFromArray<_ extends TSchema> = ([
    '[number]'
]);
type TFromProperties<T extends TProperties> = (UnionToTuple<keyof T>);
export type TKeyOfPropertyKeys<T extends TSchema> = (T extends TRecursive<infer S> ? TKeyOfPropertyKeys<S> : T extends TIntersect<infer S> ? TFromIntersect<S> : T extends TUnion<infer S> ? TFromUnion<S> : T extends TTuple<infer S> ? TFromTuple<S> : T extends TArray<infer S> ? TFromArray<S> : T extends TObject<infer S> ? TFromProperties<S> : [
]);
/** Returns a tuple of PropertyKeys derived from the given TSchema. */
export declare function KeyOfPropertyKeys<T extends TSchema>(T: T): TKeyOfPropertyKeys<T>;
/** Returns a regular expression pattern derived from the given TSchema */
export declare function KeyOfPattern(schema: TSchema): string;
export {};
