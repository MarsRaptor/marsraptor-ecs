import { Manager } from "../manager";
import { EntitySystem } from ".";

export class EntitySystemManager extends Manager {

    public static readonly ID: string = "EntitySystemManager";

    // TODO use priorityqueue or something along those lines
    private _systemOrderMap: Map<string, string>;

    private _systems: Map<string, EntitySystem>;

    constructor() {
        super(EntitySystemManager.ID);
        this._systemOrderMap = new Map<string, string>();
        this._systems = new Map<string, EntitySystem>();
    }

    get systems(): Map<string, EntitySystem> {
        return this._systems;
    }

    get systemOrder(): Array<string> {

        let systemOrder: Array<string> = Array.from(this._systemOrderMap.keys());

        systemOrder.sort(this.systemSort.bind(this));

        return systemOrder;
    }

    public systemSort(a, b) {
        if (this._systemOrderMap.get(a) != null && this._systemOrderMap.get(a) == b) {
            return -1;
        } else if (this._systemOrderMap.get(b) != null && this._systemOrderMap.get(b) == a) {
            return 1;
        }
        return 0
    }

    public initialize(): void {
        this.systems.forEach(system => system.initialize());
    }

    public getSystemByID<SYS extends EntitySystem>(systemID: string): SYS {
        return this._systems.get(systemID) as SYS;
    }

    public getSystemUsedInContext<SYS extends EntitySystem>(systemID: string): SYS {

        if (this.context.systemIDs.has(systemID)) {
            return this.getSystemByID(systemID);

        }

        return null;
    }

    public getSystemsForContext(systemSet?: Set<EntitySystem>): Set<EntitySystem> {

        let systemIDs: Set<string> = this.context.systemIDs;
        systemSet = systemSet || new Set<EntitySystem>();

        systemIDs.forEach(systemID => {
            let system: EntitySystem = this.getSystemUsedInContext(systemID);
            if (system !== null) {
                systemSet.add(system);
            }
        });

        return systemSet;
    }

    public addSystem(system: EntitySystem, before?: string): void {
        this._systemOrderMap.set(system.id, before || null);

        this._systems.set(system.id, system);

        let order:string[] = this.systemOrder;

        let tempSystems = new Map<string, EntitySystem>([...this._systems.entries()].sort(
            function(a,b){
                return order.indexOf(a[0]) - order.indexOf(b[0]);
            }.bind(this)
        ));

        this._systems = tempSystems;

        this.context.systemIDs.add(system.id);
    }

    public removeSystem(systemID: string): void {
        this._systems.delete(systemID);
        this._systemOrderMap.delete(systemID);
        this.context.systemIDs.delete(systemID);
    }

    public removeSystemOfContext(): void {

        let systemIDs: Set<string> = this.context.systemIDs;

        systemIDs.forEach(systemID => {
            this.removeSystem(systemID);
        });

        this.context.systemIDs.clear();
    }


}