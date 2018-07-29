import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";
export declare abstract class Manager implements EntityObserver {
    readonly id: string;
    private _context;
    setContext<CTX extends ECSContext>(context: CTX): void;
    getContext<CTX extends ECSContext>(): CTX;
    constructor();
    abstract initialize(): void;
    added(entity: Entity): void;
    changed(entity: Entity): void;
    deleted(entity: Entity): void;
    enabled(entity: Entity): void;
    disabled(entity: Entity): void;
}
