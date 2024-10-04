import type { Evaluate } from '../helpers';
import type { TOptional } from '../optional';
import type { TReadonly } from '../readonly';
import type { TArray } from '../array';
import type { TAsyncIterator } from '../async-iterator';
import type { TConstructor } from '../constructor';
import type { TEnum } from '../enum';
import type { TFunction } from '../function';
import type { TIntersect } from '../intersect';
import type { TIterator } from '../iterator';
import type { TNot } from '../not';
import type { TObject, TProperties } from '../object';
import type { TPromise } from '../promise';
import type { TRecursive } from '../recursive';
import type { TRecord } from '../record';
import type { TRef } from '../ref';
import type { TTuple } from '../tuple';
import type { TUnion } from '../union';
import type { TUnsafe } from '../unsafe';
import type { TSchema } from '../schema';
import type { TTransform } from '../transform';
export type TDecodeProperties<T extends TProperties> = {
    [K in keyof T]: TDecodeType<T[K]>;
};
export type TDecodeRest<T extends TSchema[], Acc extends TSchema[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TDecodeRest<R, [...Acc, TDecodeType<L>]> : Acc;
export type TDecodeType<T extends TSchema> = (T extends TOptional<infer S extends TSchema> ? TOptional<TDecodeType<S>> : T extends TReadonly<infer S extends TSchema> ? TReadonly<TDecodeType<S>> : T extends TTransform<infer _, infer R> ? TUnsafe<R> : T extends TArray<infer S extends TSchema> ? TArray<TDecodeType<S>> : T extends TAsyncIterator<infer S extends TSchema> ? TAsyncIterator<TDecodeType<S>> : T extends TConstructor<infer P extends TSchema[], infer R extends TSchema> ? TConstructor<TDecodeRest<P>, TDecodeType<R>> : T extends TEnum<infer S> ? TEnum<S> : T extends TFunction<infer P extends TSchema[], infer R extends TSchema> ? TFunction<TDecodeRest<P>, TDecodeType<R>> : T extends TIntersect<infer S extends TSchema[]> ? TIntersect<TDecodeRest<S>> : T extends TIterator<infer S extends TSchema> ? TIterator<TDecodeType<S>> : T extends TNot<infer S extends TSchema> ? TNot<TDecodeType<S>> : T extends TObject<infer S> ? TObject<Evaluate<TDecodeProperties<S>>> : T extends TPromise<infer S extends TSchema> ? TPromise<TDecodeType<S>> : T extends TRecord<infer K, infer S> ? TRecord<K, TDecodeType<S>> : T extends TRecursive<infer S extends TSchema> ? TRecursive<TDecodeType<S>> : T extends TRef<infer S extends TSchema> ? TRef<TDecodeType<S>> : T extends TTuple<infer S extends TSchema[]> ? TTuple<TDecodeRest<S>> : T extends TUnion<infer S extends TSchema[]> ? TUnion<TDecodeRest<S>> : T);
export type StaticDecodeIsAny<T> = boolean extends (T extends TSchema ? true : false) ? true : false;
/** Creates an decoded static type from a TypeBox type */
export type StaticDecode<T extends TSchema, P extends unknown[] = []> = StaticDecodeIsAny<T> extends true ? unknown : Static<TDecodeType<T>, P>;
/** Creates an encoded static type from a TypeBox type */
export type StaticEncode<T extends TSchema, P extends unknown[] = []> = Static<T, P>;
/** Creates a static type from a TypeBox type */
export type Static<T extends TSchema, P extends unknown[] = []> = (T & {
    params: P;
})['static'];
