
import { Guid } from "guid-typescript";
import { EntityManager, Entity, EntityObserver } from "../entity";
import { ComponentManager } from "../component";
import { EntitySystemManager, EntitySystem } from "../system";
import { Manager } from "../manager";

export class ECSContext {

    private _entityMgr: EntityManager;
    private _componentMgr: ComponentManager;
    private _entitySystemManager:EntitySystemManager;
    private _managers: Map<string,Manager>;

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

    get entityManager(): EntityManager {
        return this._entityMgr;
    }

    get componentManager(): ComponentManager {
        return this._componentMgr;
    }

    get systemManager() : EntitySystemManager{
        return this._entitySystemManager;
    }

    get systemIDs() : Array<string>{
        return this.systemManager.systems.keys;
    }

    constructor() {
        this._managers = new Map<string,Manager>();

        this._added = new Set<Entity>();
        this._changed = new Set<Entity>();
        this._deleted = new Set<Entity>();
        this._enable = new Set<Entity>();
        this._disable = new Set<Entity>();

        this._componentMgr = new ComponentManager();
        this.setManager(this._componentMgr);

        this._entityMgr = new EntityManager();
        this.setManager(this._entityMgr);

        this._entitySystemManager = new EntitySystemManager();
        this.setManager(this._entitySystemManager);

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
        return this.entityManager.createEntityInstance();
    }

    public getEntity(entityID: Guid): Entity {
        return this.entityManager.getEntity(entityID);
    }

    public initialize(): void {
        this._managers.forEach(manager=>manager.initialize());
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

    public getSystem<SYS extends EntitySystem>(systemID): SYS {
        return this.systemManager.getSystem(systemID);
    }

    public getSystems(): Array<EntitySystem> {
        return this.systemManager.getSystems();
    }

    public setSystem(system: EntitySystem, passive?: boolean,...after:string[]): EntitySystem {
        system.context = this;
        system.isPassive = passive || false;
        this.systemManager.addSystem(system,after);
        return system;
    }

    public deleteSystem(system: EntitySystem): void {
        this.systemManager.removeSystem(system.id);
    }

    public setManager(manager: Manager): Manager {
        this._managers.set(manager.id, manager);
        manager.context =this;
        return manager;
    }

    public getManager<MGR extends Manager>(managerID:string): MGR {
        return this._managers.get(managerID) as MGR;
    }

    public deleteManager(manager: Manager): void {
        this._managers.delete(manager.id);
    }

    private notifySystems(performer: Performer, entity: Entity): void {
        this.systemManager.systems.forEach(system=>performer.perform(system,entity));        
    }

    private notifyManagers(performer: Performer, entity: Entity): void {
        this._managers.forEach(manager=>performer.perform(manager,entity));        
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

        this.componentManager.clean();

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