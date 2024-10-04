import type { Static } from '../../type/static';
import { TypeBoxError } from '../../type/error';
import { type TLiteral } from '../../type/literal';
import { type TObject } from '../../type/object';
import { type TString } from '../../type/string';
import { type TUnknown } from '../../type/unknown';
import { type TUnion } from '../../type/union';
export type Insert = Static<typeof Insert>;
export declare const Insert: TObject<{
    type: TLiteral<'insert'>;
    path: TString;
    value: TUnknown;
}>;
export type Update = Static<typeof Update>;
export declare const Update: TObject<{
    type: TLiteral<'update'>;
    path: TString;
    value: TUnknown;
}>;
export type Delete = Static<typeof Delete>;
export declare const Delete: TObject<{
    type: TLiteral<'delete'>;
    path: TString;
}>;
export type Edit = Static<typeof Edit>;
export declare const Edit: TUnion<[typeof Insert, typeof Update, typeof Delete]>;
export declare class ValueDiffError extends TypeBoxError {
    readonly value: unknown;
    constructor(value: unknown, message: string);
}
export declare function Diff(current: unknown, next: unknown): Edit[];
export declare function Patch<T = any>(current: unknown, edits: Edit[]): T;
