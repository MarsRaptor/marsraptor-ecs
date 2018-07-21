import { Guid } from "guid-typescript";
import { Manager } from "../manager";
import { Entity } from ".";
export declare class EntityManager extends Manager {
    static readonly ID: string;
    private _entities;
    private _disabled;
    constructor();
    initialize(): void;
    createEntityInstance(): Entity;
    getEntity(entityID: Guid): Entity;
    added(entity: Entity): void;
    enabled(entity: Entity): void;
    disabled(entity: Entity): void;
    isActive(entityID: Guid): boolean;
    isEnabled(entityID: Guid): boolean;
    deleted(entity: Entity): void;
}
