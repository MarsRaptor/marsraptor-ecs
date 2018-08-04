import Manager from "../manager/Manager";
import PrereqMap from "../util/structure/PrereqMap";
import EntitySystem from "./EntitySystem";


export default class EntitySystemManager extends Manager {

    private _systemMap: PrereqMap<string, EntitySystem>;

    constructor() {
        super();
        this._systemMap = new PrereqMap<string, EntitySystem>();
    }

    get systems(): PrereqMap<string, EntitySystem> {
        return this._systemMap;
    }

    public initialize(): void {
        this._systemMap.forEach(system => system.initialize());
    }

    public getSystem<SYS extends EntitySystem>(systemID: string): SYS {
        return this._systemMap.get(systemID) as SYS;
    }

    public getSystems(): Array<EntitySystem> {
        return this._systemMap.values;
    }

    public addSystem(system: EntitySystem, after?: string[]): void {
        this._systemMap.set(system.id, system,after as string[]);
    }

    public removeSystem(systemID: string): void {
        this._systemMap.delete(systemID);
    }

    public clearSystems(): void {
        this._systemMap.clear();
    }


}