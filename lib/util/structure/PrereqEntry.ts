
export class PrereqEntry<K,V>{
    private _key:K;
    private _value:V | null;
    private _prerequisites:K[];

    constructor(proto:{key:K,value?:V},after?:K[]) {
        this._key = proto.key;
        this._value = proto.value !== undefined ? proto.value : null;
        this._prerequisites = after !== undefined && after !== null ? after : [];
    }

    get key() : K{
        return this._key;
    }

    get value() :V | null{
        return this._value;
    }

    set value(value:V |null) {
        this._value = value;
    }

    get prerequisites() : K[]{
        return this._prerequisites;
    }

    public compareTo(prereqItem:PrereqEntry<K,V>) : number{

        if (this.prerequisites.indexOf(prereqItem.key) >= 0) {
            return 1;
        } else if (prereqItem.prerequisites.indexOf(this.key) >= 0){
            return -1;
        } else {
            return 0;
        }

    }
}