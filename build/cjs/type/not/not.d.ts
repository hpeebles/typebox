import type { TSchema, SchemaOptions } from '../schema';
import type { Static } from '../static';
import { Kind } from '../symbols';
export interface TNot<T extends TSchema = TSchema> extends TSchema {
    [Kind]: 'Not';
    static: T extends TNot<infer U> ? Static<U> : unknown;
    not: T;
}
/** `[Json]` Creates a Not type */
export declare function Not<T extends TSchema>(not: T, options?: SchemaOptions): TNot<T>;
