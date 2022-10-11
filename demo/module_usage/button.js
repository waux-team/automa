import { parseToElement,setInstruction,setElement } from "../../src/automa.js";

const parsedEl = parseToElement(["special-btn-button", "special-con-div"]);

setInstruction(parsedEl, ["specialCon = specialBtn"]);

const pick = setElement(parsedEl);

pick("specialBtn").text("hello World");

export const specialBtn = pick("specialBtn");
