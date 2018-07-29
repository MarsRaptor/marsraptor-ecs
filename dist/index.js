"use strict";
// import { Component } from "./component";
// import { EntitySystem } from "./system";
// import { Entity } from "./entity";
// import { ECSContext } from "./context";
// import { Manager } from "./manager";
Object.defineProperty(exports, "__esModule", { value: true });
// class LoggingECS extends ECSContext{
//     readonly loggingMgr:LoggingManager;
//     constructor() {
//         super();
//         this.loggingMgr = new LoggingManager();
//         this.setManager(this.loggingMgr)
//     }
// }
// class LoggingManager extends Manager{
//     public initialize(): void {
//        // NOTHING
//     }
//     log(...stuff: string[]) : void{
//         console.log(stuff.join(""));
//     }
// }
// class TestComponent extends Component{
//     constructor(text:string) {
//         super();
//         this.testString = text;
//     }
//     public testString:string;
// }
// class TestSystemLog extends EntitySystem {
//     constructor() {
//         super({oneOf:[TestComponent.name]});        
//     }
//     protected processEntities(entities: Set<Entity>): void {
//         entities.forEach(entity=>{
//             let component:TestComponent | undefined =  entity.getComponent(TestComponent.name);
//             if (component) {
//                 this.getContext<LoggingECS>().loggingMgr.log("testing : ",component.id," - ",component.testString)
//             }
//         },this)
//     }
// }
// class TestSystemSetToHello extends EntitySystem {
//     constructor() {
//         super({oneOf:[TestComponent.name]});        
//     }
//     protected processEntities(entities: Set<Entity>): void {
//         entities.forEach(entity=>{
//             let component:TestComponent | undefined =  entity.getComponent(TestComponent.name);
//             if (component) {
//                 component.testString = "Hello World !";
//             }
//         },this)
//         this.getContext().getSystem(TestSystemLog.name).isPassive = false;
//         this.isPassive = true;
//     }
// }
// let testContext:LoggingECS = new LoggingECS();
// let testEntity:Entity = testContext.createEntity();
// testContext.addEntity(testEntity);
// testContext.setSystem(new TestSystemLog(),false,TestSystemSetToHello.name);
// testContext.setSystem(new TestSystemSetToHello());
// testContext.initialize();
// testEntity.addComponent(new TestComponent("DefaultText"));
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