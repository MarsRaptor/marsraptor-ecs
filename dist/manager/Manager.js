"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    get id() {
        return this._id;
    }
    set context(context) {
        this._context = context;
    }
    get context() {
        return this._context;
    }
    constructor(id) {
        this._id = id;
    }
    added(entity) { }
    changed(entity) { }
    deleted(entity) { }
    enabled(entity) { }
    disabled(entity) { }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map