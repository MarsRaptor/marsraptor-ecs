import { Guid } from "guid-typescript";
import { Manager } from "../manager";
import { Component } from ".";
import { Entity } from "../entity";
export declare class ComponentManager extends Manager {
    private _components;
    private _deleted;
    initialize(): void;
    getComponentsByID<CMPNT extends Component>(componentID: string): Map<Guid, CMPNT>;
    getComponent<CMPNT extends Component>(entity: Entity, componentID: string): CMPNT | undefined;
    getComponentsFor(entity: Entity): Array<Component>;
    addComponent(entity: Entity, component: Component): void;
    removeComponent(entity: Entity, componentID: string): void;
    removeComponentsOfEntity(entity: Entity): void;
    clean(): void;
    deleted(entity: Entity): void;
}
