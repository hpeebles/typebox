import { type TTemplateLiteralGenerate, type TTemplateLiteral } from '../template-literal';
import type { TLiteral, TLiteralValue } from '../literal';
import type { TInteger } from '../integer';
import type { TNumber } from '../number';
import type { TSchema } from '../schema';
import type { TUnion } from '../union';
type TFromTemplateLiteral<T extends TTemplateLiteral, R extends string[] = TTemplateLiteralGenerate<T>> = (R);
type TFromUnion<T extends TSchema[], Acc extends string[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromUnion<R, [...Acc, ...TIndexPropertyKeys<L>]> : Acc);
type TFromLiteral<T extends TLiteralValue> = (T extends PropertyKey ? [`${T}`] : []);
export type TIndexPropertyKeys<T extends TSchema> = (T extends TTemplateLiteral ? TFromTemplateLiteral<T> : T extends TUnion<infer S> ? TFromUnion<S> : T extends TLiteral<infer S> ? TFromLiteral<S> : T extends TNumber ? ['[number]'] : T extends TInteger ? ['[number]'] : [
]);
/** Returns a tuple of PropertyKeys derived from the given TSchema */
export declare function IndexPropertyKeys<T extends TSchema>(T: T): TIndexPropertyKeys<T>;
export {};
