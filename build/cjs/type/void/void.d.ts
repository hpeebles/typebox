import type { TSchema, SchemaOptions } from '../schema';
import { Kind } from '../symbols';
export interface TVoid extends TSchema {
    [Kind]: 'Void';
    static: void;
    type: 'void';
}
/** `[JavaScript]` Creates a Void type */
export declare function Void(options?: SchemaOptions): TVoid;
