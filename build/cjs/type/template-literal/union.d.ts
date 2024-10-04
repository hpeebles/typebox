import type { Static } from '../static';
import type { TTemplateLiteral } from './template-literal';
import type { UnionToTuple } from '../helpers';
import { type TUnionEvaluated } from '../union';
import { type TLiteral } from '../literal';
export type TTemplateLiteralToUnionLiteralArray<T extends string[], Acc extends TLiteral[] = []> = (T extends [infer L extends string, ...infer R extends string[]] ? TTemplateLiteralToUnionLiteralArray<R, [...Acc, TLiteral<L>]> : Acc);
export type TTemplateLiteralToUnion<T extends TTemplateLiteral, U extends string[] = UnionToTuple<Static<T>>> = TUnionEvaluated<TTemplateLiteralToUnionLiteralArray<U>>;
/** Returns a Union from the given TemplateLiteral */
export declare function TemplateLiteralToUnion<T extends TTemplateLiteral>(schema: TTemplateLiteral): TTemplateLiteralToUnion<T>;
