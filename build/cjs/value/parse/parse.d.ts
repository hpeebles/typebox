import { TSchema } from '../../type/schema';
import { StaticDecode } from '../../type/static';
/** Parses a value or throws an `AssertError` if invalid. */
export declare function Parse<T extends TSchema, R = StaticDecode<T>>(schema: T, references: TSchema[], value: unknown): R;
/** Parses a value or throws an `AssertError` if invalid. */
export declare function Parse<T extends TSchema, R = StaticDecode<T>>(schema: T, value: unknown): R;
