const am = new Automa();
am.defineClassObject({
  containerBlack: {
    backgroundColor: "white",
    color: "back",
  },
  colorRed: {
    color: "red",
  },
});
am.defineClassArray({
  containerBlack: ["under"]
})
am.define([
  "message-container-div-.containerBlack,colorRed",
  "message-text-p",
  "container-div",
]);
am.arrange([
  "messageContainer = messageText",
  "ui-container = messageContainer",
]);

am.pick("messageText").text("Hello World!");

am.clean();

am.root({
  child: am.pick("container"),
});
