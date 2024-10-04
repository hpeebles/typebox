"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BigInt = BigInt;
const index_1 = require("../symbols");
const index_2 = require("../create");
/** `[JavaScript]` Creates a BigInt type */
function BigInt(options) {
    return (0, index_2.CreateType)({ [index_1.Kind]: 'BigInt', type: 'bigint' }, options);
}
