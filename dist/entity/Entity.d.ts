import { Guid } from "guid-typescript";
import { ECSContext } from "../context";
import { Component } from "../component";
export declare class Entity {
    private _id;
    private _componentIDs;
    private _systemIDs;
    private _context;
    readonly id: Guid;
    readonly componentIDs: Set<string>;
    readonly systemIDs: Set<string>;
    readonly context: ECSContext;
    readonly isActive: boolean;
    readonly isEnabled: boolean;
    constructor(context: ECSContext, id: Guid);
    addComponent(component: Component): Entity;
    removeComponent(component: Component): Entity;
    removeComponentByType(componentID: string): this;
    getComponent(componentID: string): Component;
    getComponents(componentSet?: Set<Component>): Set<Component>;
    protected reset(): void;
}
