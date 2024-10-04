import type { TSchema, SchemaOptions } from '../schema';
import { TUnion } from './union-type';
export declare function UnionCreate<T extends TSchema[]>(T: [...T], options?: SchemaOptions): TUnion<T>;
