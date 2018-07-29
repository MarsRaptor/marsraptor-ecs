import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";
export declare abstract class EntitySystem implements EntityObserver {
    readonly id: string;
    private _context;
    private allSet;
    private exclusionSet;
    private oneSet;
    private passive;
    private _actives;
    isPassive: boolean;
    readonly actives: Set<Entity>;
    setContext<CTX extends ECSContext>(context: CTX): void;
    getContext<CTX extends ECSContext>(): CTX;
    constructor(aspect: {
        allOff?: Array<string>;
        noneOf?: Array<string>;
        oneOf?: Array<string>;
    });
    protected inserted(entity: Entity): void;
    protected removed(entity: Entity): void;
    protected abstract processEntities(entities: Set<Entity>): void;
    protected checkProcessing(): boolean;
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
