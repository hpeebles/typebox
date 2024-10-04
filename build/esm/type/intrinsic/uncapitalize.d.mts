import type { TSchema, SchemaOptions } from '../schema';
import { type TIntrinsic } from './intrinsic.js';
export type TUncapitalize<T extends TSchema> = TIntrinsic<T, 'Uncapitalize'>;
/** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
export declare function Uncapitalize<T extends TSchema>(T: T, options?: SchemaOptions): TUncapitalize<T>;
