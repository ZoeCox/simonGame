const modeBtn = document.querySelector("#mode-switcher");
let count = 1;

let darkMode = false;
// localStorage.setItem("darkModePref", JSON.stringify(darkMode));

const storedModePref = localStorage.getItem("darkModePref");

console.log(storedModePref, typeof storedModePref);

const modePrefExecuter = () => {
  storedModePref === "false"
    ? document.querySelector("body").classList.add("dark-mode")
    : document.querySelector("body").classList.remove("dark-mode");
};
//fix this so dark mode preference persists

const darkModeFunc = () => {
  if (count % 2) {
    document.querySelector("body").classList.add("dark-mode");
    modeBtn.innerHTML = "☀️";
    darkMode = true;
    localStorage.setItem("darkModePref", JSON.stringify(darkMode));
  } else {
    document.querySelector("body").classList.remove("dark-mode");
    modeBtn.innerHTML = "🌙";
    darkMode = false;
    localStorage.setItem("darkModePref", JSON.stringify(darkMode));
  }
  count++;
  console.log(count);
};

modeBtn.addEventListener("click", darkModeFunc);
