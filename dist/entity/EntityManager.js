"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
const manager_1 = require("../manager");
const _1 = require(".");
class EntityManager extends manager_1.Manager {
    initialize() {
        this._entities = new Map();
        this._disabled = new Set();
    }
    createEntityInstance() {
        let entity = new _1.Entity(this.getContext(), guid_typescript_1.Guid.create());
        return entity;
    }
    getEntity(entityID) {
        return this._entities.get(entityID) || null;
    }
    added(entity) {
        this._entities.set(entity.id, entity);
    }
    enabled(entity) {
        this._disabled.delete(entity.id);
    }
    disabled(entity) {
        this._disabled.add(entity.id);
    }
    isActive(entityID) {
        return this._entities.has(entityID);
    }
    isEnabled(entityID) {
        return !this._disabled.has(entityID);
    }
    deleted(entity) {
        this._entities.delete(entity.id);
        this._disabled.delete(entity.id);
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=EntityManager.js.map