import type { TSchema, SchemaOptions } from '../schema';
import { Kind } from '../symbols';
export interface TUnknown extends TSchema {
    [Kind]: 'Unknown';
    static: unknown;
}
/** `[Json]` Creates an Unknown type */
export declare function Unknown(options?: SchemaOptions): TUnknown;
