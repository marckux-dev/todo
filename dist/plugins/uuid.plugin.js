"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidPlugin = void 0;
const uuid_1 = require("uuid");
class UuidPlugin {
    generate() {
        return (0, uuid_1.v4)();
    }
}
exports.UuidPlugin = UuidPlugin;
