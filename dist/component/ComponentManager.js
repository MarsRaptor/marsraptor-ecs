"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../manager");
class ComponentManager extends manager_1.Manager {
    initialize() {
        this._components = new Map();
        this._deleted = new Set();
    }
    getComponentsByID(componentID) {
        let components = this._components.get(componentID);
        if (components === undefined) {
            components = new Map();
            this._components.set(componentID, components);
        }
        return components;
    }
    getComponent(entity, componentID) {
        let components = this._components.get(componentID);
        if (components !== undefined) {
            return components.get(entity.id);
        }
        return undefined;
    }
    getComponentsFor(entity) {
        let componentIDs = entity.componentIDs;
        let componentSet = new Array();
        componentIDs.forEach(componentID => {
            let component = this.getComponent(entity, componentID);
            if (component) {
                componentSet.push(component);
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
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map