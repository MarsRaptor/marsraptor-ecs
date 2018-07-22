"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PrereqEntry_1 = require("./PrereqEntry");
class PrereqMap {
    /**
     *
     */
    constructor() {
        this._internalPrereqMap = new Map();
        this.updateInternal();
    }
    get size() {
        return this._internalPrereqMap.size;
    }
    get keys() {
        return this._orderedKeyList;
    }
    get values() {
        return this._orderedValueList;
    }
    get map() {
        let tempMap = new Map();
        for (let index = 0; index < this.keys.length; index++) {
            const key = this.keys[index];
            if (this.has(key)) {
                tempMap.set(key, this.get(key));
            }
        }
        return tempMap;
    }
    clear() {
        this._internalPrereqMap.clear();
    }
    delete(key) {
        let superResult = this._internalPrereqMap.delete(key);
        if (superResult) {
            return this.updateInternal();
        }
        return false;
    }
    get(key) {
        if (this._internalPrereqMap.has(key)) {
            return this._internalPrereqMap.get(key).value;
        }
        return undefined;
    }
    has(key) {
        return this._internalPrereqMap.has(key);
    }
    set(key, value, after) {
        this._internalPrereqMap.set(key, new PrereqEntry_1.PrereqEntry({ key: key, value: value }, after));
        this.updateInternal();
        return this;
    }
    entries() {
        return this.map.entries();
    }
    forEach(callbackfn, thisArg) {
        return this.map.forEach(callbackfn, thisArg);
    }
    updateInternal() {
        let tempInternalMap = new Map([...this._internalPrereqMap.entries()].sort((a, b) => {
            return a[1].compareTo(b[1]);
        }));
        this._internalPrereqMap = tempInternalMap;
        this._orderedKeyList = Array.from(tempInternalMap.keys());
        let tempMap = this.map;
        this._orderedValueList = Array.from(tempMap.values());
        return true;
    }
}
exports.PrereqMap = PrereqMap;
//# sourceMappingURL=PrereqMap.js.map