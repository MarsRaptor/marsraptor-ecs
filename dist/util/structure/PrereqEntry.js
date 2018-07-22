"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrereqEntry {
    constructor(proto, after) {
        this._key = proto.key;
        this._value = proto.value !== undefined ? proto.value : null;
        this._prerequisites = after !== undefined && after !== null ? after : [];
    }
    get key() {
        return this._key;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get prerequisites() {
        return this._prerequisites;
    }
    compareTo(prereqItem) {
        if (this.prerequisites.indexOf(prereqItem.key) >= 0) {
            return 1;
        }
        else if (prereqItem.prerequisites.indexOf(this.key) >= 0) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
exports.PrereqEntry = PrereqEntry;
//# sourceMappingURL=PrereqEntry.js.map