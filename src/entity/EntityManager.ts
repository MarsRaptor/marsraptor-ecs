import { Guid } from "guid-typescript";
import Manager from "../manager/Manager";
import Entity from "./Entity";


export default class EntityManager extends Manager {

    private _entities!: Map<Guid, Entity>;
    private _disabled!: Set<Guid>;

    public initialize(): void {
        this._entities = new Map<Guid, Entity>();
        this._disabled = new Set<Guid>();
    }

    public createEntityInstance(): Entity {
        let entity: Entity = new Entity(this.getContext(),Guid.create());
        return entity;
    }

    public getEntity(entityID:Guid) :Entity | null {
		return this._entities.get(entityID) || null;
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