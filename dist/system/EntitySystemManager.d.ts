import { Manager } from "../manager";
import { EntitySystem } from ".";
import { PrereqMap } from "../util/structure/PrereqMap";
export declare class EntitySystemManager extends Manager {
    private _systemMap;
    constructor();
    readonly systems: PrereqMap<string, EntitySystem>;
    initialize(): void;
    getSystem<SYS extends EntitySystem>(systemID: string): SYS;
    getSystems(): Array<EntitySystem>;
    addSystem(system: EntitySystem, after?: string[]): void;
    removeSystem(systemID: string): void;
    clearSystems(): void;
}
