/*!
 * marsraptor-ecs - v0.0.3-alpha.1
 * https://github.com/MarsRaptor/marsraptor-ecs
 * Compiled Mon, 06 Aug 2018 07:12:35 UTC
 *
 * marsraptor-ecs is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.__marsraptorECS=t.__marsraptorECS||{})}(this,function(t){"use strict";class e{constructor(){this.id=this.constructor.name}}class n{setContext(t){this._context=t}getContext(){return this._context}constructor(){this.id=this.constructor.name}initialize(){}added(t){}changed(t){}deleted(t){}enabled(t){}disabled(t){}}class i extends n{initialize(){this._components=new Map,this._deleted=new Set}getComponentsByID(t){let e=this._components.get(t);return void 0===e&&(e=new Map,this._components.set(t,e)),e}getComponent(t,e){let n=this._components.get(e);if(void 0!==n)return n.get(t.id)}getComponentsFor(t){let e=t.componentIDs,n=new Array;return e.forEach(e=>{let i=this.getComponent(t,e);i&&n.push(i)}),n}addComponent(t,e){t.componentIDs.add(e.id),this.getComponentsByID(e.id).set(t.id,e),this.getContext().changedEntity(t)}removeComponent(t,e){t.componentIDs.delete(e),this.getComponentsByID(e).delete(t.id),this.getContext().changedEntity(t)}removeComponentsOfEntity(t){t.componentIDs.forEach(e=>{this.removeComponent(t,e)}),t.componentIDs.clear()}clean(){this._deleted.size>0&&(this._deleted.forEach(t=>{this.removeComponentsOfEntity(t)}),this._deleted.clear())}deleted(t){this._deleted.add(t)}}var s=function(t,e){return e={exports:{}},t(e,e.exports),e.exports}(function(t,e){e.__esModule=!0;var n=function(){function t(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=t.EMPTY,e&&t.isGuid(e)&&(this.value=e)}return t.isGuid=function(e){var n=e.toString();return e&&(e instanceof t||t.validator.test(n))},t.create=function(){return new t([t.gen(2),t.gen(1),t.gen(1),t.gen(1),t.gen(3)].join("-"))},t.createEmpty=function(){return new t("emptyguid")},t.parse=function(e){return new t(e)},t.raw=function(){return[t.gen(2),t.gen(1),t.gen(1),t.gen(1),t.gen(3)].join("-")},t.gen=function(t){for(var e="",n=0;n<t;n++)e+=(65536*(1+Math.random())|0).toString(16).substring(1);return e},t.prototype.equals=function(e){return t.isGuid(e)&&this.value===e.toString()},t.prototype.isEmpty=function(){return this.value===t.EMPTY},t.prototype.toString=function(){return this.value},t.prototype.toJSON=function(){return{value:this.value}},t.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),t.EMPTY="00000000-0000-0000-0000-000000000000",t}();e.Guid=n});!function(t){t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")&&t.default}(s);var r=s.Guid;class o{setContext(t){this._context=t}getContext(){return this._context}get isActive(){return this.getContext().entityMgr.isActive(this.id)}get isEnabled(){return this.getContext().entityMgr.isEnabled(this.id)}constructor(t,e){this.id=e,this._context=t,this.componentIDs=new Set,this.systemIDs=new Set,this.reset()}addComponent(t){return this.getContext().componentMgr.addComponent(this,t),this}getComponent(t){return this.getContext().componentMgr.getComponent(this,t)}getComponents(){return this.getContext().componentMgr.getComponentsFor(this)}removeComponent(t){return this.removeComponentByType(t.id)}removeComponentByType(t){return this.getContext().componentMgr.removeComponent(this,t),this}reset(){this.componentIDs.clear(),this.systemIDs.clear()}}class h extends n{initialize(){this._entities=new Map,this._disabled=new Set}createEntityInstance(){return new o(this.getContext(),r.create())}getEntity(t){return this._entities.get(t)}added(t){this._entities.set(t.id,t)}enabled(t){this._disabled.delete(t.id)}disabled(t){this._disabled.add(t.id)}isActive(t){return this._entities.has(t)}isEnabled(t){return!this._disabled.has(t)}deleted(t){this._entities.delete(t.id),this._disabled.delete(t.id)}}class u{constructor(t,e){this._key=t.key,this._value=void 0!==t.value?t.value:null,this._prerequisites=void 0!==e&&null!==e?e:[]}get key(){return this._key}get value(){return this._value}set value(t){this._value=t}get prerequisites(){return this._prerequisites}compareTo(t){return this.prerequisites.indexOf(t.key)>=0?1:t.prerequisites.indexOf(this.key)>=0?-1:0}}class a{constructor(){this._orderedKeyList=[],this._orderedValueList=[],this._internalPrereqMap=new Map,this.updateInternal()}get size(){return this._internalPrereqMap.size}get keys(){return this._orderedKeyList}get values(){return this._orderedValueList}get map(){let t=new Map;for(let e=0;e<this.keys.length;e++){const n=this.keys[e];this.has(n)&&t.set(n,this.get(n))}return t}clear(){this._internalPrereqMap.clear()}delete(t){return!!this._internalPrereqMap.delete(t)&&this.updateInternal()}get(t){return this._internalPrereqMap.has(t)?this._internalPrereqMap.get(t).value:null}has(t){return this._internalPrereqMap.has(t)}set(t,e,n){return this._internalPrereqMap.set(t,new u({key:t,value:e},n)),this.updateInternal(),this}entries(){return this.map.entries()}forEach(t,e){return this.map.forEach(t,e)}updateInternal(){let t=new Map(Array.from(this._internalPrereqMap.entries()).sort((t,e)=>t[1].compareTo(e[1])));this._internalPrereqMap=t,this._orderedKeyList=Array.from(t.keys());let e=this.map;return this._orderedValueList=Array.from(e.values()),!0}}class c extends n{constructor(){super(),this._systemMap=new a}get systems(){return this._systemMap}initialize(){this._systemMap.forEach(t=>t.initialize())}getSystem(t){return this._systemMap.get(t)}getSystems(){return this._systemMap.values}addSystem(t,e){this._systemMap.set(t.id,t,e)}removeSystem(t){this._systemMap.delete(t)}clearSystems(){this._systemMap.clear()}}class f{constructor(){this.managers=new Map,this._added=new Set,this._changed=new Set,this._deleted=new Set,this._enable=new Set,this._disable=new Set,this.componentMgr=new i,this.setManager(this.componentMgr),this.entityMgr=new h,this.setManager(this.entityMgr),this.systemManager=new c,this.setManager(this.systemManager),this.mAddedPerformer={perform(t,e){t.added(e)}},this.mChangedPerformer={perform(t,e){t.changed(e)}},this.mDisabledPerformer={perform(t,e){t.disabled(e)}},this.mEnabledPerformer={perform(t,e){t.enabled(e)}},this.mDeletedPerformer={perform(t,e){t.deleted(e)}}}createEntity(){return this.entityMgr.createEntityInstance()}getEntity(t){return this.entityMgr.getEntity(t)}initialize(){this.managers.forEach(t=>t.initialize())}addEntity(t){this._added.add(t)}changedEntity(t){this.getEntity(t.id)&&this._changed.add(t)}deleteEntity(t){this.getEntity(t.id)&&this._deleted.add(t)}enable(t){this.getEntity(t.id)&&this._enable.add(t)}disable(t){this.getEntity(t.id)&&this._disable.add(t)}getSystem(t){return this.systemManager.getSystem(t)}getSystems(){return this.systemManager.getSystems()}setSystem(t,e=!1,...n){return t.setContext(this),t.isPassive=e,this.systemManager.addSystem(t,n),t}deleteSystem(t){this.systemManager.removeSystem(t.id)}setManager(t){return this.managers.set(t.id,t),t.setContext(this),t}getManager(t){return this.managers.get(t)}deleteManager(t){this.managers.delete(t.id)}notifySystems(t,e){this.systemManager.systems.forEach(n=>t.perform(n,e))}notifyManagers(t,e){this.managers.forEach(n=>t.perform(n,e))}check(t,e){t.size>0&&(t.forEach(t=>{this.notifyManagers(e,t);this.notifySystems(e,t)},this),t.clear())}process(){this.check(this._added,this.mAddedPerformer),this.check(this._changed,this.mChangedPerformer),this.check(this._disable,this.mDisabledPerformer),this.check(this._enable,this.mEnabledPerformer),this.check(this._deleted,this.mDeletedPerformer),this.componentMgr.clean(),this.systemManager.systems.forEach(t=>{t.isPassive||t.process()},this)}}class d{constructor(t){this.passive=!1,this.id=this.constructor.name,this._actives=new Set,this.allSet=new Set(t.allOff||[]),this.exclusionSet=new Set(t.noneOf||[]),this.oneSet=new Set(t.oneOf||[])}get isPassive(){return this.passive}set isPassive(t){this.passive=t}get actives(){return this.actives}setContext(t){this._context=t}getContext(){return this._context}inserted(t){}removed(t){}checkProcessing(){return!0}initialize(){}added(t){this.check(t)}changed(t){this.check(t)}deleted(t){t.systemIDs.has(this.id)&&this.removeFromSystem(t)}enabled(t){this.check(t)}disabled(t){t.systemIDs.has(this.id)&&this.removeFromSystem(t)}insertToSystem(t){this._actives.add(t),t.systemIDs.add(this.id),this.inserted(t)}removeFromSystem(t){this._actives.delete(t),t.systemIDs.delete(this.id),this.removed(t)}dispose(){}begin(){}process(){this.checkProcessing()&&(this.begin(),this.processEntities(this._actives),this.end())}end(){}check(t){let e=t.systemIDs.has(this.id),n=!0,i=t.componentIDs;if(this.allSet.size>0)for(const t of this.allSet)if(!i.has(t)){n=!1;break}if(this.exclusionSet.size>0&&n)for(const t of this.exclusionSet)if(i.has(t)){n=!1;break}if(this.oneSet.size>0&&n){n=!1;for(const t of this.oneSet)if(i.has(t)){n=!0;break}}n&&!e?this.insertToSystem(t):!n&&e&&this.removeFromSystem(t)}}t.Component=e,t.ComponentManager=i,t.ECSContext=f,t.Entity=o,t.EntityManager=h,t.Manager=n,t.EntitySystem=d,t.EntitySystemManager=c,t.PrereqEntry=u,t.PrereqMap=a,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=marsraptor-ecs.js.map