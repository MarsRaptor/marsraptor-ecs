"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
const component_1 = require("../component");
const system_1 = require("../system");
class ECSContext {
    constructor() {
        this.managers = new Map();
        this._added = new Set();
        this._changed = new Set();
        this._deleted = new Set();
        this._enable = new Set();
        this._disable = new Set();
        this.componentMgr = new component_1.ComponentManager();
        this.setManager(this.componentMgr);
        this.entityMgr = new entity_1.EntityManager();
        this.setManager(this.entityMgr);
        this.systemManager = new system_1.EntitySystemManager();
        this.setManager(this.systemManager);
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
        return this.entityMgr.createEntityInstance();
    }
    getEntity(entityID) {
        return this.entityMgr.getEntity(entityID);
    }
    initialize() {
        this.managers.forEach(manager => manager.initialize());
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
        return this.systemManager.getSystem(systemID);
    }
    getSystems() {
        return this.systemManager.getSystems();
    }
    setSystem(system, passive = false, ...after) {
        system.setContext(this);
        system.isPassive = passive;
        this.systemManager.addSystem(system, after);
        return system;
    }
    deleteSystem(system) {
        this.systemManager.removeSystem(system.id);
    }
    setManager(manager) {
        this.managers.set(manager.id, manager);
        manager.setContext(this);
        return manager;
    }
    getManager(managerID) {
        return this.managers.get(managerID);
    }
    deleteManager(manager) {
        this.managers.delete(manager.id);
    }
    notifySystems(performer, entity) {
        this.systemManager.systems.forEach(system => performer.perform(system, entity));
    }
    notifyManagers(performer, entity) {
        this.managers.forEach(manager => performer.perform(manager, entity));
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
        this.componentMgr.clean();
        this.systemManager.systems.forEach(system => {
            if (!system.isPassive) {
                system.process();
            }
        }, this);
    }
}
exports.ECSContext = ECSContext;
//# sourceMappingURL=ECSContext.js.map