const modeBtn = document.querySelector("#mode-switcher");
let darkMode = false;

const storedModePref = localStorage.getItem("darkModePref");

console.log(storedModePref, typeof storedModePref);

const modePrefExecuter = () => {
  if (storedModePref === "false" || storedModePref === null) {
    modeBtn.innerHTML = "🌙";
    darkMode = false;
    document.querySelector("body").classList.remove("dark-mode");
  } else {
    modeBtn.innerHTML = "☀️";
    darkMode = true;
    document.querySelector("body").classList.add("dark-mode");
  }
};
modePrefExecuter();

const darkModeFunc = () => {
  if (darkMode === false) {
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
};

modeBtn.addEventListener("click", darkModeFunc);
