
import { Guid } from "guid-typescript";
import { EntityManager, Entity, EntityObserver } from "../entity";
import { ComponentManager } from "../component";
import { EntitySystemManager, EntitySystem } from "../system";
import { Manager } from "../manager";

export class ECSContext {

    readonly entityMgr: EntityManager;
    readonly componentMgr: ComponentManager;
    readonly systemManager:EntitySystemManager;
    readonly managers: Map<string,Manager> ;

    private _added: Set<Entity>;
    private _changed: Set<Entity>;
    private _deleted: Set<Entity>;
    private _enable: Set<Entity>;
    private _disable: Set<Entity>;

    private mAddedPerformer: Performer;
    private mChangedPerformer: Performer;
    private mDisabledPerformer: Performer;
    private mEnabledPerformer: Performer;
    private mDeletedPerformer: Performer;

    constructor() {
        this.managers = new Map<string,Manager>();

        this._added = new Set<Entity>();
        this._changed = new Set<Entity>();
        this._deleted = new Set<Entity>();
        this._enable = new Set<Entity>();
        this._disable = new Set<Entity>();

        this.componentMgr = new ComponentManager();
        this.setManager(this.componentMgr);

        this.entityMgr = new EntityManager();
        this.setManager(this.entityMgr);

        this.systemManager = new EntitySystemManager();
        this.setManager(this.systemManager);

        this.mAddedPerformer = {
            perform(observer: EntityObserver, e: Entity): void {
                observer.added(e);
            }
        };

        this.mChangedPerformer = {
            perform(observer: EntityObserver, e: Entity): void {
                observer.changed(e);
            }
        };

        this.mDisabledPerformer = {
            perform(observer: EntityObserver, e: Entity): void {
                observer.disabled(e);
            }
        };

        this.mEnabledPerformer = {
            perform(observer: EntityObserver, e: Entity): void {
                observer.enabled(e);
            }
        };

        this.mDeletedPerformer = {
            perform(observer: EntityObserver, e: Entity): void {
                observer.deleted(e);
            }
        };
    }

    public createEntity(): Entity {
        return this.entityMgr.createEntityInstance();
    }

    public getEntity(entityID: Guid): Entity | null {
        return this.entityMgr.getEntity(entityID);
    }

    public initialize(): void {
        this.managers.forEach(manager=>manager.initialize());
    }

    public addEntity(entity: Entity): void {
        this._added.add(entity);
    }

    public changedEntity(entity: Entity): void {
        this._changed.add(entity);
    }

    public deleteEntity(entity: Entity): void {
        this._deleted.add(entity);
    }

    public enable(entity: Entity): void {
        this._enable.add(entity);
    }

    public disable(entity: Entity): void {
        this._disable.add(entity);
    }

    public getSystem<SYS extends EntitySystem>(systemID:string): SYS {
        return this.systemManager.getSystem(systemID);
    }

    public getSystems(): Array<EntitySystem> {
        return this.systemManager.getSystems();
    }

    public setSystem(system: EntitySystem, passive: boolean =false,...after:string[]): EntitySystem {
        system.setContext(this);
        system.isPassive = passive;
        this.systemManager.addSystem(system,after);
        return system;
    }

    public deleteSystem(system: EntitySystem): void {
        this.systemManager.removeSystem(system.id);
    }

    public setManager(manager: Manager): Manager {
        this.managers.set(manager.id, manager);
        manager.setContext(this);
        return manager;
    }

    public getManager<MGR extends Manager>(managerID:string): MGR {
        return this.managers.get(managerID) as MGR;
    }

    public deleteManager(manager: Manager): void {
        this.managers.delete(manager.id);
    }

    private notifySystems(performer: Performer, entity: Entity): void {
        this.systemManager.systems.forEach(system=>performer.perform(system,entity));        
    }

    private notifyManagers(performer: Performer, entity: Entity): void {
        this.managers.forEach(manager=>performer.perform(manager,entity));        
    }

    private check(entities: Set<Entity>, performer: Performer): void {
        if (entities.size>0) {
            entities.forEach((entity)=>{
                this.notifyManagers(performer, entity);
                this.notifySystems(performer, entity);
            },this)            
            entities.clear();
        }
    }

    public process(): void {

        this.check(this._added, this.mAddedPerformer);
        this.check(this._changed, this.mChangedPerformer);
        this.check(this._disable, this.mDisabledPerformer);
        this.check(this._enable, this.mEnabledPerformer);
        this.check(this._deleted, this.mDeletedPerformer);

        this.componentMgr.clean();

        this.systemManager.systems.forEach(system => {
            if (!system.isPassive) {
                system.process();
            }
        },this);
        
    }

}

interface Performer {
    perform(observer: EntityObserver, entity: Entity): void;
}