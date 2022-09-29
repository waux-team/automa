class Automa {
    constructor() {
        this.element = {};
        this.debug = false;
    }
    root(props) {
        const root = document.getElementById(props.name === undefined ? "root" : props.name);
        root === null || root === void 0 ? void 0 : root.appendChild(props.child.target);
        return;
    }
    regis(props) {
        this.element[props.elName] = props.component;
    }
    arrange(instruction) {
        instruction.map((i) => {
            let spaceRemove = i.replace(/\s+/g, "");
            let tokens = spaceRemove.split("=");
            let parent = tokens[0];
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
    parseToElement(strElList) {
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
    parseToCarmelCase(str) {
        let tokens = str.split("-");
        let elementType = tokens.splice(tokens.length - 1, 1);
        let carmelName = "";
        for (let i in tokens) {
            if (Number(i) === 0) {
                carmelName += tokens[i].charAt(0).toLowerCase() + tokens[i].slice(1);
            }
            else {
                carmelName += tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
            }
        }
        return {
            propsName: carmelName,
            className: tokens.join("-"),
            elType: elementType[0],
        };
    }
    isUndefined(props, trueValue) {
        return props === undefined ? trueValue : props;
    }
    buildInElementProps(props) {
        return {
            target: this.isUndefined(props.target, null),
            propsName: this.isUndefined(props.propsName, null),
            elType: this.isUndefined(props.elType, null),
            inner: this.isUndefined(props.inner, {}),
            pick: this.isUndefined(props.pick, null),
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
    component(props) {
        let returnObj = this.buildInElementProps({});
        if (props.el !== undefined) {
            let { propsName, className, elType } = this.parseToCarmelCase(props.el);
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
    debugOn() {
        this.debug = true;
    }
}
