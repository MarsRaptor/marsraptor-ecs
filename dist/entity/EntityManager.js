"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
const manager_1 = require("../manager");
const _1 = require(".");
class EntityManager extends manager_1.Manager {
    constructor() {
        super(EntityManager.ID);
        this._entities = new Map();
        this._disabled = new Set();
    }
    initialize() {
        // Nothing
    }
    createEntityInstance() {
        let entity = new _1.Entity(this.context, guid_typescript_1.Guid.create());
        return entity;
    }
    getEntity(entityID) {
        return this._entities.get(entityID);
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
EntityManager.ID = "EntityManager";
exports.EntityManager = EntityManager;
//# sourceMappingURL=EntityManager.js.map