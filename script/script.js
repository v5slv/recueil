// ── TRADUCTIONS ──
let traductions = {};

const fichier = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "")
  .replace("#", "");
const PAGE = fichier === "" ? "index" : fichier;

fetch("traductions.json")
  .then((res) => res.json())
  .then((data) => {
    traductions = data[PAGE];

    // Appliquer la langue sauvegardée automatiquement
    const langueSauvegardee = localStorage.getItem("langue") || "fr";
    const t = traductions[langueSauvegardee];
    if (t) {
      if (t.title) document.title = t.title;
      document.querySelectorAll("[data-traduction]").forEach((elem) => {
        const cle = elem.getAttribute("data-traduction");
        if (t[cle]) elem.textContent = t[cle];
      });

      // Mettre à jour la classe actif sur la bonne langue
      document.querySelectorAll(".langues button").forEach((btn) => {
        btn.classList.remove("actif");
        if (
          btn.textContent.trim() === langueSauvegardee.toUpperCase() ||
          (langueSauvegardee === "kr" && btn.textContent.trim() === "한국어")
        ) {
          btn.classList.add("actif");
        }
      });

      // ← AJOUT 1 : appliquer la police coréenne au chargement si langue sauvegardée = kr
      document.querySelectorAll("h1, h2").forEach((el) => {
  el.classList.toggle("coreen", langueSauvegardee === "kr");
});
  } 
  });
function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  if (t.title) document.title = t.title;

  document.querySelectorAll("[data-traduction]").forEach((elem) => {
    const cle = elem.getAttribute("data-traduction");
    if (t[cle]) elem.textContent = t[cle];
  });

  // ← AJOUT 2 : changer la police du h1 quand on clique sur une langue
  document.querySelectorAll("h1, h2").forEach((el) => {
  el.classList.toggle("coreen", langue === "kr");
});

  document.querySelectorAll(".phrases p").forEach((p) => {
    if (langue === "kr") p.classList.add("coreen");
    else p.classList.remove("coreen");
  });

  document
    .querySelectorAll(".langues .top-link")
    .forEach((a) => a.classList.remove("actif"));
  el.classList.add("actif");

  // Sauvegarder la langue choisie
  localStorage.setItem("langue", langue);
}

// ── SON ──
// ── SON ──
let sonActif = false;
const btnSon = document.getElementById("btnSon");

const bird = new Audio("sounds/bird1.mp3");
bird.loop = true;
bird.volume = 0.6;

if (btnSon) {
  btnSon.addEventListener("click", () => {
    sonActif = !sonActif;
    btnSon.classList.toggle("muted");

    if (!sonActif) {
      bird.play();
    } else {
      bird.pause();
      bird.currentTime = 0;
    }
  });
}