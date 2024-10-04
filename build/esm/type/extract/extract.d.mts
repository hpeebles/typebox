import type { TSchema, SchemaOptions } from '../schema';
import type { AssertRest, AssertType, UnionToTuple } from '../helpers';
import type { TMappedResult } from '../mapped';
import { type TUnion } from '../union';
import { type Static } from '../static';
import { type TNever } from '../never';
import { type TUnionEvaluated } from '../union';
import { type TTemplateLiteral } from '../template-literal';
import { type TExtractFromMappedResult } from './extract-from-mapped-result.js';
import { type TExtractFromTemplateLiteral } from './extract-from-template-literal.js';
type TExtractRest<L extends TSchema[], R extends TSchema> = AssertRest<UnionToTuple<{
    [K in keyof L]: Static<AssertType<L[K]>> extends Static<R> ? L[K] : never;
}[number]>> extends infer R extends TSchema[] ? TUnionEvaluated<R> : never;
export type TExtract<L extends TSchema, U extends TSchema> = (L extends TUnion<infer S> ? TExtractRest<S, U> : L extends U ? L : TNever);
/** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
export declare function Extract<L extends TMappedResult, R extends TSchema>(type: L, union: R, options?: SchemaOptions): TExtractFromMappedResult<L, R>;
/** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
export declare function Extract<L extends TTemplateLiteral, R extends TSchema>(type: L, union: R, options?: SchemaOptions): TExtractFromTemplateLiteral<L, R>;
/** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
export declare function Extract<L extends TSchema, R extends TSchema>(type: L, union: R, options?: SchemaOptions): TExtract<L, R>;
export {};
