!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Automa:()=>A,addClass:()=>a,arrange:()=>y,assignObj:()=>c,autoClass:()=>j,buildInElementProps:()=>N,cel:()=>p,class1:()=>d,class2:()=>m,clean:()=>L,config:()=>h,createElement:()=>_,debugOn:()=>I,define:()=>g,elementID:()=>u,getElementList:()=>S,innerClean:()=>O,parseToCarmelCase:()=>T,parseToElement:()=>b,pick:()=>P,regis:()=>x,root:()=>f,setElement:()=>k,setInstruction:()=>v,undef:()=>E,useOnly:()=>C});let n={},i=!1,s={},r={},l=[],o=[];function a(e,t){e.classList.add(...t)}function c(e,t){Object.assign(e,t)}function u(e){return document.getElementById(e)}function p(e){return document.createElement(e)}function f(e){const t=u(void 0===e.name?"root":e.name);null==t||t.appendChild(e.child.target),(void 0===e.clean||null===e.clean||!0===e.clean)&&L()}function d(e){s=e}function m(e){r=e}function h(e){(null==e?void 0:e.class1)&&c(s,e.class1),(null==e?void 0:e.class2)&&c(r,e.class2),(null==e?void 0:e.define)&&g(e.define),(null==e?void 0:e.arrange)&&y(e.arrange)}function g(e){Object.assign(n,b(e))}function y(e){v(n,e)}function b(e){return e.slice().map((e=>{let t=e.split("-."),i=t[0],s=[""];const{propsName:r,className:l,elType:o}=T(i);let c=p(o);a(c,[l]),n[r]=N({target:c,propsName:r,elType:o}),2===t.length&&(s=t[1].split(","),s.map((e=>{j({el:n[r],class:e})})))})),n}function v(e,t){t.map((t=>{let n=t.replace(/\s+/g,"").split("="),s=1===n[0].split("-").length?n[0]:n[0].split("-"),r="",a=s;"string"!=typeof s&&(r=s[0],a=s[1]),"u"===r&&l.push(a),"ui"===r&&(o.push(a),l.push(a)),n[1].split(",").map((t=>{e[a].children([e[t]])})),i&&console.log(t)}))}function T(e){let t=e.split("-"),n=t.splice(t.length-1,1),i="";for(let e in t)0===Number(e)?i+=t[e].charAt(0).toLowerCase()+t[e].slice(1):i+=t[e].charAt(0).toUpperCase()+t[e].slice(1);return{propsName:i,className:t.join("-"),elType:n[0]}}function E(e,t){return void 0===e?t||null:e}function N(e){const t={};return t.target=E(e.target),t.propsName=E(e.propsName),t.elType=E(e.elType),t.pick=function(e){return e&&c(this,e),this},t.text=function(e){return this.target.textContent=e,this},t.inner=E(e.inner,{}),t._inner=function(){return this.inner={},this},t.modify=function(e){return e(this.target,this),this},t.children=function(e){return e.map((e=>{this.target.appendChild(e.target),this.inner[e.propsName]=e})),this},t._children=function(){return this.target.innerHTML="",this},t.style=function(e){return Object.assign(this.target.style,e),this},t._style=function(){return this.attr("style",""),this},t.rs=function(){let e=`${this.propsName}<${this.elType}> =`;for(let t in this.inner)e+=`, ${this.inner[t].propsName}<${this.inner[t].elType}>`;return e.replace("=,","=")},t.attr=function(e,t){return this.target.setAttribute(e,t),this},t.class=function(e){return this.target.classList.add(...e),this},t._class=function(){return this.attr("class",""),this},t.action=function(e,t){return this.target.addEventListener(e,t,!0),this},t._action=function(e,t){return this.target.removeEventListener(e,t,!0),this},t}function j(e){let t=s[e.class],n=r[e.class];t&&a(e.el.target,t),n&&c(e.el.target.style,n)}function C(e){let t={};e.map((e=>{t[e]=n[e]})),n=t}function O(e){e.map((e=>{n[e]._inner()}))}function x(e){n[e.name]=e.el}function L(){O(o),C(l)}function _(e){let t=N({});if(void 0!==e.el){let{propsName:n,className:i,elType:s}=T(e.el),r=document.createElement(s);r.classList.add(i),t.target=r,t.propsName=n,t.elType=s}return void 0!==e.pick&&t.pick(e.pick),void 0!==e.text&&t.text(e.text),void 0!==e.class&&t.class(e.class),void 0!==e.children&&t.children(e.children),void 0!==e.build&&t.modify(e.build),t}function I(){i=!0}function P(e){return n[e]}function k(e){return function(t){return e[t]}}function S(){return n}const A={addClass:a,assignObj:c,elementID:u,cel:p,parseToElement:b,setInstruction:v,undef:E,buildInElementProps:N,autoClass:j,createElement:_,setElement:k};return t})()));