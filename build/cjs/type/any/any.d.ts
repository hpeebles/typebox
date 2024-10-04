import type { TSchema, SchemaOptions } from '../schema';
import { Kind } from '../symbols';
export interface TAny extends TSchema {
    [Kind]: 'Any';
    static: any;
}
/** `[Json]` Creates an Any type */
export declare function Any(options?: SchemaOptions): TAny;
