import {config, createElement, pick, root} from "../../src/automa.js";

// debugOn();
config({
  class2: {
    red: {
      color: "red",
    },
  },
  define: [
    "message-container-div-.red",
    "message-text-p",
    "sp-btn-button",
    "container-div",
  ],
  arrange: [
    "messageContainer = messageText",
  ],
});

const con = createElement({
  pick: pick("container"),
})


con.children([pick("messageContainer")]);

pick("messageText").text("Holai").class(["text-bold"])._class();

root({
  child: con,
});
