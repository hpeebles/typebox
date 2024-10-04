import type { TSchema } from '../schema';
import type { TProperties } from '../object';
import { Kind } from '../symbols';
export interface TMappedResult<T extends TProperties = TProperties> extends TSchema {
    [Kind]: 'MappedResult';
    properties: T;
    static: unknown;
}
export declare function MappedResult<T extends TProperties>(properties: T): TMappedResult<T>;
