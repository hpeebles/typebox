import type { TSchema, SchemaOptions } from '../schema';
import type { TFunction } from '../function';
import type { Ensure } from '../helpers';
import { type TTuple } from '../tuple';
export type TParameters<T extends TFunction> = Ensure<TTuple<T['parameters']>>;
/** `[JavaScript]` Extracts the Parameters from the given Function type */
export declare function Parameters<T extends TFunction<TSchema[], TSchema>>(schema: T, options?: SchemaOptions): TParameters<T>;
