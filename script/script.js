// ── TRADUCTIONS ──
let traductions = {};

const fichier = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "")
  .replace("#", "");
const PAGE = fichier === "" ? "index" : fichier;

// Extension du fichier image par langue, pour chaque base d'image traduite.
// fr garde l'extension d'origine présente dans le HTML (généralement .png),
// en/kr sont fournies en .jpg dans le projet.
const EXTENSIONS_IMG = {
  chap1_graph1: { fr: "png", en: "jpg", kr: "jpg" },
  chap1_graph2: { fr: "png", en: "jpg", kr: "jpg" },
  chap1_graph3: { fr: "jpg", en: "jpg", kr: "jpg" },
  chap1_graph5: { fr: "jpg", en: "jpg", kr: "jpg" },
  chap2_graph1: { fr: "jpg", en: "jpg", kr: "jpg" },
};

function appliquerImagesTraduites(langue) {
  document.querySelectorAll("[data-img-base]").forEach((img) => {
    const base = img.getAttribute("data-img-base");
    const extensions = EXTENSIONS_IMG[base];
    if (!extensions) return;
    const ext = extensions[langue] || extensions.fr;
    img.src = `img/${base}_${langue}.${ext}`;
  });
}

fetch("traductions.json")
  .then((res) => res.json())
  .then((data) => {
    traductions = data[PAGE];

    const langueSauvegardee = localStorage.getItem("langue") || "fr";
    const t = traductions[langueSauvegardee];
    if (t) {
      if (t.title) document.title = t.title;
      document.querySelectorAll("[data-traduction]").forEach((elem) => {
        const cle = elem.getAttribute("data-traduction");
        if (t[cle]) elem.textContent = t[cle];
      });

      document.querySelectorAll(".langues button").forEach((btn) => {
        btn.classList.remove("actif");
        if (
          btn.textContent.trim() === langueSauvegardee.toUpperCase() ||
          (langueSauvegardee === "kr" && btn.textContent.trim() === "한국어")
        ) {
          btn.classList.add("actif");
        }
      });

      document.querySelectorAll("h1, h2").forEach((el) => {
        el.classList.toggle("coreen", langueSauvegardee === "kr");
      });
    }

    appliquerImagesTraduites(langueSauvegardee);
  });

function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  if (t.title) document.title = t.title;

  document.querySelectorAll("[data-traduction]").forEach((elem) => {
    const cle = elem.getAttribute("data-traduction");
    if (t[cle]) elem.textContent = t[cle];
  });

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

  appliquerImagesTraduites(langue);

  localStorage.setItem("langue", langue);
}

// ── SON ──
const btnSon = document.getElementById("btnSon");
const bird = new Audio("sounds/bird1.wav");
bird.loop = true;
bird.volume = 1;

// true = muet, false = son actif
let sonActif = localStorage.getItem("sonActif") === "true";

if (btnSon && sonActif) {
  btnSon.classList.add("muted");
}

if (btnSon) {
  btnSon.addEventListener("click", () => {
    sonActif = !sonActif;
    btnSon.classList.toggle("muted");
    localStorage.setItem("sonActif", sonActif ? "true" : "false");

    if (!sonActif) {
      bird.play();
    } else {
      bird.pause();
      bird.currentTime = 0;
    }
  });
}
