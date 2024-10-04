import type { TSchema } from '../schema';
import { type TNever } from '../never';
import { TIntersect, IntersectOptions } from './intersect-type';
export type Intersect<T extends TSchema[]> = (T extends [] ? TNever : T extends [TSchema] ? T[0] : TIntersect<T>);
/** `[Json]` Creates an evaluated Intersect type */
export declare function Intersect<T extends TSchema[]>(T: [...T], options?: IntersectOptions): Intersect<T>;
