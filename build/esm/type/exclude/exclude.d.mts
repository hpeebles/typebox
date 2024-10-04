import type { TSchema, SchemaOptions } from '../schema';
import type { UnionToTuple, AssertRest, AssertType } from '../helpers';
import type { TMappedResult } from '../mapped';
import { type TTemplateLiteral } from '../template-literal';
import { type TUnion } from '../union';
import { type TNever } from '../never';
import { type Static } from '../static';
import { type TUnionEvaluated } from '../union';
import { type TExcludeFromMappedResult } from './exclude-from-mapped-result.js';
import { type TExcludeFromTemplateLiteral } from './exclude-from-template-literal.js';
type TExcludeRest<L extends TSchema[], R extends TSchema> = AssertRest<UnionToTuple<{
    [K in keyof L]: Static<AssertType<L[K]>> extends Static<R> ? never : L[K];
}[number]>> extends infer R extends TSchema[] ? TUnionEvaluated<R> : never;
export type TExclude<L extends TSchema, R extends TSchema> = (L extends TUnion<infer S> ? TExcludeRest<S, R> : L extends R ? TNever : L);
/** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
export declare function Exclude<L extends TMappedResult, R extends TSchema>(unionType: L, excludedMembers: R, options?: SchemaOptions): TExcludeFromMappedResult<L, R>;
/** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
export declare function Exclude<L extends TTemplateLiteral, R extends TSchema>(unionType: L, excludedMembers: R, options?: SchemaOptions): TExcludeFromTemplateLiteral<L, R>;
/** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
export declare function Exclude<L extends TSchema, R extends TSchema>(unionType: L, excludedMembers: R, options?: SchemaOptions): TExclude<L, R>;
export {};
