import type { TSchema } from '../schema';
import { type TReadonly } from '../readonly';
import { type TOptional } from '../optional';
export type TReadonlyOptional<T extends TSchema> = TOptional<T> & TReadonly<T>;
/** `[Json]` Creates a Readonly and Optional property */
export declare function ReadonlyOptional<T extends TSchema>(schema: T): TReadonly<TOptional<T>>;
