import { PrereqEntry } from "./PrereqEntry";

export class PrereqMap<K, V>{

    private _internalPrereqMap: Map<K, PrereqEntry<K, V>>;
    private _orderedKeyList: K[];
    private _orderedValueList: V[];

    get size(): number {
        return this._internalPrereqMap.size;
    }

    get keys(): K[] {
        return this._orderedKeyList;
    }

    get values(): V[] {
        return this._orderedValueList;
    }

    get map(): Map<K, V> {
        let tempMap: Map<K, V> = new Map<K, V>();
        for (let index = 0; index < this.keys.length; index++) {
            const key = this.keys[index];
            if (this.has(key)) {
                tempMap.set(key, this.get(key));
            }
        }
        return tempMap;
    }

    /**
     *
     */
    constructor() {
        this._internalPrereqMap = new Map<K, PrereqEntry<K, V>>();  
        this.updateInternal()  
    }

    public clear(): void {
        this._internalPrereqMap.clear();
    }

    public delete(key: K): boolean {
        let superResult: boolean = this._internalPrereqMap.delete(key);
        if (superResult) {
            return this.updateInternal();
        }
        return false;
    }

    public get(key: K): V {
        if (this._internalPrereqMap.has(key)) {
            return this._internalPrereqMap.get(key).value;
        }
        return undefined;
    }

    public has(key: K): boolean {
        return this._internalPrereqMap.has(key);
    }

    public set(key: K, value: V, after: K[]): PrereqMap<K, V> {
        this._internalPrereqMap.set(key, new PrereqEntry({ key: key, value: value }, after));
        this.updateInternal();
        return this;
    }

    public entries() {
        return this.map.entries();
    }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
        return this.map.forEach(callbackfn, thisArg);
    }

    private updateInternal(): boolean {
        let tempInternalMap = new Map<K, PrereqEntry<K,V>>([...this._internalPrereqMap.entries()].sort(
            (a,b) =>{
                return a[1].compareTo(b[1]);
            }
        ));
        this._internalPrereqMap = tempInternalMap;

        this._orderedKeyList = Array.from(tempInternalMap.keys());
        let tempMap:Map<K,V> = this.map;
        this._orderedValueList = Array.from(tempMap.values());
        return true;
    }
}