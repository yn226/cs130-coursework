const makeBigger = () => {
   document.querySelector(".content").style.fontSize = "2em";
};

const makeSmaller = () => {
   document.querySelector(".content").style.fontSize = "1em";
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;

