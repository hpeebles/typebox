/*--------------------------------------------------------------------------

@sinclair/typebox/value

The MIT License (MIT)

Copyright (c) 2017-2024 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import { Clone } from '../clone/index'
import { Check } from '../check/index'
import { Deref } from '../deref/index'
import { Kind } from '../../type/symbols/index'

import type { TSchema } from '../../type/schema/index'
import type { TArray } from '../../type/array/index'
import type { TBigInt } from '../../type/bigint/index'
import type { TBoolean } from '../../type/boolean/index'
import type { TDate } from '../../type/date/index'
import type { TInteger } from '../../type/integer/index'
import type { TIntersect } from '../../type/intersect/index'
import type { TLiteral } from '../../type/literal/index'
import type { TNull } from '../../type/null/index'
import type { TNumber } from '../../type/number/index'
import type { TObject } from '../../type/object/index'
import type { TRecord } from '../../type/record/index'
import type { TRef } from '../../type/ref/index'
import type { TThis } from '../../type/recursive/index'
import type { TTuple } from '../../type/tuple/index'
import type { TUnion } from '../../type/union/index'
import type { TString } from '../../type/string/index'
import type { TSymbol } from '../../type/symbol/index'
import type { TUndefined } from '../../type/undefined/index'

// ------------------------------------------------------------------
// ValueGuard
// ------------------------------------------------------------------
import { IsArray, IsObject, IsDate, IsUndefined, IsString, IsNumber, IsBoolean, IsBigInt, IsSymbol, HasPropertyKey } from '../guard/index'

// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
import { IsOptional } from '../../type/guard/kind'

// ------------------------------------------------------------------
// Conversions
// ------------------------------------------------------------------
function IsStringNumeric(value: unknown): value is string {
  return IsString(value) && !isNaN(value as any) && !isNaN(parseFloat(value))
}
function IsValueToString(value: unknown): value is { toString: () => string } {
  return IsBigInt(value) || IsBoolean(value) || IsNumber(value)
}
function IsValueTrue(value: unknown): value is true {
  return value === true || (IsNumber(value) && value === 1) || (IsBigInt(value) && value === BigInt('1')) || (IsString(value) && (value.toLowerCase() === 'true' || value === '1'))
}
function IsValueFalse(value: unknown): value is false {
  return value === false || (IsNumber(value) && (value === 0 || Object.is(value, -0))) || (IsBigInt(value) && value === BigInt('0')) || (IsString(value) && (value.toLowerCase() === 'false' || value === '0' || value === '-0'))
}
function IsTimeStringWithTimeZone(value: unknown): value is string {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value)
}
function IsTimeStringWithoutTimeZone(value: unknown): value is string {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value)
}
function IsDateTimeStringWithTimeZone(value: unknown): value is string {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value)
}
function IsDateTimeStringWithoutTimeZone(value: unknown): value is string {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value)
}
function IsDateString(value: unknown): value is string {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value)
}
// ------------------------------------------------------------------
// Convert
// ------------------------------------------------------------------
function TryConvertLiteralString(value: unknown, target: string) {
  const conversion = TryConvertString(value)
  return conversion === target ? conversion : value
}
function TryConvertLiteralNumber(value: unknown, target: number) {
  const conversion = TryConvertNumber(value)
  return conversion === target ? conversion : value
}
function TryConvertLiteralBoolean(value: unknown, target: boolean) {
  const conversion = TryConvertBoolean(value)
  return conversion === target ? conversion : value
}
// prettier-ignore
function TryConvertLiteral(schema: TLiteral, value: unknown) {
  return (
    IsString(schema.const) ? TryConvertLiteralString(value, schema.const) :
    IsNumber(schema.const) ? TryConvertLiteralNumber(value, schema.const) :
    IsBoolean(schema.const) ? TryConvertLiteralBoolean(value, schema.const) :
    value
  )
}
function TryConvertBoolean(value: unknown) {
  return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value
}
function TryConvertBigInt(value: unknown) {
  const truncateInteger = (value: string) => value.split('.')[0]
  return IsStringNumeric(value) ? BigInt(truncateInteger(value)) : IsNumber(value) ? BigInt(value | 0) : IsValueFalse(value) ? BigInt(0) : IsValueTrue(value) ? BigInt(1) : value
}
function TryConvertString(value: unknown) {
  return IsValueToString(value) ? value.toString() : IsSymbol(value) && value.description !== undefined ? value.description.toString() : value
}
function TryConvertNumber(value: unknown) {
  return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value
}
function TryConvertInteger(value: unknown) {
  return IsStringNumeric(value) ? parseInt(value) : IsNumber(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value
}
function TryConvertNull(value: unknown) {
  return IsString(value) && value.toLowerCase() === 'null' ? null : value
}
function TryConvertUndefined(value: unknown) {
  return IsString(value) && value === 'undefined' ? undefined : value
}
// ------------------------------------------------------------------
// note: this function may return an invalid dates for the regex
// tests above. Invalid dates will however be checked during the
// casting function and will return a epoch date if invalid.
// Consider better string parsing for the iso dates in future
// revisions.
// ------------------------------------------------------------------
// prettier-ignore
function TryConvertDate(value: unknown) {
  return (
    IsDate(value) ? value : 
    IsNumber(value) ? new Date(value) : 
    IsValueTrue(value) ? new Date(1) : 
    IsValueFalse(value) ? new Date(0) : 
    IsStringNumeric(value) ? new Date(parseInt(value)) : 
    IsTimeStringWithoutTimeZone(value) ? new Date(`1970-01-01T${value}.000Z`) : 
    IsTimeStringWithTimeZone(value) ? new Date(`1970-01-01T${value}`) : 
    IsDateTimeStringWithoutTimeZone(value) ? new Date(`${value}.000Z`) : 
    IsDateTimeStringWithTimeZone(value) ? new Date(value) : 
    IsDateString(value) ? new Date(`${value}T00:00:00.000Z`) : 
    value
  )
}
// ------------------------------------------------------------------
// Default
// ------------------------------------------------------------------
function Default(value: unknown): unknown {
  return value
}
// ------------------------------------------------------------------
// Convert
// ------------------------------------------------------------------
function FromArray(schema: TArray, references: TSchema[], value: any, cloneOnWrite: boolean): any {
  const elements = IsArray(value) ? value : [value]
  return elements.map((element) => Visit(schema.items, references, element, cloneOnWrite))
}
function FromBigInt(schema: TBigInt, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertBigInt(value)
}
function FromBoolean(schema: TBoolean, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertBoolean(value)
}
function FromDate(schema: TDate, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertDate(value)
}
function FromInteger(schema: TInteger, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertInteger(value)
}
function FromIntersect(schema: TIntersect, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return schema.allOf.reduce((value, schema) => Visit(schema, references, value, cloneOnWrite), value)
}
function FromLiteral(schema: TLiteral, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertLiteral(schema, value)
}
function FromNull(schema: TNull, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertNull(value)
}
function FromNumber(schema: TNumber, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertNumber(value)
}
// prettier-ignore
function FromObject(schema: TObject, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  if(!IsObject(value)) return value
  for(const propertyKey of Object.getOwnPropertyNames(schema.properties)) {
    if(!HasPropertyKey(value, propertyKey)) continue
    if (cloneOnWrite) {
      value = Clone(value);
    }
    value[propertyKey] = Visit(schema.properties[propertyKey], references, value[propertyKey], false);
  }
  return value
}
function FromRecord(schema: TRecord, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  const isConvertable = IsObject(value)
  if (!isConvertable) return value
  if (cloneOnWrite) {
    value = Clone(value);
  }
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0]
  const property = schema.patternProperties[propertyKey]
  for (const [propKey, propValue] of Object.entries(value)) {
    value[propKey] = Visit(property, references, propValue, false);
  }
  return value
}
function FromRef(schema: TRef, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return Visit(Deref(schema, references), references, value, cloneOnWrite)
}
function FromString(schema: TString, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertString(value)
}
function FromSymbol(schema: TSymbol, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return IsString(value) || IsNumber(value) ? Symbol(value) : value
}
function FromThis(schema: TThis, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return Visit(Deref(schema, references), references, value, cloneOnWrite)
}
// prettier-ignore
function FromTuple(schema: TTuple, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  const isConvertable = IsArray(value) && !IsUndefined(schema.items)
  if(!isConvertable) return value
  return value.map((value, index) => {
    return (index < schema.items!.length)
      ? Visit(schema.items![index], references, value, cloneOnWrite)
      : value
  })
}
function FromUndefined(schema: TUndefined, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  return TryConvertUndefined(value)
}
function FromUnion(schema: TUnion, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  for (const subschema of schema.anyOf) {
    // Pass in `cloneOnWrite` as true here to ensure the input value isn't
    // modified while attempting to convert to a non-matching subschema
    const converted = Visit(subschema, references, value, true)
    if (!Check(subschema, references, converted)) continue
    return converted
  }
  return value
}
function AddReference(references: TSchema[], schema: TSchema): TSchema[] {
  references.push(schema)
  return references
}
function Visit(schema: TSchema, references: TSchema[], value: any, cloneOnWrite: boolean): unknown {
  const references_ = IsString(schema.$id) ? AddReference(references, schema) : references
  const schema_ = schema as any
  switch (schema[Kind]) {
    case 'Array':
      return FromArray(schema_, references_, value, cloneOnWrite)
    case 'BigInt':
      return FromBigInt(schema_, references_, value, cloneOnWrite)
    case 'Boolean':
      return FromBoolean(schema_, references_, value, cloneOnWrite)
    case 'Date':
      return FromDate(schema_, references_, value, cloneOnWrite)
    case 'Integer':
      return FromInteger(schema_, references_, value, cloneOnWrite)
    case 'Intersect':
      return FromIntersect(schema_, references_, value, cloneOnWrite)
    case 'Literal':
      return FromLiteral(schema_, references_, value, cloneOnWrite)
    case 'Null':
      return FromNull(schema_, references_, value, cloneOnWrite)
    case 'Number':
      return FromNumber(schema_, references_, value, cloneOnWrite)
    case 'Object':
      return FromObject(schema_, references_, value, cloneOnWrite)
    case 'Record':
      return FromRecord(schema_, references_, value, cloneOnWrite)
    case 'Ref':
      return FromRef(schema_, references_, value, cloneOnWrite)
    case 'String':
      return FromString(schema_, references_, value, cloneOnWrite)
    case 'Symbol':
      return FromSymbol(schema_, references_, value, cloneOnWrite)
    case 'This':
      return FromThis(schema_, references_, value, cloneOnWrite)
    case 'Tuple':
      return FromTuple(schema_, references_, value, cloneOnWrite)
    case 'Undefined':
      return FromUndefined(schema_, references_, value, cloneOnWrite)
    case 'Union':
      return FromUnion(schema_, references_, value, cloneOnWrite)
    default:
      return Default(value)
  }
}
// ------------------------------------------------------------------
// Convert
// ------------------------------------------------------------------
/** `[Mutable]` Converts any type mismatched values to their target type if a reasonable conversion is possible. */
export function Convert(schema: TSchema, references: TSchema[], value: unknown): unknown
/** `[Mutable]` Converts any type mismatched values to their target type if a reasonable conversion is possible. */
export function Convert(schema: TSchema, value: unknown): unknown
/** `[Mutable]` Converts any type mismatched values to their target type if a reasonable conversion is possible. */
// prettier-ignore
export function Convert(...args: any[]) {
  return args.length === 3 ? Visit(args[0], args[1], args[2], false) : Visit(args[0], [], args[1], false)
}
