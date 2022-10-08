export class Automa {
    constructor(props) {
        this.element = {};
        this.debug = false;
        this.classArr = {};
        this.classObj = {};
        this.cleanArr = [];
        this.innerCleanArr = [];
        if (props === null || props === void 0 ? void 0 : props.classArr) {
            this.classArr = props.classArr;
        }
        if (props === null || props === void 0 ? void 0 : props.classObj) {
            this.classObj = props.classObj;
        }
        if (props === null || props === void 0 ? void 0 : props.define) {
            this.define(props.define);
        }
        if (props === null || props === void 0 ? void 0 : props.arrange) {
            this.arrange(props.arrange);
        }
    }
    root(props) {
        const root = document.getElementById(props.name === undefined ? "root" : props.name);
        root === null || root === void 0 ? void 0 : root.appendChild(props.child.target);
        return;
    }
    define(props) {
        this.element = this.parseToElement(props);
    }
    useOnly(props) {
        let tempStore = {};
        props.map((i) => {
            tempStore[i] = this.element[i];
        });
        this.element = tempStore;
    }
    innerClean(props) {
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
    arrange(instruction) {
        instruction.map((i) => {
            let spaceRemove = i.replace(/\s+/g, "");
            let tokens = spaceRemove.split("=");
            let parentToken = tokens[0].split("-").length === 1 ? tokens[0] : tokens[0].split("-");
            let flag = "";
            let parent = parentToken;
            if (typeof parentToken !== "string") {
                flag = parentToken[0];
                parent = parentToken[1];
            }
            if (flag === "u") {
                this.cleanArr.push(parent);
            }
            if (flag === "ui") {
                this.innerCleanArr.push(parent);
                this.cleanArr.push(parent);
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
    cel(type) {
        return document.createElement(type);
    }
    autoClass(props) {
        let ca = this.classArr[props.class];
        let co = this.classObj[props.class];
        if (ca) {
            props.el.target.classList.add(...ca);
        }
        if (co) {
            Object.assign(props.el.target.style, co);
        }
    }
    parseToElement(strElList) {
        /** element-name-elType-.classArr or classObj */
        const newArr = strElList.slice();
        const element = {};
        newArr.map((rawList) => {
            let tokens = rawList.split("-.");
            /** element-name-elType*/
            let rawlists = tokens[0];
            let classlist = [""];
            const { propsName, className, elType } = this.parseToCarmelCase(rawlists);
            let el = this.cel(elType);
            el.classList.add(className);
            element[propsName] = this.buildInElementProps({
                target: el,
                propsName: propsName,
                elType: elType,
            });
            if (tokens.length === 2) {
                classlist = tokens[1].split(",");
                classlist.map((i) => {
                    this.autoClass({ el: element[propsName], class: i });
                });
            }
        });
        return element;
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
