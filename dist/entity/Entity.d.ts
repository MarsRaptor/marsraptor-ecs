import { Guid } from "guid-typescript";
import { ECSContext } from "../context";
import { Component } from "../component";
export declare class Entity {
    readonly id: Guid;
    readonly componentIDs: Set<string>;
    readonly systemIDs: Set<string>;
    private _context;
    setContext<CTX extends ECSContext>(context: CTX): void;
    getContext<CTX extends ECSContext>(): CTX;
    readonly isActive: boolean;
    readonly isEnabled: boolean;
    constructor(context: ECSContext, id: Guid);
    addComponent(component: Component): Entity;
    getComponent<CMPNT extends Component>(componentID: string): CMPNT | undefined;
    getComponents(): Array<Component>;
    removeComponent(component: Component): Entity;
    removeComponentByType(componentID: string): this;
    protected reset(): void;
}
