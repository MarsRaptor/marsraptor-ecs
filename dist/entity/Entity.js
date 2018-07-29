"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    get isActive() {
        return this.getContext().entityMgr.isActive(this.id);
    }
    get isEnabled() {
        return this.getContext().entityMgr.isEnabled(this.id);
    }
    constructor(context, id) {
        this.id = id;
        this._context = context;
        this.componentIDs = new Set();
        this.systemIDs = new Set();
        this.reset();
    }
    addComponent(component) {
        this.getContext().componentMgr.addComponent(this, component);
        return this;
    }
    getComponent(componentID) {
        return this.getContext().componentMgr.getComponent(this, componentID);
    }
    getComponents() {
        return this.getContext().componentMgr.getComponentsFor(this);
    }
    removeComponent(component) {
        return this.removeComponentByType(component.id);
    }
    removeComponentByType(componentID) {
        this.getContext().componentMgr.removeComponent(this, componentID);
        return this;
    }
    reset() {
        this.componentIDs.clear();
        this.systemIDs.clear();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map