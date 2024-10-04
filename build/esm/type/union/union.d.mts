import type { TSchema, SchemaOptions } from '../schema';
import { type TNever } from '../never';
import type { TUnion } from './union-type.js';
export type Union<T extends TSchema[]> = (T extends [] ? TNever : T extends [TSchema] ? T[0] : TUnion<T>);
/** `[Json]` Creates a Union type */
export declare function Union<T extends TSchema[]>(T: [...T], options?: SchemaOptions): Union<T>;
