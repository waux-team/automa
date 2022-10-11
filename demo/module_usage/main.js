import { debugOn, config, pick, root, Automa } from "../../src/automa.js";
import { specialBtn } from "./button.js";

debugOn();
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
    "ui-container = messageContainer",
  ],
});

Automa.pick("container").children([specialBtn]);

root({
  child: pick("container"),
});
