"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntitySystem {
    constructor(aspect) {
        this.passive = false;
        this.id = this.constructor.name;
        this._actives = new Set();
        this.allSet = aspect.allOff || new Set();
        this.exclusionSet = aspect.noneOf || new Set();
        this.oneSet = aspect.oneOf || new Set();
    }
    get isPassive() {
        return this.passive;
    }
    set isPassive(passive) {
        this.passive = passive;
    }
    get actives() {
        return this.actives;
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    inserted(entity) { }
    ;
    removed(entity) { }
    ;
    checkProcessing() {
        return true;
    }
    initialize() {
        // Nothing
    }
    added(entity) {
        this.check(entity);
    }
    changed(entity) {
        this.check(entity);
    }
    deleted(entity) {
        if (entity.systemIDs.has(this.id)) {
            this.removeFromSystem(entity);
        }
    }
    enabled(entity) {
        this.check(entity);
    }
    disabled(entity) {
        if (entity.systemIDs.has(this.id)) {
            this.removeFromSystem(entity);
        }
    }
    insertToSystem(entity) {
        this._actives.add(entity);
        entity.systemIDs.add(this.id);
        this.inserted(entity);
    }
    removeFromSystem(entity) {
        this._actives.delete(entity);
        entity.systemIDs.delete(this.id);
        this.removed(entity);
    }
    dispose() { }
    begin() { }
    process() {
        if (this.checkProcessing()) {
            this.begin();
            this.processEntities(this._actives);
            this.end();
        }
    }
    end() { }
    check(entity) {
        let contains = entity.systemIDs.has(this.id);
        let interested = true; // possibly interested, let's try to prove it wrong.
        let componentIDs = entity.componentIDs;
        // Check if the entity possesses ALL of the components defined in the aspect.
        if (this.allSet.size > 0) {
            for (const componentID of this.allSet) {
                if (!componentIDs.has(componentID)) {
                    interested = false;
                    break;
                }
            }
        }
        // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
        if (this.exclusionSet.size > 0 && interested) {
            for (const componentID of this.exclusionSet) {
                if (componentIDs.has(componentID)) {
                    interested = false;
                    break;
                }
            }
        }
        // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
        if (this.oneSet.size > 0 && interested) {
            for (const componentID of this.oneSet) {
                if (componentIDs.has(componentID)) {
                    break;
                }
            }
        }
        if (interested && !contains) {
            this.insertToSystem(entity);
        }
        else if (!interested && contains) {
            this.removeFromSystem(entity);
        }
    }
}
exports.EntitySystem = EntitySystem;
//# sourceMappingURL=EntitySystem.js.map