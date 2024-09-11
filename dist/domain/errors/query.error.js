"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryError = void 0;
class QueryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryError';
    }
}
exports.QueryError = QueryError;
