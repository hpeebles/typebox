import type { TSchema } from '../schema';
import type { Ensure } from '../helpers';
import { ReadonlyKind } from '../symbols';
import type { TMappedResult } from '../mapped';
import { type TReadonlyFromMappedResult } from './readonly-from-mapped-result.js';
type TRemoveReadonly<T extends TSchema> = T extends TReadonly<infer S> ? S : T;
type TAddReadonly<T extends TSchema> = T extends TReadonly<infer S> ? TReadonly<S> : Ensure<TReadonly<T>>;
export type TReadonlyWithFlag<T extends TSchema, F extends boolean> = F extends false ? TRemoveReadonly<T> : TAddReadonly<T>;
export type TReadonly<T extends TSchema> = T & {
    [ReadonlyKind]: 'Readonly';
};
/** `[Json]` Creates a Readonly property */
export declare function Readonly<T extends TMappedResult, F extends boolean>(schema: T, enable: F): TReadonlyFromMappedResult<T, F>;
/** `[Json]` Creates a Readonly property */
export declare function Readonly<T extends TSchema, F extends boolean>(schema: T, enable: F): TReadonlyWithFlag<T, F>;
/** `[Json]` Creates a Readonly property */
export declare function Readonly<T extends TMappedResult>(schema: T): TReadonlyFromMappedResult<T, true>;
/** `[Json]` Creates a Readonly property */
export declare function Readonly<T extends TSchema>(schema: T): TReadonlyWithFlag<T, true>;
export {};
