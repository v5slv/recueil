// LOCAL STORAGE (pour la map)

// Au chargement de la page
if (localStorage.getItem("chapter1Visited")) {
  document.getElementById("chap1").classList.add("visited");
  document.getElementById("chap2").classList.remove("locked");
  document.querySelector(".map-icone_chap1").classList.add("gone");
  document.querySelector(".map-icone_chap2").classList.remove("gray");
}

if (localStorage.getItem("chapter2Visited")) {
  document.getElementById("chap2").classList.add("visited");
  document.querySelector(".map-icone_chap2").classList.add("gone");
}

// Au clic chap1
document.getElementById("chap1").addEventListener("click", () => {
  localStorage.setItem("chapter1Visited", "true");
});

// Clic chap2 : bloqué si locked, sinon on mémorise
document.getElementById("chap2").addEventListener("click", (e) => {
  if (e.currentTarget.classList.contains("locked")) {
    e.preventDefault();
  } else {
    localStorage.setItem("chapter2Visited", "true");
  }
});

// TITRE MAP + CLASSE ACTIF selon la langue
function updateTitreMap(langue) {
  const titre = document.querySelector(".map-title");
  if (!titre) return;
  titre.src =
    langue === "kr" ? "img/map_titre_kr.png" : "img/map_titre_fr_en.png";
}

function updateActif(langue) {
  document.querySelectorAll(".langues button").forEach((btn) => {
    btn.classList.remove("actif");
    const onclick = btn.getAttribute("onclick");
    const match = onclick.match(/changerLangue\('(\w+)'/);
    if (match && match[1] === langue) btn.classList.add("actif");
    if (langue === "kr" && btn.textContent.trim() === "한국어")
      btn.classList.add("actif");
  });
}

// Au chargement
const langueInitiale = localStorage.getItem("langue") || "fr";
updateTitreMap(langueInitiale);
updateActif(langueInitiale);

// Au clic sur les boutons de langue
document.querySelectorAll(".langues button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const onclick = btn.getAttribute("onclick");
    const match = onclick.match(/changerLangue\('(\w+)'/);
    if (match) {
      updateTitreMap(match[1]);
      updateActif(match[1]);
    }
  });
});
