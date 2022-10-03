const am = new Automa();
am.defineClassObject({
  containerBlack: {
    backgroundColor: "#000000",
    width: "200px",
    textAlign: "center",
    padding: "5px 8px",
    borderRadius: "7px",
    color: "#ffff",
  },
  colorRed: {
    color: "red",
  },
});
am.parseToElement([
  "message-container-div-.containerBlack,colorRed",
  "message-text-p",
  "container-div",
]);
am.arrange([
  "messageContainer = messageText",
  "ui-container = messageContainer",
]);

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

am.pick("messageContainer").modify(extendEvent);

am.pick("messageText").text("Hello World!");

am.clean();

am.root({
  child: am.pick("container"),
});
