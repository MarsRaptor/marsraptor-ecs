"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    constructor() {
        this.id = this.constructor.name;
    }
    added(entity) { }
    changed(entity) { }
    deleted(entity) { }
    enabled(entity) { }
    disabled(entity) { }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map