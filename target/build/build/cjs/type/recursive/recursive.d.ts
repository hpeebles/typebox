import type { TSchema, SchemaOptions } from '../schema/index';
import { Kind, Hint } from '../symbols/index';
import { Static } from '../static/index';
export interface TThis extends TSchema {
    [Kind]: 'This';
    static: this['params'][0];
    $ref: string;
}
type RecursiveStatic<T extends TSchema> = Static<T, [RecursiveStatic<T>]>;
export interface TRecursive<T extends TSchema> extends TSchema {
    [Hint]: 'Recursive';
    static: RecursiveStatic<T>;
}
/** `[Json]` Creates a Recursive type */
export declare function Recursive<T extends TSchema>(callback: (thisType: TThis) => T, options?: SchemaOptions): TRecursive<T>;
export {};
