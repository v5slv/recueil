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
