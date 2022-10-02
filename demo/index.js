const DEFINE = ["message-container-div", "message-text-p", "container-div"];

const INSTRUCTION = [
  "messageContainer = messageText",
  "ui-container = messageContainer",
];

const CLASS_OBJ = {
  containerBlack: {
    backgroundColor: "#000000",
    width: "200px",
    textAlign: "center",
    padding: "5px 8px",
    borderRadius: "7px",
    color: "#ffff",
  },
};

const CLASS_ARR = {
  containerRed: ["btn"],
};
const am = new Automa.Automa({
  define: DEFINE,
  instruction: INSTRUCTION,
  classObj: CLASS_OBJ,
  classArr: CLASS_ARR,
});

function widthAnimation(target, from, to, speed) {
  let counter = from;
  let frame = setInterval(() => {
    if (from < to) {
      counter += 2;
    } else {
      counter -= 2;
    }
    target.style.width = counter + "px";
    if (counter === to) {
      clearInterval(frame);
    }
  }, speed);
}
const extendEvent = (el, mod) => {
  mod.action("mouseenter", (ev) => {
    widthAnimation(el, 200, 300, 1);
  });
  mod.action("mouseleave", (ev) => {
    widthAnimation(el, 300, 200, 1);
  });
};

am.pick("messageContainer")
  .modify(extendEvent)
  // .class_a("containerRed")
  .class_a("containerBlack");

am.pick("messageText").text("Hello World!").style({
  margin: "0",
  width: "100%",
});

let messageContainer2 = am.clone("messageContainer").modify(extendEvent);

am.pick("container").children([messageContainer2]);

am.clean();

console.log(am.element);

am.root({
  child: am.pick("container"),
});
