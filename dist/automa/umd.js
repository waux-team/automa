!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var s=t();for(var n in s)("object"==typeof exports?exports:e)[n]=s[n]}}(self,(()=>(()=>{"use strict";var e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Automa:()=>s});class s{constructor(e){this.element={},this.debug=!1,this.classArr={},this.classObj={},this.cleanArr=[],this.innerCleanArr=[],(null==e?void 0:e.classArr)&&(this.classArr=e.classArr),(null==e?void 0:e.classObj)&&(this.classObj=e.classObj),(null==e?void 0:e.define)&&this.define(e.define),(null==e?void 0:e.arrange)&&this.arrange(e.arrange)}root(e){const t=document.getElementById(void 0===e.name?"root":e.name);null==t||t.appendChild(e.child.target)}define(e){this.element=this.parseToElement(e)}useOnly(e){let t={};e.map((e=>{t[e]=this.element[e]})),this.element=t}innerClean(e){e.map((e=>{this.element[e]._inner()}))}clone(e){let t=this.buildInElementProps({target:this.element[e].target.cloneNode(!0),propsName:this.element[e].propsName,elType:this.element[e].elType});t._children();for(let s in this.element[e].inner){let n=this.element[e].inner[s].target.cloneNode(!0);t.target.appendChild(n),t.inner[s]=this.buildInElementProps({target:n,propsName:this.element[e].inner[s].propsName,elType:this.element[e].inner[s].elType})}return t}regis(e){this.element[e.elName]=e.component}defineClassArray(e){this.classArr=e}defineClassObject(e){this.classObj=e}arrange(e){e.map((e=>{let t=e.replace(/\s+/g,""),s=t.split("="),n=1===s[0].split("-").length?s[0]:s[0].split("-"),i="",r=n;"string"!=typeof n&&(i=n[0],r=n[1]),"u"===i&&this.cleanArr.push(r),"ui"===i&&(this.innerCleanArr.push(r),this.cleanArr.push(r)),s[1].split(",").map((e=>{this.pick(r).children([this.pick(e)])})),this.debug&&console.log(t)}))}clean(){this.innerClean(this.innerCleanArr),this.useOnly(this.cleanArr)}cel(e){return document.createElement(e)}autoClass(e){let t=this.classArr[e.class],s=this.classObj[e.class];t&&e.el.target.classList.add(...t),s&&Object.assign(e.el.target.style,s)}parseToElement(e){const t=e.slice(),s={};return t.map((e=>{let t=e.split("-."),n=t[0],i=[""];const{propsName:r,className:l,elType:a}=this.parseToCarmelCase(n);let o=this.cel(a);o.classList.add(l),s[r]=this.buildInElementProps({target:o,propsName:r,elType:a}),2===t.length&&(i=t[1].split(","),i.map((e=>{this.autoClass({el:s[r],class:e})})))})),s}parseToCarmelCase(e){let t=e.split("-"),s=t.splice(t.length-1,1),n="";for(let e in t)0===Number(e)?n+=t[e].charAt(0).toLowerCase()+t[e].slice(1):n+=t[e].charAt(0).toUpperCase()+t[e].slice(1);return{propsName:n,className:t.join("-"),elType:s[0]}}isUndefined(e,t){return void 0===e?t:e}buildInElementProps(e){return{target:this.isUndefined(e.target,null),propsName:this.isUndefined(e.propsName,null),elType:this.isUndefined(e.elType,null),inner:this.isUndefined(e.inner,{}),pick:this.isUndefined(e.pick,null),_inner:function(){return this.inner={},this},modify:function(e){return e(this.target,this),this},text:function(e){return this.target.textContent=e,this},children:function(e){return e.map((e=>{this.target.appendChild(e.target),this.inner[e.propsName]=e})),this},_children:function(){return this.target.innerHTML="",this},style:function(e){return Object.assign(this.target.style,e),this},_style:function(){return this.attr("style",""),this},class:function(e){return this.target.classList.add(...e),this},_class:function(){return this.attr("class",""),this},action:function(e,t){return this.target.addEventListener(e,t,!0),this},_action:function(e,t){return this.target.remiveEventListener(e,t,!0),this},relationship:function(){let e=this.propsName+"<"+this.elType+">=";for(let t in this.inner)e+=","+this.inner[t].propsName+"<"+this.inner[t].elType+">";return e.replace("=,","=")},attr:function(e,t){return this.target.setAttribute(e,t),this}}}pick(e){return this.element[e]}createElement(e){let t=this.buildInElementProps({});if(void 0!==e.el){let{propsName:s,className:n,elType:i}=this.parseToCarmelCase(e.el),r=document.createElement(i);r.classList.add(n),t.target=r,t.propsName=s,t.elType=i}return void 0!==e.pick&&(t=e.pick),void 0!==e.text&&t.text(e.text),void 0!==e.class&&t.class(e.class),void 0!==e.children&&t.children(e.children),void 0!==e.build&&t.modify(e.build),t}debugOn(){this.debug=!0}}return t})()));