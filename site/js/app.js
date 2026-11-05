/* Web de Juan Luis López Aranguren — lógica de la página, sin dependencias.
   Los listados se leen de data/*.js (window.MEDIOS, ARTICULOS, PUBLICACIONES, TRAYECTORIA,
   RECONOCIMIENTOS, LUGARES y CONFIG). Para cambiar contenidos, edite esos archivos, no este. */
(function () {
  "use strict";

  var MEDIOS = window.MEDIOS || [];
  var ARTICULOS = window.ARTICULOS || [];
  var PUBLICACIONES = window.PUBLICACIONES || [];
  var TRAYECTORIA = window.TRAYECTORIA || [];
  var RECONOCIMIENTOS = window.RECONOCIMIENTOS || [];
  var LUGARES = window.LUGARES || [];
  var CONFIG = window.CONFIG || {};
  var EMAIL_PH = "[EMAIL DE CONTACTO]";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
    return null;
  }

  var lang = "es";
  var MESES = { es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
                en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
  function fmtDate(iso, fallback) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    if (!m) return fallback || "2026";
    return parseInt(m[3], 10) + " " + MESES.es[parseInt(m[2], 10) - 1] + " " + m[1];
  }
  function year(iso) { return (iso || "").slice(0, 4); }

  /* ---------- aviso breve ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); if (!t) return;
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }
  function copyText(text, el, okMsg) {
    function fallback() {
      if (el) {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      toast(lang === "en" ? "Text selected: press Ctrl+C / ⌘C to copy" : "Texto seleccionado: pulse Ctrl+C / ⌘C para copiar");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, fallback);
    } else { fallback(); }
  }

  /* ---------- cifras ---------- */
  var APARICIONES = MEDIOS.filter(function (m) { return m.tipo !== "resena" && m.tipo !== "evento"; }).length;
  // Piezas en ABC: se cuentan desde ARTICULOS, con un mínimo de 20 (cifra del CV de noviembre de 2026;
  // en articulos.js hay 19, falta añadir una). Producción académica: también según el CV.
  var COLUMNAS_ABC = Math.max(20, ARTICULOS.filter(function (a) { return a.medio === "ABC"; }).length);
  var ART_REVISTAS = 14, CAPITULOS = 22;
  function renderFigures() {
    var el = $("#figures"); if (!el) return;
    var redondeo = APARICIONES >= 20 ? Math.floor(APARICIONES / 10) * 10 : APARICIONES;
    var figs = lang === "en" ? [
      [redondeo + "<sup>+</sup>", "appearances on television, radio and in the press"],
      [COLUMNAS_ABC, "pieces in ABC since 2025, two of them on the «Tercera» page"],
      ["2<sup>nd</sup>", "edition of the book, seven months after publication"],
      ["No. 1", "in Military Science (Amazon.es); No. 4 in International Relations and Globalisation"],
      [ART_REVISTAS + CAPITULOS, ART_REVISTAS + " journal articles and " + CAPITULOS + " book chapters"],
      ["9", "consecutive International Studies Association conventions"]
    ] : [
      [redondeo + "<sup>+</sup>", "apariciones en televisión, radio y prensa"],
      [COLUMNAS_ABC, "piezas en ABC desde 2025, dos de ellas Terceras"],
      ["2.ª", "edición del libro, a los siete meses de su publicación"],
      ["N.º 1", "en Ciencias Militares (Amazon.es); n.º 4 en Relaciones Internacionales y Globalización"],
      [ART_REVISTAS + CAPITULOS, "artículos en revistas (" + ART_REVISTAS + ") y capítulos de libro (" + CAPITULOS + ")"],
      ["9", "convenciones consecutivas de la International Studies Association"]
    ];
    el.innerHTML = figs.map(function (f) {
      return '<div class="fig"><b>' + f[0] + "</b><span>" + esc(f[1]) + "</span></div>";
    }).join("");
  }

  /* ---------- reseñas del libro ---------- */
  function renderReviews() {
    var el = $("#reviews"); if (!el) return;
    var rs = MEDIOS.filter(function (m) { return m.tipo === "resena"; })
      .sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
    var html = rs.map(function (r) {
      var src = '<span class="src">' + esc(r.medio) + " · " + esc(fmtDate(r.fecha, r.fechaTexto)) + "</span>";
      var t = "<span>" + esc(r.titulo) + "</span>";
      return r.url
        ? '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + t + src + "</a>"
        : '<span class="r">' + t + src + "</span>";
    }).join("");
    el.insertAdjacentHTML("beforeend", html);
  }

  /* ---------- vídeos destacados ---------- */
  function renderVideos() {
    var el = $("#videos"); if (!el) return;
    var byDate = function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); };
    var conYt = MEDIOS.filter(function (m) { return m.yt; });
    var sel = conYt.filter(function (m) { return m.destacado; }).sort(byDate).slice(0, 6);
    conYt.sort(byDate).forEach(function (m) { if (sel.length < 6 && sel.indexOf(m) < 0) sel.push(m); });
    el.innerHTML = sel.map(function (v) {
      var href = "https://www.youtube.com/watch?v=" + encodeURIComponent(v.yt) + (v.t ? "&t=" + v.t + "s" : "");
      return '<a class="vcard" href="' + esc(href) + '" target="_blank" rel="noopener">' +
        '<div class="vthumb"><span class="ph" aria-hidden="true">' + esc(v.medio) + "</span>" +
        '<img src="https://i.ytimg.com/vi/' + esc(v.yt) + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360" onerror="this.style.display=\'none\'">' +
        '<span class="play" aria-hidden="true"></span>' +
        (v.duracion ? '<span class="dur">' + esc(v.duracion) + "</span>" : "") + "</div>" +
        '<div class="meta"><span class="outlet">' + esc(v.medio) + '</span><span class="mono">' + esc(fmtDate(v.fecha, v.fechaTexto)) + "</span></div>" +
        "<h3>" + esc(v.titulo) + ' <span class="sr">(YouTube, se abre en una pestaña nueva)</span></h3></a>';
    }).join("");
  }

  /* ---------- registro de medios ---------- */
  var TIPOS = [
    { k: "all", l: "Todo" }, { k: "tv", l: "Televisión" }, { k: "radio", l: "Radio" },
    { k: "prensa", l: "Prensa" }, { k: "podcast", l: "Vídeo y pódcast" }, { k: "evento", l: "Actos" }
  ];
  var TAG = { tv: "TV", radio: "Radio", prensa: "Prensa", podcast: "Pódcast", video: "Vídeo", evento: "Acto" };
  var LOG = MEDIOS.filter(function (m) { return m.tipo !== "resena"; }).sort(function (a, b) {
    if (!a.fecha && b.fecha) return 1;
    if (a.fecha && !b.fecha) return -1;
    return (b.fecha || "").localeCompare(a.fecha || "");
  });
  var logState = { tipo: "all", q: "", all: false };
  function tipoMatch(m, k) { return k === "all" || m.tipo === k || (k === "podcast" && m.tipo === "video"); }
  function goLabel(m) {
    if (m.yt || m.tipo === "tv" || m.tipo === "podcast" || m.tipo === "video") return "Ver ↗";
    if (m.tipo === "radio") return "Escuchar ↗";
    return "Leer ↗";
  }
  function renderFilters() {
    var f = $("#filters"), q = $("#q"); if (!f || !q) return;
    var html = TIPOS.map(function (t) {
      var n = LOG.filter(function (m) { return tipoMatch(m, t.k); }).length;
      return '<button type="button" data-tipo="' + t.k + '" aria-pressed="' + (t.k === logState.tipo) + '">' +
        esc(t.l) + '<span class="n">' + n + "</span></button>";
    }).join("");
    q.insertAdjacentHTML("beforebegin", html);
    $$("button[data-tipo]", f).forEach(function (b) {
      b.addEventListener("click", function () {
        logState.tipo = b.getAttribute("data-tipo"); logState.all = false;
        $$("button[data-tipo]", f).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        renderLog();
      });
    });
    q.addEventListener("input", function () { logState.q = q.value; logState.all = false; renderLog(); });
  }
  function renderLog() {
    var el = $("#log"); if (!el) return;
    var q = norm(logState.q).trim();
    var rows = LOG.filter(function (m) {
      if (!tipoMatch(m, logState.tipo)) return false;
      if (!q) return true;
      return norm([m.medio, m.titulo, m.tema, m.detalle].join(" ")).indexOf(q) >= 0;
    });
    var shown = logState.all ? rows : rows.slice(0, 15);
    el.innerHTML = shown.map(function (m) {
      var detalle = m.detalle && m.detalle !== m.medio ? m.detalle : "";
      var small = [detalle, m.tema && !/^geopol[ií]tica$/i.test(m.tema) ? m.tema : ""].filter(Boolean).join(" · ");
      var go = m.url
        ? '<a class="go" href="' + esc(m.url) + '" target="_blank" rel="noopener" aria-label="' + esc(goLabel(m).replace(" ↗", "") + ": " + m.medio) + '">' + goLabel(m) + "</a>"
        : '<span class="go none">Sin enlace</span>';
      return "<li>" +
        '<span class="date">' + esc(fmtDate(m.fecha, m.fechaTexto)) + "</span>" +
        '<span class="tag ' + esc(m.tipo) + '">' + esc(TAG[m.tipo] || m.tipo) + "</span>" +
        '<span class="what"><b>' + esc(m.medio) + '</b><span class="t">' + esc(m.titulo) + "</span>" +
        (small ? "<small>" + esc(small) + "</small>" : "") + "</span>" + go + "</li>";
    }).join("");
    $("#logEmpty").hidden = rows.length > 0;
    var more = $("#moreBtn");
    if (more) {
      more.hidden = rows.length <= 15;
      more.textContent = logState.all ? "Mostrar menos" : "Ver todas (" + rows.length + ")";
      more.setAttribute("aria-expanded", String(logState.all));
    }
  }
  function initLog() {
    renderFilters(); renderLog();
    var intro = $("#mediosIntro");
    if (intro) intro.textContent = LOG.length + " entrevistas, tertulias, análisis y actos, la gran mayoría desde la publicación del libro en abril de 2026: de la tertulia semanal de geopolítica en Negocios TV a RNE, TVE, France 24, Onda Cero o COPE.";
    var mi = $("#mundoIntro");
    if (mi && LUGARES.length) mi.textContent = LUGARES.length + " ciudades en cuatro continentes: nueve convenciones consecutivas de la International Studies Association, un año de investigación en Japón con la Japan Foundation y docencia invitada en Europa y América.";
    var more = $("#moreBtn");
    if (more) more.addEventListener("click", function () {
      var wasAll = logState.all;
      logState.all = !logState.all; renderLog();
      if (wasAll) $("#log").scrollIntoView({ block: "start" });
    });
  }

  /* ---------- artículos ---------- */
  function renderArticles() {
    var el = $("#articles"), old = $("#older"); if (!el) return;
    var withUrl = ARTICULOS.filter(function (a) { return a.url && !a.soloAnio; })
      .sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
    el.innerHTML = withUrl.map(function (a) {
      return '<a class="art" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
        '<span class="row"><span class="eyebrow">' + esc(a.medio.replace(/ \(.*\)$/, "")) + " · " + esc(fmtDate(a.fecha)) + "</span>" +
        '<span class="eyebrow">' + esc(a.genero || "") + "</span></span>" +
        "<h3>" + esc(a.titulo) + "</h3>" +
        (a.resumen ? "<p>" + esc(a.resumen) + "</p>" : "") +
        (a.impresa ? '<span class="ed">Edición impresa · ' + esc(a.impresa) + "</span>" : "") + "</a>";
    }).join("");
    if (!old) return;
    var older = ARTICULOS.filter(function (a) { return a.soloAnio || !a.url; })
      .sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
    if (!older.length) { old.hidden = true; return; }
    old.innerHTML = "<h4>Artículos anteriores</h4><ul>" + older.map(function (a) {
      var t = "«" + esc(a.titulo) + "»";
      return "<li>" + (a.url ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener">' + t + "</a>" : t) +
        ", <i>" + esc(a.medio) + "</i>, " + esc(a.soloAnio ? year(a.fecha) : fmtDate(a.fecha)) +
        (a.url ? "" : /papel/i.test(a.soporte || "")
          ? ' <span class="pend">(solo en papel' + (a.impresa ? ": " + esc(a.impresa) : "") + ")</span>"
          : ' <span class="pend">(enlace pendiente)</span>') + "</li>";
    }).join("") + "</ul>";
  }

  /* ---------- publicaciones ---------- */
  var PUB_TIPOS = [
    ["libro", "Libro"], ["articulo", "Artículos en revistas"], ["capitulo", "Capítulos de libro"],
    ["enciclopedia", "Obras de referencia"], ["informe", "Informes"]
  ];
  var PUB_KIND = { libro: "Libro", articulo: "Artículo en revista", capitulo: "Capítulo de libro", enciclopedia: "Obra de referencia", informe: "Informe" };
  function pubLink(p) {
    if (p.doi) return '<a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">doi.org/' + esc(p.doi) + "</a>";
    if (p.url) return '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]) + " ↗</a>";
    return "";
  }
  function renderPubs() {
    var f = $("#featuredPubs");
    if (f) f.innerHTML = PUBLICACIONES.filter(function (p) { return p.destacada; }).map(function (p) {
      return '<article class="pub"><span class="kind eyebrow">' + esc(PUB_KIND[p.tipo] || p.tipo) + " · " + esc(p.anio) + "</span>" +
        "<h3>" + esc(p.titulo) + "</h3><p>" + esc(p.fuente) + "</p>" + pubLink(p) + "</article>";
    }).join("");
    var l = $("#publist");
    if (l) l.innerHTML = PUB_TIPOS.map(function (t) {
      var ps = PUBLICACIONES.filter(function (p) { return p.tipo === t[0]; }).sort(function (a, b) { return b.anio - a.anio; });
      if (!ps.length) return "";
      return "<h4>" + esc(t[1]) + " (" + ps.length + ")</h4>" + ps.map(function (p) {
        var link = pubLink(p);
        return '<p><span class="y">' + esc(p.anio) + "</span><span>«" + esc(p.titulo) + "». " + esc(p.fuente) + (link ? " " + link : "") + "</span></p>";
      }).join("");
    }).join("");
    var s = $("#allPubsSummary");
    if (s) s.textContent = "Todas las publicaciones (" + PUBLICACIONES.length + ")";
  }

  /* ---------- mapa ---------- */
  var TIPO_ORD = { conf: 0, est: 1, doc: 2 };
  var TIPO_TXT = { conf: "Congreso o conferencia", est: "Estancia de investigación", doc: "Docencia invitada" };
  function selectPlace(i) {
    var p = LUGARES[i]; if (!p) return;
    $("#placeKind").textContent = p.pais;
    $("#placeName").textContent = p.ciudad;
    $("#placeWhat").textContent = p.que;
    $$(".pin").forEach(function (g) {
      var on = g.getAttribute("data-i") === String(i);
      g.classList.toggle("active", on);
      g.setAttribute("aria-pressed", String(on));
      if (on && g.parentNode) g.parentNode.appendChild(g); // el pin activo, encima de los vecinos
      if (on) centerPin(g);
    });
    $$("#placeList button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-i") === String(i))); });
  }
  // En móvil el mapa es más ancho que la pantalla: desplaza la caja para que el punto elegido quede a la vista
  function centerPin(g) {
    var box = $("#mapBox"); if (!box || box.scrollWidth <= box.clientWidth + 2) return;
    var br = box.getBoundingClientRect(), pr = g.getBoundingClientRect();
    if (pr.left < br.left + 20 || pr.right > br.right - 20)
      box.scrollLeft += (pr.left + pr.width / 2) - (br.left + br.width / 2);
  }
  function initMap() {
    $$(".pin").forEach(function (g) {
      var i = g.getAttribute("data-i");
      g.addEventListener("click", function () { selectPlace(i); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); selectPlace(i); }
      });
    });
    var list = $("#placeList");
    if (list) {
      var idx = LUGARES.map(function (p, i) { return i; }).sort(function (a, b) {
        return (TIPO_ORD[LUGARES[a].tipo] - TIPO_ORD[LUGARES[b].tipo]) || (a - b);
      });
      list.innerHTML = idx.map(function (i) {
        var p = LUGARES[i];
        return '<li><button type="button" data-i="' + i + '" aria-pressed="false" title="' + esc(TIPO_TXT[p.tipo] || "") + '">' +
          '<i class="l-' + esc(p.tipo) + '" aria-hidden="true"></i><b>' + esc(p.ciudad) + "</b> <span>" + esc(p.pais) + "</span></button></li>";
      }).join("");
      $$("button", list).forEach(function (b) {
        b.addEventListener("click", function () {
          selectPlace(b.getAttribute("data-i"));
          var card = $("#placeCard");
          if (card && card.getBoundingClientRect().top < 70) card.scrollIntoView({ block: "center", behavior: "smooth" });
        });
      });
    }
    var osaka = -1;
    LUGARES.forEach(function (p, i) { if (p.ciudad === "Osaka") osaka = i; });
    if (osaka >= 0) selectPlace(osaka);
  }

  /* ---------- trayectoria ---------- */
  function renderCV() {
    var t = $("#timeline");
    if (t) t.innerHTML = TRAYECTORIA.map(function (x) {
      return '<li class="' + esc(x.clase || "") + '"><span class="yr">' + esc(x.anio) + '</span><span class="tx"><b>' + esc(x.titulo) + "</b><span>" + esc(x.lugar) + "</span></span></li>";
    }).join("");
    var h = $("#honors");
    if (h) h.innerHTML = RECONOCIMIENTOS.map(function (r) { return "<li><b>" + esc(r.t) + ".</b> " + esc(r.d) + "</li>"; }).join("");
  }

  /* ---------- galería ---------- */
  var GALERIA = [
    ["casa-asia-1", "Presentación del libro en Casa Asia, Madrid (octubre de 2026)"],
    ["casa-asia-2", "Casa Asia, Madrid: debate sobre el Indo-Pacífico"],
    ["casa-asia-3", "Mesa de la presentación en Casa Asia, Madrid"],
    ["rne-1", "En el estudio de Radio Nacional de España"],
    ["rne-2", "Radio Nacional de España"],
    ["rne-3", "Radio Nacional de España"],
    ["negocios-tv", "Conexión con Negocios TV"],
    ["france-24", "Tertulia en France 24 (en español) sobre el G7"],
    ["retrato", "Retrato"]
  ];
  var lastFocus = null;
  function openLightbox(i) {
    var g = GALERIA[i], lb = $("#lightbox"); if (!g || !lb) return;
    lastFocus = document.activeElement;
    var img = $("#lbImg");
    img.src = "img/" + g[0] + "-hd.jpg"; img.alt = g[1];
    $("#lbCap").textContent = g[1];
    lb.hidden = false; document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLightbox() {
    var lb = $("#lightbox"); if (!lb || lb.hidden) return;
    lb.hidden = true; document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function initGallery() {
    var el = $("#gallery"); if (!el) return;
    el.innerHTML = GALERIA.map(function (g, i) {
      var big = i < 3;
      return '<button type="button" class="g' + (i + 1) + '" data-g="' + i + '" aria-label="Ampliar foto: ' + esc(g[1]) + '">' +
        '<img src="img/' + g[0] + (big ? ".webp" : "-sm.webp") + '" ' +
        (big ? 'srcset="img/' + g[0] + "-sm.webp 600w, img/" + g[0] + '.webp 1200w" sizes="(max-width: 760px) 100vw, 33vw" ' : "") +
        'alt="" loading="lazy"><span>' + esc(g[1]) + "</span></button>";
    }).join("");
    $$("button", el).forEach(function (b) { b.addEventListener("click", function () { openLightbox(+b.getAttribute("data-g")); }); });
    var lb = $("#lightbox");
    if (lb) {
      lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "FIGURE") closeLightbox(); });
      $("#lbClose").addEventListener("click", closeLightbox);
      lb.addEventListener("keydown", function (e) { if (e.key === "Tab") { e.preventDefault(); $("#lbClose").focus(); } });
    }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---------- biografías ---------- */
  var BIOS = {
    "es": {
      "corta": "Juan Luis López Aranguren es profesor de Relaciones Internacionales y Derecho internacional público, especialista en geopolítica de Asia y el Indo-Pacífico, China y Japón. Autor de El eje del mundo que viene (Ariel, 2026), es columnista de ABC y tertuliano de geopolítica en Negocios TV. Habla japonés e investigó un año en Japón con la Japan Foundation.",
      "media": "Juan Luis López Aranguren es profesor de Relaciones Internacionales y Derecho internacional público, especializado en geopolítica, Asia e Indo-Pacífico, seguridad internacional y guerra de narrativas. Es autor de El eje del mundo que viene. Cómo el Indo-Pacífico está transformando el orden global (Ariel, 2026), que llegó a su segunda edición siete meses después de su publicación. Columnista de ABC desde 2025 y tertuliano de geopolítica en Negocios TV, analiza la actualidad internacional en radio y televisión. Doctor Internacional en Comunicación y licenciado en Periodismo, trabajó como periodista en Diario de Navarra e investigó doce meses en Japón con la Japan Foundation. Ha participado en nueve convenciones consecutivas de la International Studies Association. Habla japonés, inglés, catalán, francés y chino mandarín.",
      "larga": "Juan Luis López Aranguren es profesor de Relaciones Internacionales y Derecho internacional público. Está especializado en geopolítica, Asia e Indo-Pacífico, seguridad internacional y guerra de narrativas, con especial atención a China y Japón y a la diplomacia pública.\n\nEs autor de El eje del mundo que viene. Cómo el Indo-Pacífico está transformando el orden global (Ariel, Grupo Planeta, 2026), un ensayo que integra el Derecho internacional público, las Relaciones Internacionales y los estudios de seguridad para explicar por qué el centro de gravedad del mundo se desplaza hacia Asia. Llegó a su segunda edición en siete meses y fue número uno en Ciencias Militares en Amazon.es.\n\nColumnista de ABC, donde ha publicado veinte piezas desde 2025, y tertuliano de geopolítica en Negocios TV, ha analizado la actualidad internacional en RNE, TVE, France 24, Cuatro, Cadena SER, Onda Cero y COPE, entre otros medios.\n\nDoctor Internacional en Comunicación y licenciado en Periodismo, con experiencia como periodista en Diario de Navarra, investigó doce meses en Japón con la Japan Foundation Japanese Studies Fellowship. Ha realizado estancias de investigación y docencia en América, Europa, Asia y Oceanía, ha participado en nueve convenciones consecutivas de la International Studies Association y forma parte desde 2025 del Governing Board de su International Communication Section.\n\nTiene reconocidos dos sexenios de investigación y ha publicado catorce artículos en revistas académicas y veintidós capítulos de libro en editoriales como Routledge, Edward Elgar, Aranzadi y Tirant lo Blanch. Habla español, inglés, japonés, catalán, francés y chino mandarín."
    },
    "en": {
      "corta": "Juan Luis López Aranguren is a Professor of International Relations and Public International Law specialising in the Indo-Pacific, China and Japan. Author of El eje del mundo que viene (Ariel, 2026), he is an ABC columnist and geopolitics panellist on Negocios TV. A Japanese speaker, he spent a year researching in Japan with the Japan Foundation.",
      "media": "Juan Luis López Aranguren is a Professor of International Relations and Public International Law specialising in geopolitics, Asia and the Indo-Pacific, international security and narrative warfare. He is the author of El eje del mundo que viene (The Axis of the Coming World: How the Indo-Pacific Is Transforming the Global Order; Ariel, 2026), which went into a second edition seven months after publication. A columnist for ABC since 2025 and a regular geopolitics panellist on Negocios TV, he comments on international affairs on Spanish radio and television. He holds an International PhD in Communication and a degree in Journalism, worked as a journalist at Diario de Navarra, and spent twelve months researching in Japan with the Japan Foundation. He speaks Japanese, English, Catalan, French and Mandarin Chinese.",
      "larga": "Juan Luis López Aranguren is a Professor of International Relations and Public International Law. He specialises in geopolitics, Asia and the Indo-Pacific, international security and narrative warfare, with a particular focus on China, Japan and public diplomacy.\n\nHe is the author of El eje del mundo que viene. Cómo el Indo-Pacífico está transformando el orden global (Ariel, Grupo Planeta, 2026), a book that brings together public international law, international relations and security studies to explain why the world's centre of gravity is shifting towards Asia. It went into a second edition within seven months and reached number one in Military Science on Amazon.es.\n\nA columnist for ABC, where he has published twenty pieces since 2025, and a geopolitics panellist on Negocios TV, he has discussed international affairs on RNE, TVE, France 24, Cuatro, Cadena SER, Onda Cero and COPE, among other outlets.\n\nHe holds an International PhD in Communication and a degree in Journalism, has worked as a journalist at Diario de Navarra, and spent twelve months researching in Japan with a Japan Foundation Japanese Studies Fellowship. He has held research and teaching positions in the Americas, Europe, Asia and Oceania, has taken part in nine consecutive International Studies Association conventions, and has served since 2025 on the Governing Board of the ISA's International Communication Section.\n\nHe holds two accredited six-year research periods (sexenios) and has published fourteen journal articles and twenty-two book chapters with publishers including Routledge, Edward Elgar, Aranzadi and Tirant lo Blanch. He speaks Spanish, English, Japanese, Catalan, French and Mandarin Chinese."
    }
  };
  var bioKey = "corta";
  function words(s) { return s.trim().split(/\s+/).filter(Boolean).length; }
  function renderBio() {
    var t = $("#bioText"); if (!t) return;
    var txt = BIOS[lang][bioKey];
    t.innerHTML = txt.split("\n\n").map(function (p) { return esc(p); }).join("<br><br>");
    var tab = $('[data-bio="' + bioKey + '"]');
    if (tab) t.setAttribute("aria-labelledby", tab.id);
    var c = $("#bioCount");
    if (c) c.textContent = words(txt) + (lang === "en" ? " words" : " palabras");
  }
  function initBios() {
    var tabs = $$("[data-bio]");
    function pick(b, focus) {
      bioKey = b.getAttribute("data-bio");
      tabs.forEach(function (x) { var on = x === b; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; });
      if (focus) b.focus();
      renderBio();
    }
    tabs.forEach(function (b, i) {
      b.tabIndex = b.getAttribute("aria-selected") === "true" ? 0 : -1;
      b.addEventListener("click", function () { pick(b); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
    renderBio();
    var copy = $("#copyBio");
    if (copy) copy.addEventListener("click", function () {
      copyText(BIOS[lang][bioKey], $("#bioText"), lang === "en" ? "Biography copied" : "Biografía copiada");
    });
  }

  /* ---------- contacto ---------- */
  function initContact() {
    var email = (CONFIG.email || "").trim();
    var acad = (CONFIG.emailAcademico || "").trim();
    var mail = function (e) { return '<a href="mailto:' + esc(e) + '">' + esc(e) + "</a>"; };
    var v = $("#emailV");
    if (v) {
      if (email) v.innerHTML = mail(email);
      else if (acad) v.parentNode.hidden = true;
      else v.textContent = EMAIL_PH;
    }
    var row = $("#emailAcadRow");
    if (row && acad) { $("#emailAcadV").innerHTML = mail(acad); row.hidden = false; }
    var main = email || acad;
    if (main) $$('a[href="#contacto"].btn').forEach(function (a) { a.href = "mailto:" + main; });
    var c = $("#copyEmail"); if (c && !email) c.hidden = true;
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var val = (CONFIG[b.getAttribute("data-copy")] || "").trim();
        if (val) copyText(val, b.previousElementSibling, lang === "en" ? "Email copied" : "Email copiado");
      });
    });
    var li = (CONFIG.linkedin || "").trim(), liA = $("#liLink");
    if (liA) {
      if (/^https:\/\/([a-z]+\.)?linkedin\.com\//.test(li)) {
        liA.href = li;
        $(".v", liA).textContent = li.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");
      } else if (!li) liA.hidden = true;
    }
    var x = (CONFIG.x || "").replace(/^@/, "").trim();
    if (x && $("#xLink")) { $("#xLink").href = "https://x.com/" + encodeURIComponent(x); $("#xV").textContent = "@" + x; }
    var o = (CONFIG.orcid || "").trim();
    if (o && $("#orcidLink")) { $("#orcidLink").href = "https://orcid.org/" + encodeURIComponent(o); $("#orcidV").textContent = o; }
  }

  /* ---------- idioma ---------- */
  var EN = {
    "nav.libro": "The book", "nav.medios": "Media", "nav.articulos": "Articles", "nav.investigacion": "Research",
    "nav.mundo": "Worldwide", "nav.trayectoria": "Career", "nav.prensa": "Press", "nav.contacto": "Contact",
    "hero.eyebrow": "Professor of International Relations and Public International Law",
    "hero.lede": "Analyst of the <strong>Indo-Pacific, China, Japan and the global order</strong>. Author of <em>El eje del mundo que viene</em> (Ariel), ABC columnist and geopolitics panellist on Negocios TV.",
    "hero.cta1": "Request an interview", "hero.cta2": "The book",
    "hero.cap": "Casa Asia, Madrid · October 2026",
    "seen": "Has analysed current affairs on",
    "libro.eyebrow": "The book · Ariel, 2026",
    "libro.h2": "El eje del mundo que viene",
    "libro.sub": "The Axis of the Coming World: How the Indo-Pacific Is Transforming the Global Order. Published in Spanish.",
    "libro.synopsis": "<p>The Indo-Pacific is the epicentre where the future of the planet is being decided. Its waters are home to two thirds of humanity, and in them converge the largest economies, the main trade routes and the most decisive nuclear powers of the twenty-first century. As China, India, Japan, the United States and Russia compete for influence, new alliances are beginning to reshape the world chessboard.</p><p><em>El eje del mundo que viene</em> explores how artificial intelligence, energy, demography and control of data are redefining the rules of power, and the choice facing the West: to watch from a distance or to take an active part in designing this new order. A book that combines history, geostrategy and foresight to decode the greatest shift in power since the Second World War.</p>",
    "libro.m1": "Second edition in November 2026, seven months after publication",
    "libro.m2": "Third edition planned for the Christmas season",
    "libro.m3": "In the Military Science category on Amazon.es",
    "libro.m4": "On sale in Spain, the United States and Latin America",
    "libro.m5": "In International Relations and Globalisation on Amazon.es, at launch",
    "libro.buy": "Buy the book", "libro.amazon": "Buy on Amazon", "libro.reviews": "Written about the book",
    "prensa.eyebrow": "Press room", "prensa.h2": "For journalists and organisers",
    "prensa.sub": "Biographies ready to copy, high-resolution photographs and the topics he can discuss.",
    "prensa.temas": "Topics", "prensa.fotos": "Photographs",
    "bio.corta": "Short · 50 words", "bio.media": "Medium · 120", "bio.larga": "Full · 250", "bio.copy": "Copy biography",
    "contacto.eyebrow": "Contact", "contacto.h2": "Interviews, panels and lectures",
    "contacto.sub": "Available for live links, interviews in Spanish, English and Japanese, book presentations and lectures.",
    "contacto.copy": "Copy", "contacto.acad": "Academic email",
    "footer": "Views expressed in articles and interviews are personal."
  };
  var ES = {};
  function applyLang(l) {
    lang = l === "en" ? "en" : "es";
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in ES)) ES[k] = el.textContent;
      el.textContent = lang === "en" && EN[k] ? EN[k] : ES[k];
    });
    $$("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (!(k in ES)) ES[k] = el.innerHTML;
      el.innerHTML = lang === "en" && EN[k] ? EN[k] : ES[k];
    });
    document.documentElement.lang = lang;
    var b = $("#langBtn");
    if (b) {
      b.textContent = lang === "en" ? "ES" : "EN";
      b.setAttribute("aria-label", lang === "en" ? "Cambiar el idioma a español" : "Change language to English");
    }
    var m = $("#menuBtn"); if (m) m.textContent = lang === "en" ? "MENU" : "MENÚ";
    var t = $("#themeBtn"); if (t) t.setAttribute("aria-label", lang === "en" ? "Switch light or dark theme" : "Cambiar tema claro u oscuro");
    var tl = $(".tabs"); if (tl) tl.setAttribute("aria-label", lang === "en" ? "Biography length" : "Longitud de la biografía");
    renderFigures(); renderBio();
  }
  function initLang() {
    var saved = store("lang");
    applyLang(saved === "en" ? "en" : "es");
    var b = $("#langBtn");
    if (b) b.addEventListener("click", function () {
      applyLang(lang === "en" ? "es" : "en");
      store("lang", lang);
    });
  }

  /* ---------- tema ---------- */
  function currentTheme() {
    var a = document.documentElement.getAttribute("data-theme");
    if (a === "light" || a === "dark") return a;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function initTheme() {
    var saved = store("theme");
    if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
    var b = $("#themeBtn");
    if (b) b.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      store("theme", next);
    });
  }

  /* ---------- menú móvil ---------- */
  function initMenu() {
    var b = $("#menuBtn"), nav = $("#nav"); if (!b || !nav) return;
    function set(open) { nav.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open)); }
    b.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { set(false); b.focus(); } });
  }

  /* ---------- aparición suave al hacer scroll ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var els = $$(".sec-head, .book, .videos, .articles, .featured-pubs, .map-wrap, .cv, .gallery, .press-grid");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("reveal", "pre"); io.observe(el); }
    });
  }

  function init() {
    initTheme();
    renderReviews(); renderVideos(); initLog(); renderArticles(); renderPubs();
    initMap(); renderCV(); initGallery(); initBios(); initContact(); initMenu();
    initLang(); // al final: guarda los textos en español ya pintados y aplica el idioma guardado
    initReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
