import Entity from "./Entity";

export default interface EntityObserver {

    added(entity: Entity): void;

    changed(entity: Entity): void;

    deleted(entity: Entity): void;

    enabled(entity: Entity): void;

    disabled(entity: Entity): void;

}