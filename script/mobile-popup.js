(function () {
  function isMobile() {
    return (
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent,
      ) || window.innerWidth < 768
    );
  }

  function createPopup() {
    var langue = localStorage.getItem("langue") || "fr";

    var messages = {
      fr: "Ce site est conçu pour être consulté sur ordinateur.",
      en: "This site is designed to be viewed on a desktop computer.",
      kr: "이 사이트는 데스크톱에서 보도록 설계되었습니다.",
    };

    var style = document.createElement("style");
    style.textContent = [
      "#mp-overlay{position:fixed;inset:0;background:#f5f2d6;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;box-sizing:border-box;}",
      "#mp-title{font-family:'Ovo',serif;font-weight:400;font-size:3.5rem;color:#354523;margin:0 0 2rem;}",
      "#mp-subtitle{font-family:'Instrument Sans',sans-serif;font-size:1rem;color:#354523;line-height:1.6;max-width:280px;}",
    ].join("");
    document.head.appendChild(style);

    var overlay = document.createElement("div");
    overlay.id = "mp-overlay";
    overlay.innerHTML = [
      '<p id="mp-title">Recueil</p>',
      '<p id="mp-subtitle">' + (messages[langue] || messages.fr) + "</p>",
    ].join("");

    document.body.appendChild(overlay);
  }

  function init() {
    if (!isMobile()) return;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createPopup);
    } else {
      createPopup();
    }
  }

  init();
})();
