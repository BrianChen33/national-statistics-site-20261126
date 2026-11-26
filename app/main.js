// Singapore in Numbers — the router and the page interactions.
//
// Routes (all hashes, so the whole site is one file load and every page is
// a link): #/ overview, #/topics, #/topic/<slug>, #/explorer with an
// optional /<id> and ?q=&sort=&topic=, #/sources with an optional
// #source-N anchor. Unknown routes get a plain "not found" page with a
// way home — never a blank screen.
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

// Decode one URI component without ever throwing: a malformed escape
// becomes an empty string instead of a blank page.
function safeDecode(s) {
  try { return decodeURIComponent(s); } catch (e) { return ""; }
}

var app = document.getElementById("app");
var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));

function currentRoute() {
  var hash = location.hash || "#/";
  if (hash === "#/" || hash === "#") return { view: "overview" };
  var m = hash.match(/^#\/topics$/);
  if (m) return { view: "topics" };
  m = hash.match(/^#\/topic\/([^/?#]+)$/);
  if (m) return { view: "topic", slug: safeDecode(m[1]) };
  m = hash.match(/^#\/sources(?:#(source-\d+))?$/);
  if (m) return { view: "sources", anchor: m[1] || "" };
  if (hash.indexOf("#/explorer") === 0) {
    var parsed = parseExplorerHash(hash);
    if (!parsed) return { view: "missing" };
    return { view: parsed.id ? "series" : "explorer", id: parsed.id, state: parsed };
  }
  return { view: "missing" };
}

function markNav(view) {
  navLinks.forEach(function (a) {
    var on = a.getAttribute("data-nav") === view ||
      (view === "topic" && a.getAttribute("data-nav") === "topics") ||
      (view === "series" && a.getAttribute("data-nav") === "explorer");
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
}

function render() {
  window.__shotReady = false;
  var r = currentRoute();
  var html;
  if (r.view === "overview") { document.title = "Singapore in Numbers"; html = renderOverview(); }
  else if (r.view === "topics") { document.title = "Topics | Singapore in Numbers"; html = renderTopicsIndex(); }
  else if (r.view === "topic") {
    var t = topicBySlug(r.slug);
    document.title = (t ? t.title : "Topic not found") + " | Singapore in Numbers";
    html = renderTopic(r.slug);
  }
  else if (r.view === "explorer") { document.title = "Data explorer | Singapore in Numbers"; html = renderExplorer(r.state); }
  else if (r.view === "series") {
    var s = seriesById(r.id);
    document.title = (s ? s.name : "Indicator not found") + " | Singapore in Numbers";
    html = renderSeriesDetail(r.id, r.state);
  }
  else if (r.view === "sources") { document.title = "Sources & method | Singapore in Numbers"; html = renderSources(); }
  else {
    document.title = "Not found | Singapore in Numbers";
    html = '<h1>Page not found</h1><p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>';
  }
  app.innerHTML = html;
  markNav(r.view);
  var h1 = app.querySelector("h1");
  if (h1) {
    h1.setAttribute("tabindex", "-1");
    h1.focus({ preventScroll: true });
  }
  if (r.view === "sources" && r.anchor) {
    var el = document.getElementById(r.anchor);
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 0);
  }
  window.__shotReady = true;
}

// Chart | Table switches, copy-link buttons, and the explorer's live
// search — one delegated listener, so nothing is wired per page.
document.addEventListener("click", function (ev) {
  var toggle = ev.target.closest("[data-panel]");
  if (toggle) {
    var panel = window.__chartPanels && window.__chartPanels[toggle.getAttribute("data-panel")];
    var body = document.getElementById("panel-" + toggle.getAttribute("data-panel"));
    if (panel && body) {
      var view = toggle.getAttribute("data-view");
      body.innerHTML = view === "table" ? panel.table : panel.chart;
      var group = toggle.parentElement;
      group.querySelectorAll("button").forEach(function (b) {
        var on = b === toggle;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    return;
  }
  var copy = ev.target.closest("[data-copy]");
  if (copy) {
    var text = copy.getAttribute("data-copy");
    var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy link"; }, 1500); };
    var failed = function () {
      // Both clipboard paths failed: show the address in a visible field
      // with the text selected, so it can still be copied by hand, and
      // say so on the button instead of claiming success.
      var input = document.createElement("input");
      input.type = "text"; input.readOnly = true; input.value = text;
      input.className = "copy-fallback";
      copy.parentElement.insertBefore(input, copy.nextSibling);
      input.focus(); input.select();
      copy.textContent = "Copy failed";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { if (fallbackCopy(text)) done(); else failed(); });
    } else if (fallbackCopy(text)) { done(); } else { failed(); }
  }
});

// Best-effort copy for browsers without the async clipboard API. Returns
// whether the copy command reported success.
function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text; ta.setAttribute("readonly", "");
  ta.style.position = "absolute"; ta.style.left = "-9999px";
  document.body.appendChild(ta); ta.select();
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { /* clipboard unavailable */ }
  document.body.removeChild(ta);
  return !!ok;
}

// The explorer's search filters the list as you type, without moving the
// page or losing the cursor; sort and topic jump through the address so a
// reload keeps them. Typing updates the address without adding a history
// step, and committing the search (Enter, or leaving the field) records
// one step, so Back returns to the search you came from.
document.addEventListener("input", function (ev) {
  if (ev.target && ev.target.id === "explorer-q") {
    EXPLORER_STATE.q = ev.target.value;
    var rows = explorerRows(EXPLORER_STATE);
    var box = document.getElementById("explorer-results");
    var count = document.getElementById("explorer-count");
    if (box) {
      box.innerHTML = rows.length ? rows.map(function (s) { return explorerRowHtml(s, EXPLORER_STATE); }).join("")
        : '<p class="empty">No indicator matches. Try a shorter word, for example “trade” or “income”.</p>';
    }
    if (count) count.textContent = rows.length + " indicator" + (rows.length === 1 ? "" : "s");
    history.replaceState(null, "", explorerHash(currentRoute().id || "", EXPLORER_STATE));
  }
});

document.addEventListener("change", function (ev) {
  if (!ev.target) return;
  if (ev.target.id === "explorer-q") {
    history.pushState(null, "", explorerHash(currentRoute().id || "", EXPLORER_STATE));
    return;
  }
  if (ev.target.id === "explorer-sort" || ev.target.id === "explorer-topic") {
    var id = currentRoute().id || "";
    if (ev.target.id === "explorer-sort") EXPLORER_STATE.sort = ev.target.value;
    if (ev.target.id === "explorer-topic") EXPLORER_STATE.topic = ev.target.value;
    var next = explorerHash(id, EXPLORER_STATE);
    if (location.hash !== next) location.hash = next; else render();
  }
});

window.addEventListener("hashchange", render);
render();
