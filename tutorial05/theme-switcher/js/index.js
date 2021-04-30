const defaultTheme = () => {
   document.querySelector("body").className = "container";
};

const oceanTheme = () => {
   document.querySelector("body").className = "ocean";
};

const desertTheme = () => {
   document.querySelector("body").className = "desert";
};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;

