import { Guid } from "guid-typescript";
import { Manager } from "../manager";
import { Entity } from ".";


export class EntityManager extends Manager {

    public static readonly ID:string = "EntityManager";

    private _entities: Map<Guid, Entity>;
    private _disabled: Set<Guid>;

    constructor(){
        super(EntityManager.ID);
        this._entities = new Map<Guid, Entity>();
        this._disabled = new Set<Guid>();
    }

    public initialize(): void {
        // Nothing
    }

    public createEntityInstance(): Entity {
        let entity: Entity = new Entity(this.context,Guid.create());
        return entity;
    }

    public getEntity(entityID:Guid) :Entity {
		return this._entities.get(entityID);
    }

    public added(entity: Entity): void {
        this._entities.set(entity.id, entity);
    }

    public enabled(entity: Entity): void {
        this._disabled.delete(entity.id);
    }

    public disabled(entity: Entity): void {
        this._disabled.add(entity.id);
    }

    public isActive(entityID:Guid) :boolean {
		return this._entities.has(entityID);
    }

    public isEnabled(entityID:Guid) :boolean {
		return !this._disabled.has(entityID);
    }

    public deleted(entity: Entity): void { 
        this._entities.delete(entity.id);
        this._disabled.delete(entity.id);
    }
}