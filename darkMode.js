const modeBtn = document.querySelector("#mode-switcher");
let count = 1;

modeBtn.addEventListener("click", () => {
  if (count % 2) {
    document.querySelector("body").classList.add("dark-mode");
    modeBtn.innerHTML = "☀️";
  } else {
    document.querySelector("body").classList.remove("dark-mode");
    modeBtn.innerHTML = "🌙";
  }
  count++;
  console.log(count);
});
