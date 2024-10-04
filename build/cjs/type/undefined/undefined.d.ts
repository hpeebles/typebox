import type { TSchema, SchemaOptions } from '../schema';
import { Kind } from '../symbols';
export interface TUndefined extends TSchema {
    [Kind]: 'Undefined';
    static: undefined;
    type: 'undefined';
}
/** `[JavaScript]` Creates a Undefined type */
export declare function Undefined(options?: SchemaOptions): TUndefined;
