const stepBar = document.querySelector(".Steps-bar");
const progressBar = document.querySelector(".progress-bar");
stepBar.addEventListener("click", (e) => {
  if (
    e.target.nodeName === "SPAN" &&
    e.target.classList.contains("stepNumber")
  ) {
    let stepNumber = +e.target.innerText;
    progressBar.style.width = `${100 * (1 / 3) * stepNumber}%`;
    for (let i = stepNumber + 1; i <= 3; i++) {
      document.getElementById(`step${i}`).classList.remove("bg-success");
      document.getElementById(`step${i}`).classList.remove("text-light");
      document.getElementById(`step${i}`).classList.add("myBg-secondary");
    }
    for (let i = 1; i <= stepNumber; i++) {
      document.getElementById(`step${i}`).classList.add("bg-success");
      document.getElementById(`step${i}`).classList.add("text-light");

      document.getElementById(`step${i}`).classList.remove("myBg-secondary");
    }
  }
});
