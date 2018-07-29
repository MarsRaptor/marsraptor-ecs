import { EntityObserver, Entity } from "../entity";
import { ECSContext } from "../context";


export abstract class EntitySystem implements EntityObserver {

    readonly id: string;
    private _context!: ECSContext;
    
    private allSet: Set<string>;
    private exclusionSet: Set<string>;
    private oneSet: Set<string>;

    private passive: boolean = false;

    private _actives: Set<Entity>;

    get isPassive(): boolean {
        return this.passive;
    }

    set isPassive(passive: boolean) {
        this.passive = passive;
    }

    get actives(): Set<Entity> {
        return this.actives;
    }

    setContext<CTX extends ECSContext>(context: CTX) {
        this._context = context;
    }

    getContext<CTX extends ECSContext>(): CTX {
        return this._context as CTX;
    }

    constructor(aspect: { allOff?: Array<string>, noneOf?: Array<string>, oneOf?: Array<string> }) {
        this.id = this.constructor.name;
        this._actives = new Set<Entity>();
        this.allSet = new Set<string>(aspect.allOff || []);
        this.exclusionSet = new Set<string>(aspect.noneOf || []);
        this.oneSet = new Set<string>(aspect.oneOf || []);
    }

    protected inserted(entity: Entity): void { };
    protected removed(entity: Entity): void { };
    protected abstract processEntities(entities: Set<Entity>): void;

    protected checkProcessing(): boolean{
        return true;
    }

    public initialize(): void {
        // Nothing
    }

    public added(entity: Entity): void {
        this.check(entity);
    }

    public changed(entity: Entity): void {
        this.check(entity);
    }

    public deleted(entity: Entity): void {
        if (entity.systemIDs.has(this.id)) {
            this.removeFromSystem(entity);
        }
    }

    public enabled(entity: Entity): void {
        this.check(entity);
    }

    public disabled(entity: Entity): void {
        if (entity.systemIDs.has(this.id)) {
            this.removeFromSystem(entity);
        }
    }

    private insertToSystem(entity: Entity): void {
        this._actives.add(entity);
        entity.systemIDs.add(this.id);
        this.inserted(entity);
    }

    private removeFromSystem(entity: Entity): void {
        this._actives.delete(entity);
        entity.systemIDs.delete(this.id);
        this.removed(entity);
    }

    public dispose(): void { }

    public begin(): void { }

    public process(): void {
        if (this.checkProcessing()) {
            this.begin();
            this.processEntities(this._actives);
            this.end();
        }
    }
    public end(): void { }

    protected check(entity: Entity): void {

        let contains: boolean = entity.systemIDs.has(this.id);
        let interested: boolean = true; // possibly interested, let's try to prove it wrong.

        let componentIDs: Set<string> = entity.componentIDs;

        // Check if the entity possesses ALL of the components defined in the aspect.
        if (this.allSet.size > 0) {

            for (const componentID of this.allSet) {
                if (!componentIDs.has(componentID)) {
                    interested = false;
                    break;
                }
            }
        }

        // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
        if (this.exclusionSet.size > 0 && interested) {

            for (const componentID of this.exclusionSet) {
                if (componentIDs.has(componentID)) {
                    interested = false;
                    break;
                }
            }
        }

        // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
        if (this.oneSet.size > 0 && interested) {

            for (const componentID of this.oneSet) {
                if (componentIDs.has(componentID)) {
                    break;
                }
            }
        }

        if (interested && !contains) {
            this.insertToSystem(entity);
        } else if (!interested && contains) {
            this.removeFromSystem(entity);
        }
    }

}