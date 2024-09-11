"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDatasource = void 0;
class TodoDatasource {
    constructor(idProvider) {
        this.idProvider = idProvider;
    }
    generateId() {
        return this.idProvider.generate();
    }
}
exports.TodoDatasource = TodoDatasource;
