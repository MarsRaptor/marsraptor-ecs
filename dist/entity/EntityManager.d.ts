import { Guid } from "guid-typescript";
import { Manager } from "../manager";
import { Entity } from ".";
export declare class EntityManager extends Manager {
    private _entities;
    private _disabled;
    initialize(): void;
    createEntityInstance(): Entity;
    getEntity(entityID: Guid): Entity | null;
    added(entity: Entity): void;
    enabled(entity: Entity): void;
    disabled(entity: Entity): void;
    isActive(entityID: Guid): boolean;
    isEnabled(entityID: Guid): boolean;
    deleted(entity: Entity): void;
}
