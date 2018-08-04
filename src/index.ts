// import ECSContext from "./context/ECSContext";
// import Manager from "./manager/Manager";
// import Component from "./component/Component";
// import EntitySystem from "./system/EntitySystem";
// import Entity from "./entity/Entity";

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
//         console.log(stuff.join(" "));
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

// testContext.setSystem(new TestSystemLog(),false,TestSystemSetToHello.name);

// testContext.setSystem(new TestSystemSetToHello());

// testContext.initialize();

// let testEntity:Entity = testContext.createEntity();

// testContext.addEntity(testEntity);

// testEntity.addComponent(new TestComponent("DefaultText"));

// for (let i = 0; i <= 3; i++) {
//     console.log("process START iteration #",i);
//     testContext.process();
//     console.log("process END iteration #",i);
//     console.log("---");
// }

export { default as Component } from "./component/Component";
export { default as ComponentManager } from "./component/ComponentManager";
export { default as ECSContext } from "./context/ECSContext";
export { default as Entity } from "./entity/Entity";
export { default as EntityManager } from "./entity/EntityManager";
export { default as EntityObserver } from "./entity/EntityObserver";
export { default as Manager } from "./manager/Manager";
export { default as EntitySystem } from "./system/EntitySystem";
export { default as EntitySystemManager } from "./system/EntitySystemManager";
export { default as PrereqEntry } from "./util/structure/PrereqEntry";
export { default as PrereqMap } from "./util/structure/PrereqMap";
