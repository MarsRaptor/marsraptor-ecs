// import { Component } from "./component";
// import { EntitySystem } from "./system";
// import { Entity } from "./entity";
// import { ECSContext } from "./context";


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
//             console.log("testing : ",component.testString);
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
//         this.isPassive = true;
//     }
    
// }

// let testContext:ECSContext = new ECSContext();
// let testEntity:Entity = testContext.createEntity();

// testContext.addEntity(testEntity);

// testContext.setSystem(new TestSystemLog(),false,TestSystemSetToHello.ID);

// testContext.setSystem(new TestSystemSetToHello());

// testEntity.addComponent(new TestComponent("DefaultText"));

// testContext.initialize();


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