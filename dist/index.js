"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const system_1 = require("./system");
const context_1 = require("./context");
const manager_1 = require("./manager");
class LoggingECS extends context_1.ECSContext {
    constructor() {
        super();
        this.loggingMgr = new LoggingManager();
        this.setManager(this.loggingMgr);
    }
}
class LoggingManager extends manager_1.Manager {
    initialize() {
        // NOTHING
    }
    log(...stuff) {
        console.log(stuff.join(""));
    }
}
class TestComponent extends component_1.Component {
    constructor(text) {
        super();
        this.testString = text;
    }
}
class TestSystemLog extends system_1.EntitySystem {
    constructor() {
        super({ oneOf: new Set([TestComponent.name]) });
    }
    processEntities(entities) {
        entities.forEach(entity => {
            let component = entity.getComponent(TestComponent.name);
            if (component) {
                this.getContext().loggingMgr.log("testing : ", component.id, " - ", component.testString);
            }
        }, this);
    }
}
class TestSystemSetToHello extends system_1.EntitySystem {
    constructor() {
        super({ oneOf: new Set([TestComponent.name]) });
    }
    processEntities(entities) {
        entities.forEach(entity => {
            let component = entity.getComponent(TestComponent.name);
            if (component) {
                component.testString = "Hello World !";
            }
        }, this);
        this.getContext().getSystem(TestSystemLog.name).isPassive = false;
        this.isPassive = true;
    }
}
let testContext = new LoggingECS();
let testEntity = testContext.createEntity();
testContext.addEntity(testEntity);
testContext.setSystem(new TestSystemLog(), false, TestSystemSetToHello.name);
testContext.setSystem(new TestSystemSetToHello());
testContext.initialize();
testEntity.addComponent(new TestComponent("DefaultText"));
for (let i = 0; i <= 3; i++) {
    console.log("process START iteration #", i);
    testContext.process();
    console.log("process END iteration #", i);
    console.log("---");
}
// export {Component,ComponentManager} from './component'
// export {ECSContext} from './context'
// export {Entity,EntityManager,EntityObserver} from './entity'
// export {Manager} from './manager'
// export {EntitySystem,EntitySystemManager} from './system'
//# sourceMappingURL=index.js.map