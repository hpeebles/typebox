import { TypeBoxError } from '../error';
import type { TTemplateLiteral, TTemplateLiteralKind } from './index.js';
import type { TUnion } from '../union';
import type { TString } from '../string';
import type { TBoolean } from '../boolean';
import type { TNumber } from '../number';
import type { TInteger } from '../integer';
import type { TBigInt } from '../bigint';
import type { TLiteral } from '../literal';
import type { Expression } from './parse.js';
export declare class TemplateLiteralFiniteError extends TypeBoxError {
}
type TFromTemplateLiteralKind<T> = T extends TTemplateLiteral<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> : T extends TUnion<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> : T extends TString ? false : T extends TNumber ? false : T extends TInteger ? false : T extends TBigInt ? false : T extends TBoolean ? true : T extends TLiteral ? true : false;
type TFromTemplateLiteralKinds<T extends TTemplateLiteralKind[]> = T extends [infer L extends TTemplateLiteralKind, ...infer R extends TTemplateLiteralKind[]] ? TFromTemplateLiteralKind<L> extends false ? false : TFromTemplateLiteralKinds<R> : true;
export declare function IsTemplateLiteralExpressionFinite(expression: Expression): boolean;
export type TIsTemplateLiteralFinite<T> = T extends TTemplateLiteral<infer U> ? TFromTemplateLiteralKinds<U> : false;
/** Returns true if this TemplateLiteral resolves to a finite set of values */
export declare function IsTemplateLiteralFinite<T extends TTemplateLiteral>(schema: T): boolean;
export {};
