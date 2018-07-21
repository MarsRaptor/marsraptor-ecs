import { Manager } from "../manager";
import { EntitySystem } from ".";
export declare class EntitySystemManager extends Manager {
    static readonly ID: string;
    private _systemOrderMap;
    private _systems;
    constructor();
    readonly systems: Map<string, EntitySystem>;
    readonly systemOrder: Array<string>;
    systemSort(a: any, b: any): 0 | 1 | -1;
    initialize(): void;
    getSystemByID<SYS extends EntitySystem>(systemID: string): SYS;
    getSystemUsedInContext<SYS extends EntitySystem>(systemID: string): SYS;
    getSystemsForContext(systemSet?: Set<EntitySystem>): Set<EntitySystem>;
    addSystem(system: EntitySystem, before?: string): void;
    removeSystem(systemID: string): void;
    removeSystemOfContext(): void;
}
