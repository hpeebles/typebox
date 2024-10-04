import type { TSchema, SchemaOptions } from '../schema';
import { Kind } from '../symbols';
export interface TNever extends TSchema {
    [Kind]: 'Never';
    static: never;
    not: {};
}
/** `[Json]` Creates a Never type */
export declare function Never(options?: SchemaOptions): TNever;
