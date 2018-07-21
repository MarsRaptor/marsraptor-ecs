import { Guid } from "guid-typescript";
import { ECSContext } from "../context";
import { Component } from "../component";


export class Entity {

    private _id: Guid;
    private _componentIDs: Set<string>;
    private _systemIDs: Set<string>;
    private _context: ECSContext;

    get id(): Guid {
        return this._id;
    }

    get componentIDs() : Set<string>{
        return this._componentIDs;
    }

    get systemIDs() : Set<string>{
        return this._systemIDs;
    }

    get context() : ECSContext{
        return this._context;
    }

    get isActive() : boolean{
        return this.context.entityManager.isActive(this.id);
    }

    get isEnabled() : boolean{
        return this.context.entityManager.isEnabled(this.id);
    }

    constructor(context: ECSContext, id: Guid) {
        this._context = context;
        this._id = id;
        this._componentIDs = new Set<string>();
        this._systemIDs = new Set<string>();
        this.reset();
    }

    public addComponent( component:Component) :Entity{
        this.context.componentManager.addComponent(this,component);
		return this;
    }

    public removeComponent(component:Component) :Entity{
		return this.removeComponentByType(component.id);
    }
    
    public removeComponentByType( componentID:string) {
        this.context.componentManager.removeComponent(this,componentID);
		return this;
    }

    public getComponent( componentID:string):Component {
        return this.context.componentManager.getComponent(this,componentID);
    }
    
    public getComponents(componentSet?:Set<Component> ):Set<Component>  {
		return this.context.componentManager.getComponentsFor(this,componentSet);
    }

    protected  reset() :void {
		this._componentIDs.clear();
		this._systemIDs.clear();
    }
}