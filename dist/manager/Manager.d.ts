import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";
export declare abstract class Manager implements EntityObserver {
    private _id;
    private _context;
    readonly id: string;
    context: ECSContext;
    constructor(id: string);
    abstract initialize(): void;
    added(entity: Entity): void;
    changed(entity: Entity): void;
    deleted(entity: Entity): void;
    enabled(entity: Entity): void;
    disabled(entity: Entity): void;
}
