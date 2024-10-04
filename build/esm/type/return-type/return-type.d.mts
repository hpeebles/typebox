import type { SchemaOptions } from '../schema';
import type { TFunction } from '../function';
export type TReturnType<T extends TFunction> = T['returns'];
/** `[JavaScript]` Extracts the ReturnType from the given Function type */
export declare function ReturnType<T extends TFunction<any[], any>>(schema: T, options?: SchemaOptions): TReturnType<T>;
