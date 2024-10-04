import type { TSchema } from '../schema';
import type { TIntersect, IntersectOptions } from './intersect-type.js';
export declare function IntersectCreate<T extends TSchema[]>(T: [...T], options?: IntersectOptions): TIntersect<T>;
