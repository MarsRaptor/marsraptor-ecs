import { Guid } from "guid-typescript";
import ECSContext from "../context/ECSContext";
import Component from "../component/Component";



export default class Entity {

    readonly id: Guid;
    readonly componentIDs: Set<string>;
    readonly systemIDs: Set<string>;

    private _context!: ECSContext;

    setContext<CTX extends ECSContext>(context: CTX) {
        this._context = context;
    }

    getContext<CTX extends ECSContext>(): CTX {
        return this._context as CTX;
    }

    get isActive() : boolean{
        return this.getContext().entityMgr.isActive(this.id);
    }

    get isEnabled() : boolean{
        return this.getContext().entityMgr.isEnabled(this.id);
    }

    constructor(context: ECSContext, id: Guid) {
        this.id = id;
        this._context = context;
        this.componentIDs = new Set<string>();
        this.systemIDs = new Set<string>();
        this.reset();
    }

    public addComponent( component:Component) :Entity{
        this.getContext().componentMgr.addComponent(this,component);
		return this;
    }

    public getComponent<CMPNT extends Component>( componentID:string):CMPNT | undefined{
        return this.getContext().componentMgr.getComponent(this,componentID);
    }
    
    public getComponents():Array<Component>  {
		return this.getContext().componentMgr.getComponentsFor(this);
    }

    public removeComponent(component:Component) :Entity{
		return this.removeComponentByType(component.id);
    }
    
    public removeComponentByType( componentID:string) {
        this.getContext().componentMgr.removeComponent(this,componentID);
		return this;
    }

    protected  reset() :void {
		this.componentIDs.clear();
		this.systemIDs.clear();
    }
}