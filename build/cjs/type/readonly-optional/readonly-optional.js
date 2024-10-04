"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadonlyOptional = ReadonlyOptional;
const index_1 = require("../readonly");
const index_2 = require("../optional");
/** `[Json]` Creates a Readonly and Optional property */
function ReadonlyOptional(schema) {
    return (0, index_1.Readonly)((0, index_2.Optional)(schema));
}
