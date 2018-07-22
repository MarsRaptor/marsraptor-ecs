import { Manager } from "../manager";
import { EntitySystem } from ".";
import { PrereqMap } from "../util/structure/PrereqMap";

export class EntitySystemManager extends Manager {

    public static readonly ID: string = "EntitySystemManager";

    private _systemMap: PrereqMap<string, EntitySystem>;

    constructor() {
        super(EntitySystemManager.ID);
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
        this._systemMap.set(system.id, system,after);
    }

    public removeSystem(systemID: string): void {
        this._systemMap.delete(systemID);
    }

    public removeSystemOfContext(): void {
        this._systemMap.clear();
    }


}