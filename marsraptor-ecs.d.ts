import { Guid } from "guid-typescript";

declare namespace MarsRaptorECS{

    class PrereqEntry<K, V> {
        private _key;
        private _value;
        private _prerequisites;
        constructor(proto: {
            key: K;
            value?: V;
        }, after?: K[]);
        readonly key: K;
        value: V | null;
        readonly prerequisites: K[];
        compareTo(prereqItem: PrereqEntry<K, V>): number;
    }

    class PrereqMap<K, V> {
        private _internalPrereqMap;
        private _orderedKeyList;
        private _orderedValueList;
        readonly size: number;
        readonly keys: K[];
        readonly values: V[];
        readonly map: Map<K, V>;
        /**
         *
         */
        constructor();
        clear(): void;
        delete(key: K): boolean;
        get(key: K): V | null;
        has(key: K): boolean;
        set(key: K, value: V, after: K[]): PrereqMap<K, V>;
        entries(): IterableIteratorShim<[K, V]>;
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        private updateInternal;
    }

    abstract class Component {
        readonly id: string;
        constructor();
    }

    class Entity {
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

    interface EntityObserver {
        added(entity: Entity): void;
        changed(entity: Entity): void;
        deleted(entity: Entity): void;
        enabled(entity: Entity): void;
        disabled(entity: Entity): void;
    }

    abstract class Manager implements EntityObserver {
        readonly id: string;
        private _context;
        setContext<CTX extends ECSContext>(context: CTX): void;
        getContext<CTX extends ECSContext>(): CTX;
        constructor();
        initialize(): void;
        added(entity: Entity): void;
        changed(entity: Entity): void;
        deleted(entity: Entity): void;
        enabled(entity: Entity): void;
        disabled(entity: Entity): void;
    }

    class ComponentManager extends Manager {
        private _components;
        private _deleted;
        initialize(): void;
        getComponentsByID<CMPNT extends Component>(componentID: string): Map<Guid, CMPNT>;
        getComponent<CMPNT extends Component>(entity: Entity, componentID: string): CMPNT | undefined;
        getComponentsFor(entity: Entity): Array<Component>;
        addComponent(entity: Entity, component: Component): void;
        removeComponent(entity: Entity, componentID: string): void;
        removeComponentsOfEntity(entity: Entity): void;
        clean(): void;
        deleted(entity: Entity): void;
    }

    abstract class EntitySystem implements EntityObserver {
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
    
    class EntitySystemManager extends Manager {
        private _systemMap;
        constructor();
        readonly systems: PrereqMap<string, EntitySystem>;
        initialize(): void;
        getSystem<SYS extends EntitySystem>(systemID: string): SYS;
        getSystems(): Array<EntitySystem>;
        addSystem(system: EntitySystem, after?: string[]): void;
        removeSystem(systemID: string): void;
        clearSystems(): void;
    }

    class ECSContext {
        readonly entityMgr: EntityManager;
        readonly componentMgr: ComponentManager;
        readonly systemManager: EntitySystemManager;
        readonly managers: Map<string, Manager>;
        private _added;
        private _changed;
        private _deleted;
        private _enable;
        private _disable;
        private mAddedPerformer;
        private mChangedPerformer;
        private mDisabledPerformer;
        private mEnabledPerformer;
        private mDeletedPerformer;
        constructor();
        createEntity(): Entity;
        getEntity(entityID: Guid): Entity | null;
        initialize(): void;
        addEntity(entity: Entity): void;
        changedEntity(entity: Entity): void;
        deleteEntity(entity: Entity): void;
        enable(entity: Entity): void;
        disable(entity: Entity): void;
        getSystem<SYS extends EntitySystem>(systemID: string): SYS;
        getSystems(): Array<EntitySystem>;
        setSystem(system: EntitySystem, passive?: boolean, ...after: string[]): EntitySystem;
        deleteSystem(system: EntitySystem): void;
        setManager(manager: Manager): Manager;
        getManager<MGR extends Manager>(managerID: string): MGR;
        deleteManager(manager: Manager): void;
        private notifySystems;
        private notifyManagers;
        private check;
        process(): void;
    }

    class EntityManager extends Manager {
        private _entities;
        private _disabled;
        initialize(): void;
        createEntityInstance(): Entity;
        getEntity(entityID: Guid): Entity | null;
        added(entity: Entity): void;
        enabled(entity: Entity): void;
        disabled(entity: Entity): void;
        isActive(entityID: Guid): boolean;
        isEnabled(entityID: Guid): boolean;
        deleted(entity: Entity): void;
    }
}

declare module "marsraptor-ecs" {
    export = MarsRaptorECS;
}
