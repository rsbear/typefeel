"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidDirectiveError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.InvalidDirectiveError = InvalidDirectiveError;
