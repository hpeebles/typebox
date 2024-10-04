import type { TSchema } from '../schema';
import { type TExtract } from './extract.js';
import { type TTemplateLiteral, type TTemplateLiteralToUnion } from '../template-literal';
export type TExtractFromTemplateLiteral<L extends TTemplateLiteral, R extends TSchema> = (TExtract<TTemplateLiteralToUnion<L>, R>);
export declare function ExtractFromTemplateLiteral<L extends TTemplateLiteral, R extends TSchema>(L: L, R: R): TExtractFromTemplateLiteral<L, R>;
