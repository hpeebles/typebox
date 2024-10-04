"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// ------------------------------------------------------------------
// Infrastructure
// ------------------------------------------------------------------
__exportStar(require("./type/clone"), exports);
__exportStar(require("./type/create"), exports);
__exportStar(require("./type/error"), exports);
__exportStar(require("./type/guard"), exports);
__exportStar(require("./type/helpers"), exports);
__exportStar(require("./type/patterns"), exports);
__exportStar(require("./type/registry"), exports);
__exportStar(require("./type/sets"), exports);
__exportStar(require("./type/symbols"), exports);
// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
__exportStar(require("./type/any"), exports);
__exportStar(require("./type/array"), exports);
__exportStar(require("./type/async-iterator"), exports);
__exportStar(require("./type/awaited"), exports);
__exportStar(require("./type/bigint"), exports);
__exportStar(require("./type/boolean"), exports);
__exportStar(require("./type/composite"), exports);
__exportStar(require("./type/const"), exports);
__exportStar(require("./type/constructor"), exports);
__exportStar(require("./type/constructor-parameters"), exports);
__exportStar(require("./type/date"), exports);
__exportStar(require("./type/deref"), exports);
__exportStar(require("./type/enum"), exports);
__exportStar(require("./type/exclude"), exports);
__exportStar(require("./type/extends"), exports);
__exportStar(require("./type/extract"), exports);
__exportStar(require("./type/function"), exports);
__exportStar(require("./type/indexed"), exports);
__exportStar(require("./type/instance-type"), exports);
__exportStar(require("./type/integer"), exports);
__exportStar(require("./type/intersect"), exports);
__exportStar(require("./type/iterator"), exports);
__exportStar(require("./type/intrinsic"), exports);
__exportStar(require("./type/keyof"), exports);
__exportStar(require("./type/literal"), exports);
__exportStar(require("./type/mapped"), exports);
__exportStar(require("./type/never"), exports);
__exportStar(require("./type/not"), exports);
__exportStar(require("./type/null"), exports);
__exportStar(require("./type/number"), exports);
__exportStar(require("./type/object"), exports);
__exportStar(require("./type/omit"), exports);
__exportStar(require("./type/optional"), exports);
__exportStar(require("./type/parameters"), exports);
__exportStar(require("./type/partial"), exports);
__exportStar(require("./type/pick"), exports);
__exportStar(require("./type/promise"), exports);
__exportStar(require("./type/readonly"), exports);
__exportStar(require("./type/readonly-optional"), exports);
__exportStar(require("./type/record"), exports);
__exportStar(require("./type/recursive"), exports);
__exportStar(require("./type/ref"), exports);
__exportStar(require("./type/regexp"), exports);
__exportStar(require("./type/required"), exports);
__exportStar(require("./type/rest"), exports);
__exportStar(require("./type/return-type"), exports);
__exportStar(require("./type/schema"), exports);
__exportStar(require("./type/static"), exports);
__exportStar(require("./type/strict"), exports);
__exportStar(require("./type/string"), exports);
__exportStar(require("./type/symbol"), exports);
__exportStar(require("./type/template-literal"), exports);
__exportStar(require("./type/transform"), exports);
__exportStar(require("./type/tuple"), exports);
__exportStar(require("./type/uint8array"), exports);
__exportStar(require("./type/undefined"), exports);
__exportStar(require("./type/union"), exports);
__exportStar(require("./type/unknown"), exports);
__exportStar(require("./type/unsafe"), exports);
__exportStar(require("./type/void"), exports);
// ------------------------------------------------------------------
// Namespace
// ------------------------------------------------------------------
__exportStar(require("./type/type"), exports);
