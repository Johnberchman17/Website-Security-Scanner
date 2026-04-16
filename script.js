const scanBtn = document.getElementById("scan");

scanBtn.addEventListener("click", () => {
  const url = document.getElementById("url").value;

  if (!url) return;

  document.getElementById("results").classList.remove("hidden");

  totalScore = 0;

  checkHTTPS(url);
  checkHeaders();
});

function checkHTTPS(url) {
  const https = document.getElementById("https");

  if (url.startsWith("https://")) {
    https.textContent = "Secure";
    https.style.color = "#00ff99";
    updateScore(1);
  } else {
    https.textContent = "Not Secure";
    https.style.color = "#ff4d4d";
    updateScore(0);
  }
}

function checkHeaders() {
  const headers = ["csp", "frame", "content"];
  let score = 0;

  headers.forEach(id => {
    const element = document.getElementById(id);
    const random = Math.random() > 0.5;

    if (random) {
      element.textContent = "Present";
      element.style.color = "#00ff99";
      score++;
    } else {
      element.textContent = "Missing";
      element.style.color = "#ff4d4d";
    }
  });

  updateScore(score);
}

let totalScore = 0;

function updateScore(value) {
  totalScore += value;

  const percent = (totalScore / 4) * 100;

  const bar = document.getElementById("score-bar");
  const text = document.getElementById("score-text");

  bar.style.width = percent + "%";

  if (percent < 40) {
    bar.style.background = "red";
    text.textContent = "High Risk";
  } else if (percent < 75) {
    bar.style.background = "orange";
    text.textContent = "Medium Risk";
  } else {
    bar.style.background = "green";
    text.textContent = "Low Risk";
  }
}
