
const elList = [
    "main-container-div",
    "message-div",
    "message2-i",
    "main-container2-div",
    "messagec-div",
    "messagec2-i",
    "main-scene-div"
];

const instruction = [
    "mainContainer = message , message2",
    "mainContainer2 = messagec , messagec2",
    "mainScene = mainContainer , mainContainer2"
]

let am = new Automa();
am.parseToElement(elList); 
am.arrange(instruction)

am.pick("messagec").text("hello world")

am.root({
  child: am.pick("mainScene"),
});
