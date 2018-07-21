import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";


export abstract class Manager implements EntityObserver {

    private _id: string;
    private _context: ECSContext;

    get id(): string {
        return this._id;
    }

    set context(context: ECSContext) {
        this._context = context;
    }

    get context(): ECSContext {
        return this._context;
    }

    constructor(id: string) {
        this._id = id;
    }

    public abstract initialize(): void;   

    public added(entity: Entity): void { }

    public changed(entity: Entity): void { }

    public deleted(entity: Entity): void { }

    public enabled(entity: Entity): void { }

    public disabled(entity: Entity): void { }

}