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
      fr: {
        subtitle:
          "L'expérience interactive est uniquement disponible sur ordinateur. Vous pouvez néanmoins visionner le documentaire en entier depuis votre téléphone.",
        link: "Regarder le documentaire",
      },
      en: {
        subtitle:
          "The interactive experience is only available on desktop. You can still watch the full documentary from your phone.",
        link: "Watch the documentary",
      },
      kr: {
        subtitle:
          "인터랙티브 체험은 컴퓨터에서만 이용 가능합니다. 휴대폰에서도 다큐멘터리 전편을 감상하실 수 있습니다.",
        link: "다큐멘터리 보기",
      },
    };

    var msg = messages[langue] || messages.fr;

    var style = document.createElement("style");
    style.textContent = [
      "#mp-overlay{position:fixed;inset:0;background:#f5f2d6;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;box-sizing:border-box;gap:2rem;}",
      "#mp-title{font-family:'Ovo',serif;font-weight:400;font-size:3.5rem;color:#354523;margin:0;}",
      "#mp-subtitle{font-family:'Instrument Sans',sans-serif;font-size:1rem;color:#354523;line-height:1.6;max-width:320px;margin:0;}",
      "#mp-link{font-family:'Instrument Sans',sans-serif;font-size:1rem;color:#354523;text-decoration:underline;text-underline-offset:3px;}",
    ].join("");
    document.head.appendChild(style);

    var overlay = document.createElement("div");
    overlay.id = "mp-overlay";
    overlay.innerHTML = [
      '<p id="mp-title">Recueil</p>',
      '<p id="mp-subtitle">' + msg.subtitle + "</p>",
      '<a id="mp-link" href="player-full.html">' + msg.link + "</a>",
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
