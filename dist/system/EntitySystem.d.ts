import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";
export declare abstract class EntitySystem implements EntityObserver {
    private _id;
    private _context;
    private allSet;
    private exclusionSet;
    private oneSet;
    private passive;
    private _actives;
    readonly id: string;
    isPassive: boolean;
    readonly actives: Set<Entity>;
    context: ECSContext;
    constructor(id: string, aspect: {
        allOff?: Set<string>;
        noneOf?: Set<string>;
        oneOf?: Set<string>;
    });
    protected inserted(entity: Entity): void;
    protected removed(entity: Entity): void;
    protected abstract processEntities(entities: Set<Entity>): void;
    protected abstract checkProcessing(): boolean;
    initialize(): void;
    added(entity: Entity): void;
    changed(entity: Entity): void;
    deleted(entity: Entity): void;
    enabled(entity: Entity): void;
    disabled(entity: Entity): void;
    private insertToSystem;
    private removeFromSystem;
    dispose(): void;
    begin(): void;
    process(): void;
    end(): void;
    protected check(entity: Entity): void;
}
