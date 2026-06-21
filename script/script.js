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

// ── FIL D'ARIANE DYNAMIQUE ──
// Sur les pages "annexes" (à propos, mentions légales...), le fil d'Ariane
// est normalement statique ("Accueil > À propos"). Si l'utilisateur arrive
// depuis une page intermédiaire connue (la ruralité coréenne, la carte...),
// on insère cette page dans le fil pour qu'un retour en arrière logique
// soit possible, au lieu de toujours retomber sur "Accueil".
(function () {
  const filNav = document.querySelector("nav.fil");
  if (!filNav) return;

  const itemActif = filNav.querySelector(".actif");
  if (!itemActif) return;

  // Pages intermédiaires reconnues : nom de fichier → libellé affiché
  const pagesConnues = {
    "text-residents.html": "La ruralité coréenne",
    "player-residents.html": "La ruralité coréenne",
    "text-silsangsa.html": "Silsangsa et l'Indra's net",
    "player-silsangsa.html": "Silsangsa et l'Indra's net",
    "map.html": "Carte",
  };

  if (!document.referrer) return;

  let pageOrigine = "";
  try {
    pageOrigine = new URL(document.referrer).pathname.split("/").pop();
  } catch (e) {
    return;
  }

  const libelle = pagesConnues[pageOrigine];
  if (!libelle) return; // origine inconnue (ex: venu directement d'Accueil) → fil statique inchangé

  // Éviter le doublon si jamais le script tourne deux fois
  if (filNav.querySelector(`a[href="${pageOrigine}"]`)) return;

  const lien = document.createElement("a");
  lien.href = pageOrigine;
  lien.className = "top-link";
  lien.textContent = libelle;

  const separateur = document.createElement("span");
  separateur.textContent = ">";

  filNav.insertBefore(lien, itemActif);
  filNav.insertBefore(separateur, itemActif);
})();

// ── SON ──
let sonActif = false;
const btnSon = document.getElementById("btnSon");

const bird = new Audio("sounds/bird1.wav");
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