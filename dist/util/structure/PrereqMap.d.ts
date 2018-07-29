export declare class PrereqMap<K, V> {
    private _internalPrereqMap;
    private _orderedKeyList;
    private _orderedValueList;
    readonly size: number;
    readonly keys: K[];
    readonly values: V[];
    readonly map: Map<K, V>;
    /**
     *
     */
    constructor();
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V | null;
    has(key: K): boolean;
    set(key: K, value: V, after: K[]): PrereqMap<K, V>;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    private updateInternal;
}
