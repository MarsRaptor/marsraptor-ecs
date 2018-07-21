"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../manager");
class EntitySystemManager extends manager_1.Manager {
    constructor() {
        super(EntitySystemManager.ID);
        this._systemOrderMap = new Map();
        this._systems = new Map();
    }
    get systems() {
        return this._systems;
    }
    get systemOrder() {
        let systemOrder = Array.from(this._systemOrderMap.keys());
        systemOrder.sort(this.systemSort.bind(this));
        return systemOrder;
    }
    systemSort(a, b) {
        if (this._systemOrderMap.get(a) != null && this._systemOrderMap.get(a) == b) {
            return -1;
        }
        else if (this._systemOrderMap.get(b) != null && this._systemOrderMap.get(b) == a) {
            return 1;
        }
        return 0;
    }
    initialize() {
        this.systems.forEach(system => system.initialize());
    }
    getSystemByID(systemID) {
        return this._systems.get(systemID);
    }
    getSystemUsedInContext(systemID) {
        if (this.context.systemIDs.has(systemID)) {
            return this.getSystemByID(systemID);
        }
        return null;
    }
    getSystemsForContext(systemSet) {
        let systemIDs = this.context.systemIDs;
        systemSet = systemSet || new Set();
        systemIDs.forEach(systemID => {
            let system = this.getSystemUsedInContext(systemID);
            if (system !== null) {
                systemSet.add(system);
            }
        });
        return systemSet;
    }
    addSystem(system, before) {
        this._systemOrderMap.set(system.id, before || null);
        this._systems.set(system.id, system);
        let order = this.systemOrder;
        let tempSystems = new Map([...this._systems.entries()].sort(function (a, b) {
            return order.indexOf(a[0]) - order.indexOf(b[0]);
        }.bind(this)));
        this._systems = tempSystems;
        this.context.systemIDs.add(system.id);
    }
    removeSystem(systemID) {
        this._systems.delete(systemID);
        this._systemOrderMap.delete(systemID);
        this.context.systemIDs.delete(systemID);
    }
    removeSystemOfContext() {
        let systemIDs = this.context.systemIDs;
        systemIDs.forEach(systemID => {
            this.removeSystem(systemID);
        });
        this.context.systemIDs.clear();
    }
}
EntitySystemManager.ID = "EntitySystemManager";
exports.EntitySystemManager = EntitySystemManager;
//# sourceMappingURL=EntitySystemManager.js.map