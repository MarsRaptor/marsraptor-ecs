"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    get id() {
        return this._id;
    }
    get componentIDs() {
        return this._componentIDs;
    }
    get systemIDs() {
        return this._systemIDs;
    }
    get context() {
        return this._context;
    }
    get isActive() {
        return this.context.entityManager.isActive(this.id);
    }
    get isEnabled() {
        return this.context.entityManager.isEnabled(this.id);
    }
    constructor(context, id) {
        this._context = context;
        this._id = id;
        this._componentIDs = new Set();
        this._systemIDs = new Set();
        this.reset();
    }
    addComponent(component) {
        this.context.componentManager.addComponent(this, component);
        return this;
    }
    removeComponent(component) {
        return this.removeComponentByType(component.id);
    }
    removeComponentByType(componentID) {
        this.context.componentManager.removeComponent(this, componentID);
        return this;
    }
    getComponent(componentID) {
        return this.context.componentManager.getComponent(this, componentID);
    }
    getComponents(componentSet) {
        return this.context.componentManager.getComponentsFor(this, componentSet);
    }
    reset() {
        this._componentIDs.clear();
        this._systemIDs.clear();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map