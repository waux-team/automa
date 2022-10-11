/** using global function */

class1({
  red: ["text-danger"],
});

class2({
  red: {
    color: "red",
  },
});

define(["message-container-div", "message-text-p-.red", "container-div"]);

arrange(["messageContainer = messageText", "ui-container = messageContainer"]);

pick("messageText").text("Hello World");

/**using all in one global function */

config({
  class2: {
    orange: {
      color: "orange",
    },
  },
  define: ["message-text2-p-.orange"],
  arrange: ["u-messageContainer = messageText2"],
});

pick("messageText2").text("Hello World2");

/** using local function */

const parsedEl = parseToElement(["sp-btn-button-.orange", "sp-con-div"]);
setInstruction(parsedEl, ["spCon = spBtn"]);

const pickBtn = setElement(parsedEl);

pickBtn("spBtn").text("PressMe");

/**registor local to global */

regis({
 elName: "spCon",
 el: pickBtn("spCon") 
})

pick("container").children([pick("spCon")]);

/** create one coponent */
pick("container").children([createElement({
  el: "simple-div",
  text: "hello"
})]);

root({
  child: pick("container"),
  clean: true,
});

console.log(getElementList());
