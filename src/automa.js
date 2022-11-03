let element = {};
let debug = false;
let classArr = {};
let classObj = {};
let cleanArr = [];
let innerCleanArr = [];

export function addClass(el, list) {
  el.classList.add(...list);
}
export function assignObj(target, assign) {
  Object.assign(target, assign);
}
export function elementID(name) {
  return document.getElementById(name);
}
export function cel(type) {
  return document.createElement(type);
}
export function root(props) {
  const root = elementID(props.name === undefined ? "root" : props.name);
  root === null || root === undefined
    ? undefined
    : root.appendChild(props.child.target);

  props.clean === undefined || props.clean === null || props.clean === true
    ? clean()
    : null;
}
export function class1(props) {
  classArr = props;
}
export function class2(props) {
  classObj = props;
}
export function config(props) {
  if (props === null || props === undefined ? undefined : props.class1) {
    assignObj(classArr, props.class1);
  }
  if (props === null || props === undefined ? undefined : props.class2) {
    assignObj(classObj, props.class2);
  }
  if (props === null || props === undefined ? undefined : props.define) {
    define(props.define);
  }
  if (props === null || props === undefined ? undefined : props.arrange) {
    arrange(props.arrange);
  }
}
export function define(props) {
  Object.assign(element, parseToElement(props));
}
export function arrange(instruction) {
  setInstruction(element, instruction);
}
export function parseToElement(list) {
  /** element-name-elType-.classArr or classObj */
  const ls = list.slice();
  const els = {};
  ls.map((rawList) => {
    let tokens = rawList.split("-.");
    /** element-name-elType*/
    let rawlists = tokens[0];
    let classlist = [""];
    const { propsName, className, elType } = parseToCarmelCase(rawlists);
    let el = cel(elType);
    addClass(el, [className]);
    els[propsName] = buildInElementProps({
      target: el,
      propsName: propsName,
      elType: elType,
    });
    if (tokens.length === 2) {
      classlist = tokens[1].split(",");
      classlist.map((i) => {
        autoClass({ el: els[propsName], class: i });
      });
    }
  });
  return els;
}
export function setInstruction(parsedEl, instruction) {
  instruction.map((i) => {
    let spaceRemove = i.replace(/\s+/g, "");
    let tokens = spaceRemove.split("=");
    let parentToken =
      tokens[0].split("-").length === 1 ? tokens[0] : tokens[0].split("-");
    let flag = "";
    let parent = parentToken;
    if (typeof parentToken !== "string") {
      flag = parentToken[0];
      parent = parentToken[1];
    }
    if (flag === "u") {
      cleanArr.push(parent);
    }
    if (flag === "ui") {
      innerCleanArr.push(parent);
      cleanArr.push(parent);
    }
    let child = tokens[1];
    let childToken = child.split(",");
    childToken.map((i) => {
      parsedEl[parent].children([parsedEl[i]]);
    });
    if (debug) {
      console.log(i);
    }
  });
}
export function parseToCarmelCase(str) {
  let tokens = str.split("-");
  let elementType = tokens.splice(tokens.length - 1, 1);
  let carmelName = "";
  for (let i in tokens) {
    if (Number(i) === 0) {
      carmelName += tokens[i].charAt(0).toLowerCase() + tokens[i].slice(1);
    } else {
      carmelName += tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
    }
  }
  return {
    propsName: carmelName,
    className: tokens.join("-"),
    elType: elementType[0],
  };
}
export function undef(props, option) {
  return props === undefined ? (option ? option : null) : props;
}
export function buildInElementProps(props) {
  const returnObj = {};

  returnObj.target = undef(props.target);
  returnObj.propsName = undef(props.propsName);
  returnObj.elType = undef(props.elType);
  returnObj.pick = function (props) {
    if (props) {
      assignObj(this, props);
    }
    return this;
  };
  returnObj.text = function (text) {
    this.target.textContent = text;
    return this;
  };
  returnObj.inner = undef(props.inner, {});
  returnObj._inner = function () {
    this.inner = {};
    return this;
  };
  returnObj.modify = function (callback) {
    callback(this.target, this);
    return this;
  };
  returnObj.children = function (elList) {
    elList.map((i) => {
      this.target.appendChild(i.target);
      this.inner[i.propsName] = i;
    });
    return this;
  };
  returnObj._children = function () {
    this.target.innerHTML = "";
    return this;
  };
  returnObj.style = function (styleObj) {
    Object.assign(this.target.style, styleObj);
    return this;
  };
  returnObj._style = function () {
    this.attr("style", "");
    return this;
  };
  returnObj.rs = function () {
    let parent = `${this.propsName}<${this.elType}> =`;
    for (let i in this.inner) {
      let child = this.inner[i].propsName;
      let childType = this.inner[i].elType;
      parent += `, ${child}<${childType}>`;
    }
    return parent.replace("=,", "=");
  };
  returnObj.attr = function (attrName, value) {
    this.target.setAttribute(attrName, value);
    return this;
  };
  returnObj.class = function (classList) {
    this.target.classList.add(...classList);
    return this;
  };
  returnObj._class = function () {
    this.attr("class", "");
    return this;
  };
  returnObj.action = function (eventProps, callback) {
    this.target.addEventListener(eventProps, callback, true);
    return this;
  };
  returnObj._action = function (eventProps, callback) {
    this.target.removeEventListener(eventProps, callback, true);
    return this;
  };
  return returnObj;
}
export function autoClass(props) {
  let ca = classArr[props.class];
  let co = classObj[props.class];
  if (ca) {
    addClass(props.el.target, ca);
  }
  if (co) {
    assignObj(props.el.target.style, co);
  }
}
export function useOnly(props) {
  let tempStore = {};
  props.map((i) => {
    tempStore[i] = element[i];
  });
  element = tempStore;
}
export function innerClean(props) {
  props.map((i) => {
    element[i]._inner();
  });
}
export function regis(props) {
  element[props.name] = props.el;
}
export function clean() {
  innerClean(innerCleanArr);
  useOnly(cleanArr);
}
export function createElement(props) {
  let returnObj = buildInElementProps({});
  if (props.el !== undefined) {
    let { propsName, className, elType } = parseToCarmelCase(props.el);
    let ele = document.createElement(elType);
    ele.classList.add(className);
    returnObj.target = ele;
    returnObj.propsName = propsName;
    returnObj.elType = elType;
  }
  if (props.pick !== undefined) {
    returnObj.pick(props.pick);
  }
  if (props.text !== undefined) {
    returnObj.text(props.text);
  }
  if (props.class !== undefined) {
    returnObj.class(props.class);
  }
  if (props.children !== undefined) {
    returnObj.children(props.children);
  }
  if (props.build !== undefined) {
    returnObj.modify(props.build);
  }
  return returnObj;
}
export function debugOn() {
  debug = true;
}
export function pick(propsName) {
  return element[propsName];
}
export function setElement(props) {
  return function pick(name) {
    return props[name];
  };
}
export function getElementList() {
  return element;
}
export const Automa = {
  addClass,
  assignObj,
  elementID,
  cel,
  parseToElement,
  setInstruction,
  undef,
  buildInElementProps,
  autoClass,
  createElement,
  setElement,
};
