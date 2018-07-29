// import { Component } from "./component";
// import { EntitySystem } from "./system";
// import { Entity } from "./entity";
// import { ECSContext } from "./context";
// import { Manager } from "./manager";

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

export {Component,ComponentManager} from './component'
export {ECSContext} from './context'
export {Entity,EntityManager,EntityObserver} from './entity'
export {Manager} from './manager'
export {EntitySystem,EntitySystemManager} from './system'
