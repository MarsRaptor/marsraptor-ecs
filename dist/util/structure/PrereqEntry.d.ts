export declare class PrereqEntry<K, V> {
    private _key;
    private _value;
    private _prerequisites;
    constructor(proto: {
        key: K;
        value?: V;
    }, after?: K[]);
    readonly key: K;
    value: V | null;
    readonly prerequisites: K[];
    compareTo(prereqItem: PrereqEntry<K, V>): number;
}
