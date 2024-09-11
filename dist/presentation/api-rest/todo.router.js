"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const express_1 = require("express");
class TodoRouter {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.get('/', this.controller.list.bind(this.controller));
        this.router.get('/:id', this.controller.get.bind(this.controller));
        this.router.delete('/:id', this.controller.delete.bind(this.controller));
        this.router.patch('/:id/toggle', this.controller.toggle.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.TodoRouter = TodoRouter;
