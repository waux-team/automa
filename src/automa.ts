class Automa {
  public element: Object = {};
  public debug:boolean = false;
  root(props: { name: string; child }): void {
    const root: HTMLElement | null = document.getElementById(
      props.name === undefined ? "root" : props.name
    );
    root?.appendChild(props.child.target);
    return;
  }
  regis(props){
    this.element[props.elName] = props.component;
  }
  arrange(instruction: string[]) {
    instruction.map((i) => {
      let spaceRemove = i.replace(/\s+/g, "");
      let tokens = spaceRemove.split("=");
      let parent = tokens[0];
      let child = tokens[1];
      let childToken = child.split(",");
      childToken.map((i) => {
        this.pick(parent).children([this.pick(i)]);
      });
      if(this.debug){
        console.log(spaceRemove);
      }
    });
  }
  parseToElement(strElList: string[]) {
    const newArr = strElList.slice();
    newArr.map((rawList) => {
      const { propsName, className, elType } = this.parseToCarmelCase(rawList);

      let el = document.createElement(elType);
      el.classList.add(className);

      this.element[propsName] = this.buildInElementProps({
        target: el,
        propsName: propsName,
        elType: elType,
      });
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
      modify: function (callback: (target: HTMLElement, util) => void) {
        callback(this.target, this);
      },
      text: function (text) {
        this.target.textContent = text;
      },
      children: function (elList) {
        elList.map((i) => {
          this.target.appendChild(i.target);
          this.inner[i.propsName] = i;
        });
      },
      _children: function () {
        this.target.innerHTML = "";
      },
      style: function (styleProps) {
        Object.assign(this.target.style, styleProps);
      },
      _style: function () {
        this.attr("style", "");
      },
      class: function (classList: Array<String>) {
        this.target.classList.add(...[classList]);
      },
      _class: function () {
        this.attr("class", "");
      },
      action: function (eventProps, callback) {
        this.target.addEventListener(eventProps, callback, true);
      },
      _action: function (eventProps, callback) {
        this.target.remiveEventListener(eventProps, callback, true);
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
      },
    };
  }
  pick(propsName) {
    return this.element[propsName];
  }
  component(props) {
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
      returnObj.class([props.class]);
    }
    if (props.children !== undefined) {
      returnObj.children(props.children);
    }
    if (props.build !== undefined) {
      returnObj.modify(props.build);
    }
    return returnObj;
  }
  debugOn(){
    this.debug = true;
  }
}
