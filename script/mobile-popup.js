/**
 * mobile-popup.js
 * Affiche une pop-up sur mobile conseillant d'ouvrir le site sur desktop.
 * Usage : <script src="mobile-popup.js"></script> dans le <head> ou avant </body>
 */
(function () {
  var STORAGE_KEY = "mobile_popup_dismissed";
  var DISMISS_DAYS = 7; // ne plus afficher pendant N jours après fermeture

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
  }

  function isDismissed() {
    try {
      var val = localStorage.getItem(STORAGE_KEY);
      if (!val) return false;
      return Date.now() < parseInt(val, 10);
    } catch (e) {
      return false;
    }
  }

  function dismiss(permanent) {
    try {
      var expiry = permanent
        ? Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000
        : 0;
      localStorage.setItem(STORAGE_KEY, expiry.toString());
    } catch (e) {}
  }

  function copyLink() {
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        var btn = document.getElementById("mp-copy-btn");
        if (btn) {
          btn.textContent = "✓ Lien copié !";
          setTimeout(function () {
            btn.textContent = "Copier le lien";
          }, 2000);
        }
      });
    } else {
      var ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  function createPopup() {
    var style = document.createElement("style");
    style.textContent = [
      "#mp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:flex-end;justify-content:center;padding:16px;box-sizing:border-box;animation:mp-fade .25s ease}",
      "@keyframes mp-fade{from{opacity:0}to{opacity:1}}",
      "#mp-card{background:#fff;border-radius:20px;padding:22px;width:100%;max-width:400px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;animation:mp-slide .3s cubic-bezier(.34,1.56,.64,1)}",
      "@keyframes mp-slide{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}",
      "@media(prefers-color-scheme:dark){#mp-card{background:#1c1c1e;color:#f2f2f7}#mp-subtitle{color:#aeaeb2}#mp-close-text{color:#636366}}",
      "#mp-icon{width:42px;height:42px;border-radius:12px;background:#eef2ff;display:flex;align-items:center;justify-content:center;flex-shrink:0}",
      "#mp-title{font-size:15px;font-weight:600;margin:0;color:inherit}",
      "#mp-subtitle{font-size:13px;color:#6b7280;margin:10px 0 16px;line-height:1.55}",
      "#mp-copy-btn{width:100%;padding:12px;background:#4f46e5;color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;margin-bottom:8px;transition:opacity .15s}",
      "#mp-copy-btn:active{opacity:.8}",
      "#mp-close-text{display:block;width:100%;text-align:center;background:none;border:none;color:#9ca3af;font-size:13px;cursor:pointer;padding:6px}"
    ].join("");
    document.head.appendChild(style);

    var overlay = document.createElement("div");
    overlay.id = "mp-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mp-title");

    overlay.innerHTML = [
      '<div id="mp-card">',
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">',
          '<div id="mp-icon">',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>',
          '</div>',
          '<p id="mp-title">Meilleure expérience sur ordinateur</p>',
        '</div>',
        '<p id="mp-subtitle">Ce site est conçu pour être utilisé sur un écran plus grand. Copiez le lien et ouvrez-le sur votre ordinateur pour profiter de toutes les fonctionnalités.</p>',
        '<button id="mp-copy-btn">Copier le lien</button>',
        '<button id="mp-close-text">Continuer sur mobile</button>',
      '</div>'
    ].join("");

    document.body.appendChild(overlay);

    document.getElementById("mp-copy-btn").addEventListener("click", copyLink);

    document.getElementById("mp-close-text").addEventListener("click", function () {
      dismiss(true);
      overlay.remove();
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        dismiss(false);
        overlay.remove();
      }
    });
  }

  function init() {
    if (!isMobile()) return;
    if (isDismissed()) return;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createPopup);
    } else {
      createPopup();
    }
  }

  init();
})();