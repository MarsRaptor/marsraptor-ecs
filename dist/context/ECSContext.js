"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
const component_1 = require("../component");
const system_1 = require("../system");
class ECSContext {
    get entityManager() {
        return this._entityMgr;
    }
    get componentManager() {
        return this._componentMgr;
    }
    get systemManager() {
        return this._entitySystemManager;
    }
    get systemIDs() {
        return this._systemIDs;
    }
    constructor() {
        this._managers = new Map();
        this._added = new Set();
        this._changed = new Set();
        this._deleted = new Set();
        this._enable = new Set();
        this._disable = new Set();
        this._componentMgr = new component_1.ComponentManager();
        this.setManager(this._componentMgr);
        this._entityMgr = new entity_1.EntityManager();
        this.setManager(this._entityMgr);
        this._entitySystemManager = new system_1.EntitySystemManager();
        this.setManager(this._entitySystemManager);
        this._systemIDs = new Set();
        this.mAddedPerformer = {
            perform(observer, e) {
                observer.added(e);
            }
        };
        this.mChangedPerformer = {
            perform(observer, e) {
                observer.changed(e);
            }
        };
        this.mDisabledPerformer = {
            perform(observer, e) {
                observer.disabled(e);
            }
        };
        this.mEnabledPerformer = {
            perform(observer, e) {
                observer.enabled(e);
            }
        };
        this.mDeletedPerformer = {
            perform(observer, e) {
                observer.deleted(e);
            }
        };
    }
    createEntity() {
        return this.entityManager.createEntityInstance();
    }
    getEntity(entityID) {
        return this.entityManager.getEntity(entityID);
    }
    initialize() {
        this._managers.forEach(manager => manager.initialize());
    }
    addEntity(entity) {
        this._added.add(entity);
    }
    changedEntity(entity) {
        this._changed.add(entity);
    }
    deleteEntity(entity) {
        this._deleted.add(entity);
    }
    enable(entity) {
        this._enable.add(entity);
    }
    disable(entity) {
        this._disable.add(entity);
    }
    getSystem(systemID) {
        return this.systemManager.getSystemByID(systemID);
    }
    getSystems() {
        return this.systemManager.getSystemsForContext();
    }
    setSystem(system, passive, before) {
        system.context = this;
        system.isPassive = passive || false;
        this.systemManager.addSystem(system, before);
        return system;
    }
    deleteSystem(system) {
        this.systemManager.removeSystem(system.id);
    }
    setManager(manager) {
        this._managers.set(manager.id, manager);
        manager.context = this;
        return manager;
    }
    getManager(managerID) {
        return this._managers.get(managerID);
    }
    deleteManager(manager) {
        this._managers.delete(manager.id);
    }
    notifySystems(performer, entity) {
        this.systemManager.systems.forEach(system => performer.perform(system, entity));
    }
    notifyManagers(performer, entity) {
        this._managers.forEach(manager => performer.perform(manager, entity));
    }
    check(entities, performer) {
        if (entities.size > 0) {
            entities.forEach((entity) => {
                this.notifyManagers(performer, entity);
                this.notifySystems(performer, entity);
            }, this);
            entities.clear();
        }
    }
    process() {
        this.check(this._added, this.mAddedPerformer);
        this.check(this._changed, this.mChangedPerformer);
        this.check(this._disable, this.mDisabledPerformer);
        this.check(this._enable, this.mEnabledPerformer);
        this.check(this._deleted, this.mDeletedPerformer);
        this.componentManager.clean();
        this.systemManager.systems.forEach(system => {
            if (!system.isPassive) {
                system.process();
            }
        }, this);
    }
}
exports.ECSContext = ECSContext;
//# sourceMappingURL=ECSContext.js.map