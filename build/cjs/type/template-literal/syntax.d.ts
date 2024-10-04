import type { Assert, Trim } from '../helpers';
import type { TTemplateLiteral, TTemplateLiteralKind } from './index';
import { type TLiteral } from '../literal';
import { type TBoolean } from '../boolean';
import { type TBigInt } from '../bigint';
import { type TNumber } from '../number';
import { type TString } from '../string';
import { type TUnionEvaluated } from '../union';
declare function FromUnion(syntax: string): IterableIterator<TTemplateLiteralKind>;
declare function FromTerminal(syntax: string): IterableIterator<TTemplateLiteralKind>;
type FromUnionLiteral<T extends string> = T extends `${infer L}|${infer R}` ? [TLiteral<Trim<L>>, ...FromUnionLiteral<R>] : T extends `${infer L}` ? [TLiteral<Trim<L>>] : [
];
type FromUnion<T extends string> = TUnionEvaluated<FromUnionLiteral<T>>;
type FromTerminal<T extends string> = T extends 'boolean' ? TBoolean : T extends 'bigint' ? TBigInt : T extends 'number' ? TNumber : T extends 'string' ? TString : FromUnion<T>;
type FromString<T extends string> = T extends `{${infer L}}${infer R}` ? [FromTerminal<L>, ...FromString<R>] : T extends `${infer L}$\{${infer R1}\}${infer R2}` ? [TLiteral<L>, ...FromString<`{${R1}}`>, ...FromString<R2>] : T extends `${infer L}$\{${infer R1}\}` ? [TLiteral<L>, ...FromString<`{${R1}}`>] : T extends `${infer L}` ? [TLiteral<L>] : [
];
export type TTemplateLiteralSyntax<T extends string> = (TTemplateLiteral<Assert<FromString<T>, TTemplateLiteralKind[]>>);
/** Parses TemplateLiteralSyntax and returns a tuple of TemplateLiteralKinds */
export declare function TemplateLiteralSyntax(syntax: string): TTemplateLiteralKind[];
export {};
