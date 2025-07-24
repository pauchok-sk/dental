import "../scss/style.scss";
import anchors from "./files/anchors.js";
import beforeAfter from "./files/beforeAfter.js";
import burger from "./files/burger.js";
import headerScroll from "./files/headerScroll.js";
import maskTel from "./files/maskTel.js";
import more from "./files/more.js";
import quiz from "./files/quiz.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";

spoller();
burger();
headerScroll();
sliders();
more();
tabs();
quiz();
beforeAfter();
maskTel();
anchors();

Fancybox.bind("[data-fancybox]", {});
