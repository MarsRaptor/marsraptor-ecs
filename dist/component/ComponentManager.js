"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../manager");
class ComponentManager extends manager_1.Manager {
    constructor() {
        super(ComponentManager.ID);
        this._components = new Map();
        this._deleted = new Set();
    }
    initialize() { }
    getComponentsByID(componentID) {
        let components = this._components.get(componentID);
        if (components == null) {
            components = new Map();
            this._components.set(componentID, components);
        }
        return components;
    }
    getComponent(entity, componentID) {
        let components = this._components.get(componentID);
        if (components != null) {
            return components.get(entity.id);
        }
        return null;
    }
    getComponentsFor(entity, componentSet) {
        let componentIDs = entity.componentIDs;
        componentSet = componentSet || new Set();
        componentIDs.forEach(componentID => {
            let component = this.getComponent(entity, componentID);
            if (component !== null) {
                componentSet.add(component);
            }
        });
        return componentSet;
    }
    addComponent(entity, component) {
        this.getComponentsByID(component.id).set(entity.id, component);
    }
    removeComponent(entity, componentID) {
        this.getComponentsByID(componentID).delete(entity.id);
        entity.componentIDs.delete(componentID);
    }
    removeComponentsOfEntity(entity) {
        let componentIDs = entity.componentIDs;
        componentIDs.forEach(componentID => {
            this.getComponentsByID(componentID).delete(entity.id);
        });
        entity.componentIDs.clear();
    }
    clean() {
        if (this._deleted.size > 0) {
            this._deleted.forEach(entity => {
                this.removeComponentsOfEntity(entity);
            });
            this._deleted.clear();
        }
    }
    deleted(entity) {
        this._deleted.add(entity);
    }
}
ComponentManager.ID = "ComponentManager";
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map