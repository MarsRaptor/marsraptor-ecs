"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../manager");
const PrereqMap_1 = require("../util/structure/PrereqMap");
class EntitySystemManager extends manager_1.Manager {
    constructor() {
        super();
        this._systemMap = new PrereqMap_1.PrereqMap();
    }
    get systems() {
        return this._systemMap;
    }
    initialize() {
        this._systemMap.forEach(system => system.initialize());
    }
    getSystem(systemID) {
        return this._systemMap.get(systemID);
    }
    getSystems() {
        return this._systemMap.values;
    }
    addSystem(system, after) {
        this._systemMap.set(system.id, system, after);
    }
    removeSystem(systemID) {
        this._systemMap.delete(systemID);
    }
    clearSystems() {
        this._systemMap.clear();
    }
}
exports.EntitySystemManager = EntitySystemManager;
//# sourceMappingURL=EntitySystemManager.js.map