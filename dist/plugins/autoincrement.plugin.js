"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoincrementPlugin = void 0;
class AutoincrementPlugin {
    constructor(counter = 0) {
        this.counter = counter;
    }
    generate() {
        return String(this.counter++);
    }
    setCounter(counter) {
        this.counter = counter;
    }
}
exports.AutoincrementPlugin = AutoincrementPlugin;
