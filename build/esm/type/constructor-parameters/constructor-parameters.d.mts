import type { TSchema, SchemaOptions } from '../schema';
import type { Ensure } from '../helpers';
import type { TConstructor } from '../constructor';
import { type TTuple } from '../tuple';
export type TConstructorParameters<T extends TConstructor<TSchema[], TSchema>> = (Ensure<TTuple<T['parameters']>>);
/** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
export declare function ConstructorParameters<T extends TConstructor<TSchema[], TSchema>>(schema: T, options?: SchemaOptions): TConstructorParameters<T>;
