import type { TTemplateLiteralKind } from './index.js';
import { TypeBoxError } from '../error';
export declare class TemplateLiteralPatternError extends TypeBoxError {
}
export declare function TemplateLiteralPattern(kinds: TTemplateLiteralKind[]): string;
