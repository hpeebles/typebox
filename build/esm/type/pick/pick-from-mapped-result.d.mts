import type { SchemaOptions } from '../schema';
import type { Ensure, Evaluate } from '../helpers';
import type { TProperties } from '../object';
import { type TMappedResult } from '../mapped';
import { type TPick } from './pick.js';
type TFromProperties<P extends TProperties, K extends PropertyKey[]> = ({
    [K2 in keyof P]: TPick<P[K2], K>;
});
type TFromMappedResult<R extends TMappedResult, K extends PropertyKey[]> = (Evaluate<TFromProperties<R['properties'], K>>);
export type TPickFromMappedResult<T extends TMappedResult, K extends PropertyKey[], P extends TProperties = TFromMappedResult<T, K>> = (Ensure<TMappedResult<P>>);
export declare function PickFromMappedResult<R extends TMappedResult, K extends PropertyKey[], P extends TProperties = TFromMappedResult<R, K>>(R: R, K: [...K], options?: SchemaOptions): TMappedResult<P>;
export {};
