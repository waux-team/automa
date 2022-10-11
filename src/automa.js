let element = {};
let debug = false;
let classArr = {};
let classObj = {};
let cleanArr = [];
let innerCleanArr = [];

export function root(props) {
  const root = document.getElementById(
    props.name === undefined ? "root" : props.name
  );
  root === null || root === void 0
    ? void 0
    : root.appendChild(props.child.target);

  props.clean === void 0 || props.clean === null || props.clean === true
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
  if (props === null || props === void 0 ? void 0 : props.class1) {
    Object.assign(classArr, props.class1);
  }
  if (props === null || props === void 0 ? void 0 : props.class2) {
    Object.assign(classObj, props.class2);
  }
  if (props === null || props === void 0 ? void 0 : props.define) {
    define(props.define);
  }
  if (props === null || props === void 0 ? void 0 : props.arrange) {
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
  ls.map((rawList) => {
    let tokens = rawList.split("-.");
    /** element-name-elType*/
    let rawlists = tokens[0];
    let classlist = [""];
    const { propsName, className, elType } = parseToCarmelCase(rawlists);
    let el = cel(elType);
    el.classList.add(className);
    element[propsName] = buildInElementProps({
      target: el,
      propsName: propsName,
      elType: elType,
    });
    if (tokens.length === 2) {
      classlist = tokens[1].split(",");
      classlist.map((i) => {
        autoClass({ el: element[propsName], class: i });
      });
    }
  });
  return element;
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
export function cel(type) {
  return document.createElement(type);
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
export function isUndefined(props, trueValue) {
  return props === undefined ? trueValue : props;
}
export function buildInElementProps(props) {
  return {
    target: isUndefined(props.target, null),
    propsName: isUndefined(props.propsName, null),
    elType: isUndefined(props.elType, null),
    inner: isUndefined(props.inner, {}),
    pick: isUndefined(props.pick, null),
    _inner: function () {
      this.inner = {};
      return this;
    },
    modify: function (callback) {
      callback(this.target, this);
      return this;
    },
    text: function (text) {
      this.target.textContent = text;
      return this;
    },
    children: function (elList) {
      elList.map((i) => {
        this.target.appendChild(i.target);
        this.inner[i.propsName] = i;
      });
      return this;
    },
    _children: function () {
      this.target.innerHTML = "";
      return this;
    },
    style: function (styleProps) {
      Object.assign(this.target.style, styleProps);
      return this;
    },
    _style: function () {
      this.attr("style", "");
      return this;
    },
    class: function (classList) {
      this.target.classList.add(...classList);
      return this;
    },
    _class: function () {
      this.attr("class", "");
      return this;
    },
    action: function (eventProps, callback) {
      this.target.addEventListener(eventProps, callback, true);
      return this;
    },
    _action: function (eventProps, callback) {
      this.target.removeEventListener(eventProps, callback, true);
      return this;
    },
    relationship: function () {
      let rs = propsName + "<" + elType + ">=";
      for (let i in inner) {
        rs += "," + this.inner[i].propsName + "<" + this.inner[i].elType + ">";
      }
      return rs.replace("=,", "=");
    },
    attr: function (attrName, value) {
      this.target.setAttribute(attrName, value);
      return this;
    },
  };
}
export function autoClass(props) {
  let ca = classArr[props.class];
  let co = classObj[props.class];
  if (ca) {
    props.el.target.classList.add(...ca);
  }
  if (co) {
    Object.assign(props.el.target.style, co);
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
  element[props.elName] = props.el;
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
    returnObj = props.pick;
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
  config,
  root,
  define,
  arrange,
  setInstruction,
  cel,
  parseToElement,
  parseToCarmelCase,
  isUndefined,
  buildInElementProps,
  autoClass,
  useOnly,
  innerClean,
  regis,
  class1,
  class2,
  clean,
  createElement,
  debugOn,
  pick,
  setElement,
  getElementList,
};
