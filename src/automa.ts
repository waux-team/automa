export class Automa {
  public element: Object = {};
  public debug: boolean = false;
  public classArr: object = {};
  public classObj: object = {};
  public cleanArr: string[] = [];
  public innerCleanArr: string[] = [];
  constructor(props) {
    if (props?.classArr) {
      this.classArr = props.classArr;
    }
    if (props?.classObj) {
      this.classObj = props.classObj;
    }
    if (props?.define) {
      this.define(props.define);
    }
    if (props?.arrange) {
      this.arrange(props.arrange);
    }
  }
  root(props: { name: string; child }): void {
    const root: HTMLElement | null = document.getElementById(
      props.name === undefined ? "root" : props.name
    );
    root?.appendChild(props.child.target);
    return;
  }
  define(props){
    this.parseToElement(props);
  }
  useOnly(props: string[]) {
    let tempStore = {};
    props.map((i) => {
      tempStore[i] = this.element[i];
    });
    this.element = tempStore;
  }
  innerClean(props: string[]) {
    props.map((i) => {
      this.element[i]._inner();
    });
  }
  clone(props) {
    let cloneEl = this.buildInElementProps({
      target: this.element[props].target.cloneNode(true),
      propsName: this.element[props].propsName,
      elType: this.element[props].elType,
    });
    cloneEl._children();
    for (let i in this.element[props].inner) {
      let el = this.element[props].inner[i].target.cloneNode(true);
      cloneEl.target.appendChild(el);
      cloneEl.inner[i] = this.buildInElementProps({
        target: el,
        propsName: this.element[props].inner[i].propsName,
        elType: this.element[props].inner[i].elType,
      });
    }
    return cloneEl;
  }
  regis(props) {
    this.element[props.elName] = props.component;
  }
  defineClassArray(props) {
    this.classArr = props;
  }
  defineClassObject(props) {
    this.classObj = props;
  }
  arrange(instruction: string[]) {
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
        this.cleanArr.push(parent as string);
      }
      if (flag === "ui") {
        this.innerCleanArr.push(parent as string);
        this.cleanArr.push(parent as string);
      }

      let child = tokens[1];
      let childToken = child.split(",");

      childToken.map((i) => {
        this.pick(parent).children([this.pick(i)]);
      });

      if (this.debug) {
        console.log(spaceRemove);
      }
    });
  }
  clean() {
    this.innerClean(this.innerCleanArr);
    this.useOnly(this.cleanArr);
  }
  parseToElement(strElList: string[]) {
    const newArr = strElList.slice();
    newArr.map((rawList) => {
      let tokens = rawList.split("-.");
      let rawlists = tokens[0];
      let classlist = [""];
      console.log(rawlists);
      const { propsName, className, elType } = this.parseToCarmelCase(rawlists);

      let el = document.createElement(elType);
      el.classList.add(className);

      let autoClass = (props) => {
        let ca = this.classArr[props];
        let co = this.classObj[props];

        let typecheck = ca ? "array" : co ? "object" : null;

        if (typecheck) {
          if (typecheck === "array") {
            el.classList.add(...ca);
          } else {
            Object.assign(el.style, co);
          }
        }
        return this;
      };

      this.element[propsName] = this.buildInElementProps({
        target: el,
        propsName: propsName,
        elType: elType,
      });

      Object.assign(this.element[propsName], { class_a: autoClass });

      if(tokens.length === 2){
        classlist = tokens[1].split(",");
        classlist.map(i=>{
          this.element[propsName].class_a(i)
        })
      }

    });
  }
  parseToCarmelCase(str: string) {
    let tokens: string[] = str.split("-");
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
  isUndefined<T>(props: T, trueValue): T {
    return props === undefined ? trueValue : props;
  }
  buildInElementProps(props) {
    return {
      target: this.isUndefined(props.target as HTMLElement, null),
      propsName: this.isUndefined(props.propsName as String, null),
      elType: this.isUndefined(props.elType, null),
      inner: this.isUndefined(props.inner, {}),
      pick: this.isUndefined(props.pick, null),
      _inner: function () {
        this.inner = {};
        return this;
      },
      modify: function (callback: (target: HTMLElement, util) => void) {
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
      class: function (classList: Array<String>) {
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
        this.target.remiveEventListener(eventProps, callback, true);
        return this;
      },
      relationship: function () {
        let rs = this.propsName + "<" + this.elType + ">=";
        for (let i in this.inner) {
          rs +=
            "," + this.inner[i].propsName + "<" + this.inner[i].elType + ">";
        }
        return rs.replace("=,", "=");
      },
      attr: function (attrName, value) {
        this.target.setAttribute(attrName, value);
        return this;
      },
    };
  }
  pick(propsName) {
    return this.element[propsName];
  }
  createElement(props) {
    let returnObj = this.buildInElementProps({});
    if (props.el !== undefined) {
      let { propsName, className, elType } = this.parseToCarmelCase(props.el);
      let ele: HTMLElement | null = document.createElement(elType);
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
  debugOn() {
    this.debug = true;
  }
}
