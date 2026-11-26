// Singapore in Numbers — the data explorer.
//
// Every indicator in the catalogue is searchable, sortable and openable.
// The list answers "which series exist"; a series page answers "what are
// its values, and where did they come from". Search text typed here filters
// the list live without leaving the page; the query, sort and topic filter
// are also readable from the address, so a deep link or a reload keeps
// the same view.

var EXPLORER_STATE = { q: "", sort: "name", topic: "all" };

// Parse the explorer's part of the address: #/explorer, #/explorer/<id>,
// each optionally with ?q=...&sort=...&topic=...
function parseExplorerHash(hash) {
  var out = { id: "", q: "", sort: "name", topic: "all" };
  var m = hash.match(/^#\/explorer(?:\/([^?]+))?(?:\?(.*))?$/);
  if (!m) return out;
  if (m[1]) out.id = decodeURIComponent(m[1]);
  if (m[2]) {
    m[2].split("&").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv[0] === "q") out.q = decodeURIComponent(kv[1] || "").replace(/\+/g, " ");
      if (kv[0] === "sort") out.sort = kv[1] || "name";
      if (kv[0] === "topic") out.topic = kv[1] || "all";
    });
  }
  return out;
}

function explorerHash(id, state) {
  var parts = [];
  if (state.q) parts.push("q=" + encodeURIComponent(state.q));
  if (state.sort && state.sort !== "name") parts.push("sort=" + state.sort);
  if (state.topic && state.topic !== "all") parts.push("topic=" + state.topic);
  return "#/explorer" + (id ? "/" + id : "") + (parts.length ? "?" + parts.join("&") : "");
}

// The filtered, sorted indicator list for the current state.
function explorerRows(state) {
  var q = state.q.trim().toLowerCase();
  var rows = SERIES.filter(function (s) {
    if (state.topic !== "all" && s.topic !== state.topic) return false;
    if (!q) return true;
    var hay = (s.name + " " + s.topic + " " + s.unit).toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  });
  if (state.sort === "value") {
    rows = rows.slice().sort(function (a, b) { return latestOf(b)[1] - latestOf(a)[1]; });
  } else if (state.sort === "year") {
    rows = rows.slice().sort(function (a, b) { return latestOf(b)[0] - latestOf(a)[0] || a.name.localeCompare(b.name); });
  } else {
    rows = rows.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
  }
  return rows;
}

function explorerRowHtml(s, state) {
  var last = latestOf(s);
  var t = topicBySlug(s.topic);
  return '<a class="explorer-row" href="' + explorerHash(s.id, state) + '">' +
    '<span class="explorer-name">' + esc(s.name) + '</span>' +
    '<span class="explorer-topic">' + esc(t ? t.title : s.topic) + '</span>' +
    '<span class="explorer-value">' + fmtValue(last[1]) + ' <span class="stat-unit">' + esc(s.shortUnit) + '</span></span>' +
    '<span class="explorer-year">' + last[0] + '</span></a>';
}

// The explorer list view.
function renderExplorer(state) {
  EXPLORER_STATE = { q: state.q, sort: state.sort, topic: state.topic };
  var rows = explorerRows(EXPLORER_STATE);
  var topicOptions = ['<option value="all">All topics</option>'].concat(TOPICS.map(function (t) {
    return '<option value="' + t.slug + '"' + (state.topic === t.slug ? " selected" : "") + '>' + esc(t.title) + '</option>';
  })).join("");
  var list = rows.length ? rows.map(function (s) { return explorerRowHtml(s, EXPLORER_STATE); }).join("")
    : '<p class="empty">No indicator matches. Try a shorter word, for example “trade” or “income”.</p>';
  return '<h1>Data explorer</h1>' +
    '<p class="lede">Every indicator on this site — ' + SERIES.length + ' in all — with its latest value, unit and source. Choose one to see its full series.</p>' +
    '<div class="explorer-controls">' +
    '<label>Search <input id="explorer-q" type="search" value="' + esc(state.q) + '" placeholder="Try “unemployment”" autocomplete="off"></label>' +
    '<label>Topic <select id="explorer-topic">' + topicOptions + '</select></label>' +
    '<label>Sort <select id="explorer-sort">' +
    '<option value="name"' + (state.sort === "name" ? " selected" : "") + '>Name, A to Z</option>' +
    '<option value="year"' + (state.sort === "year" ? " selected" : "") + '>Latest year first</option>' +
    '<option value="value"' + (state.sort === "value" ? " selected" : "") + '>Latest value, high to low</option>' +
    '</select></label></div>' +
    '<p class="result-count" id="explorer-count">' + rows.length + ' indicator' + (rows.length === 1 ? "" : "s") + '</p>' +
    '<div class="explorer-list" id="explorer-results">' + list + '</div>' +
    '<p class="note">Units and years are shown with every value. Open a row for the full series, the chart, and the exact source.</p>';
}

// One indicator's page: chart (when it has a series), full table, note, source.
function renderSeriesDetail(id, state) {
  var s = seriesById(id);
  if (!s) {
    return '<h1>Indicator not found</h1><p>There is no indicator at this address. <a href="#/explorer">Browse all indicators</a>.</p>';
  }
  var t = topicBySlug(s.topic);
  var last = latestOf(s);
  var src = SOURCES[s.source];
  var body;
  if (s.categories) {
    body = chartPanel("series-" + s.id, hbarChart(s.values, { decimals: 0, labelWidth: 215 }), valueTable(s), s.name);
  } else if (s.values.length > 1) {
    body = chartPanel("series-" + s.id, lineChart(s, { decimals: 1 }), valueTable(s), s.name);
  } else {
    body = '<p class="big-stat"><span class="stat-value">' + fmtValue(last[1]) + ' <span class="stat-unit">' + esc(s.shortUnit) + '</span></span>' +
      '<span class="stat-name">' + esc(s.unit) + ', ' + last[0] + '</span></p>' + valueTable(s);
  }
  return '<p class="crumb"><a href="' + explorerHash("", state) + '">&larr; Data explorer</a> · <a href="#/topic/' + s.topic + '">' + esc(t ? t.title : s.topic) + '</a></p>' +
    '<h1>' + esc(s.name) + '</h1>' +
    '<p class="lede">Latest: <strong>' + fmtValue(last[1]) + ' ' + esc(s.shortUnit) + '</strong> in ' + last[0] + ' (' + esc(s.unit) + ').</p>' +
    body +
    '<p class="note">' + esc(s.note) + '</p>' +
    '<section class="source-record"><h2>Source</h2>' +
    '<p><strong>' + esc(src.agency) + '</strong> — ' + esc(src.title) + '.</p>' +
    '<p>' + esc(src.detail) + '</p>' +
    (src.url ? '<p>Original: <span class="url-text">' + esc(src.url) + '</span> <button type="button" class="copy-btn" data-copy="' + esc(src.url) + '">Copy link</button></p>' : '<p>No verified original address is listed for this source; it is cited by agency and publication.</p>') +
    '<p class="source">Retrieved ' + esc(src.retrieved) + '.</p></section>';
}
