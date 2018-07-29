import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";


export abstract class Manager implements EntityObserver {

    readonly id: string;
    private _context!: ECSContext;

    setContext<CTX extends ECSContext>(context: CTX) {
        this._context = context;
    }

    getContext<CTX extends ECSContext>(): CTX {
        return this._context as CTX;
    }

    constructor() {
        this.id = this.constructor.name;
    }

    public abstract initialize(): void;   

    public added(entity: Entity): void { }

    public changed(entity: Entity): void { }

    public deleted(entity: Entity): void { }

    public enabled(entity: Entity): void { }

    public disabled(entity: Entity): void { }

}