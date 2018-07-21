"use strict";
// import { Component } from "./component";
// import { EntitySystem } from "./system";
// import { Entity } from "./entity";
// import { ECSContext } from "./context";
Object.defineProperty(exports, "__esModule", { value: true });
// class TestComponent extends Component{
//     public static ID:string = "TestComponent";
//     constructor(text:string) {
//         super(TestComponent.ID);
//         this.testString = text;
//     }
//     public testString:string;
// }
// class TestSystemLog extends EntitySystem {
//     public static ID:string = "TestSystemLog";
//     constructor() {
//         super(TestSystemLog.ID,{oneOf:new Set([TestComponent.ID])});        
//     }
//     protected checkProcessing(): boolean {
//         return true;
//     }
//     protected processEntities(entities: Set<Entity>): void {
//         entities.forEach(entity=>{
//             let component:TestComponent =  entity.getComponent(TestComponent.ID) as TestComponent;
//             console.log(component.testString);
//         },this)
//     }
// }
// class TestSystemSetToHello extends EntitySystem {
//     public static ID:string = "TestSystemSetToHello";
//     constructor() {
//         super(TestSystemSetToHello.ID,{oneOf:new Set([TestComponent.ID])});        
//     }
//     protected checkProcessing(): boolean {
//         return true;
//     }
//     protected processEntities(entities: Set<Entity>): void {
//         entities.forEach(entity=>{
//             let component:TestComponent =  entity.getComponent(TestComponent.ID) as TestComponent;
//             component.testString = "Hello World !";
//         },this)
//         this.context.getSystem(TestSystemLog.ID).isPassive = false;
//         this.isPassive = false;
//     }
// }
// let testContext:ECSContext = new ECSContext();
// let testEntity:Entity = testContext.createEntity();
// testContext.addEntity(testEntity);
// testContext.setSystem(new TestSystemLog(),true);
// testContext.setSystem(new TestSystemSetToHello());
// testEntity.addComponent(new TestComponent("DefaultText"));
// testContext.initialize();
// for (let i = 0; i <= 3; i++) {
//     console.log("process START iteration #",i);
//     testContext.process();
//     console.log("process END iteration #",i);
//     console.log("---");
// }
var component_1 = require("./component");
exports.Component = component_1.Component;
exports.ComponentManager = component_1.ComponentManager;
var context_1 = require("./context");
exports.ECSContext = context_1.ECSContext;
var entity_1 = require("./entity");
exports.Entity = entity_1.Entity;
exports.EntityManager = entity_1.EntityManager;
var manager_1 = require("./manager");
exports.Manager = manager_1.Manager;
var system_1 = require("./system");
exports.EntitySystem = system_1.EntitySystem;
exports.EntitySystemManager = system_1.EntitySystemManager;
//# sourceMappingURL=index.js.map