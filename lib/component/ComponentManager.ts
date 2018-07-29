import { Guid } from "guid-typescript";
import { Manager } from "../manager";
import { Component } from ".";
import { Entity } from "../entity";

export class ComponentManager extends Manager {

    private _components!: Map<string, Map<Guid, Component>>;
    private _deleted!: Set<Entity>;

    public initialize(): void {
        this._components = new Map<string, Map<Guid, Component>>();
        this._deleted = new Set<Entity>();
     }

    public getComponentsByID<CMPNT extends Component>(componentID: string): Map<Guid, CMPNT> {
        let components: Map<Guid, CMPNT> | undefined = this._components.get(componentID) as Map<Guid, CMPNT> | undefined;
        if (components === undefined) {
            components = new Map<Guid, CMPNT>();
            this._components.set(componentID, components);
        }
        return components;
    }

    public getComponent<CMPNT extends Component> (entity: Entity, componentID: string): CMPNT | undefined {
        let components: Map<Guid, Component> | undefined = this._components.get(componentID);
        if (components !== undefined) {
            return components.get(entity.id) as CMPNT | undefined;
        }
        return undefined;
    }

    public getComponentsFor(entity: Entity): Array<Component> {

        let componentIDs: Set<string> = entity.componentIDs;
        let componentSet = new Array<Component>();

        componentIDs.forEach(componentID => {
            let component: Component | undefined = this.getComponent(entity, componentID);
            if (component) {
                componentSet.push(component);
            }
        });

        return componentSet;
    }

    public addComponent(entity: Entity,  component: Component): void {

        this.getComponentsByID(component.id).set(entity.id, component);
    }

    public removeComponent(entity: Entity, componentID: string): void {

        this.getComponentsByID(componentID).delete(entity.id);
        entity.componentIDs.delete(componentID);
        
    }

    public removeComponentsOfEntity(entity: Entity): void {

        let componentIDs: Set<string> = entity.componentIDs;

        componentIDs.forEach(componentID => {
            this.getComponentsByID(componentID).delete(entity.id);            
        });

        entity.componentIDs.clear();
    }

    public clean(): void {
        if (this._deleted.size > 0) {

            this._deleted.forEach(entity => {
                this.removeComponentsOfEntity(entity);
            });

            this._deleted.clear();
        }
    }

    public deleted(entity: Entity): void {
        this._deleted.add(entity);
    }

}