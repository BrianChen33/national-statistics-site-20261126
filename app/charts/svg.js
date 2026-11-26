// Singapore in Numbers — small hand-rolled SVG charts.
//
// No chart library: every chart is a plain SVG string built from the
// indicator catalogue, so the site needs no network and no dependency. Each
// chart prints its values directly on the marks, because a chart whose
// reading depends on hovering fails the moment the screenshot is shrunk.
// One red (#c8102e) marks the focal series; comparison series stay neutral
// grey. Red never means good or bad here.

var CHART_RED = "#c8102e";
var CHART_GREY = "#5a6b7c";
var CHART_GRID = "#dbe2e8";
var CHART_TEXT = "#1c2b39";

// Escape text before it goes into markup.
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

// How many decimals a value carries in the catalogue (at most 3), so a
// table or a card prints the value exactly as published: 505.7 stays
// 505.7, 0.435 stays 0.435, and whole numbers stay whole.
function decimalsOf(v) {
  var s = String(v), i = s.indexOf(".");
  return i === -1 ? 0 : Math.min(s.length - i - 1, 3);
}

// Format a value exactly as published.
function fmtValue(v) {
  return fmtNum(v, decimalsOf(v));
}

// Format a number with thousands separators and a chosen precision.
function fmtNum(v, decimals) {
  var d = decimals === undefined ? (Math.abs(v) < 10 && v % 1 !== 0 ? 2 : 0) : decimals;
  return Number(v).toLocaleString("en-SG", { minimumFractionDigits: d, maximumFractionDigits: d });
}

// A round step size for axis gridlines: 1, 2, 5 or 10 times a power of
// ten, chosen so the range holds about `target` steps. Gridlines then read
// 0, 10, 20 — never 3.7, 9.8, 15.8.
function niceStep(range, target) {
  if (!(range > 0)) return 1;
  var raw = range / target;
  var mag = Math.pow(10, Math.floor(Math.log10(raw)));
  var norm = raw / mag;
  return (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
}

// A line chart for one year series: points joined in order, each labelled.
// opts: {height, color, decimals, ymin} — ymin defaults to a padded min so
// small changes stay visible; pass ymin 0 to anchor at zero.
function lineChart(entry, opts) {
  var o = opts || {};
  var W = 640, H = o.height || 210, padL = 46, padR = 14, padT = 26, padB = 30;
  var pts = entry.values;
  var vals = pts.map(function (p) { return p[1]; });
  var lo = o.ymin !== undefined ? o.ymin : Math.min.apply(null, vals);
  var hi = Math.max.apply(null, vals);
  if (hi === lo) { hi = lo + 1; }
  var span = hi - lo, pad = span * 0.12;
  lo -= pad; hi += pad;
  function X(i) { return padL + (i * (W - padL - padR)) / Math.max(pts.length - 1, 1); }
  function Y(v) { return padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB); }
  var grid = "";
  var step = niceStep(hi - lo, 3);
  for (var g = Math.ceil(lo / step) * step; g < hi; g += step) {
    var y = Y(g);
    var gv = g === 0 ? 0 : g; // never print "-0" for the zero line
    grid += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + CHART_GRID + '" stroke-width="1"/>' +
      '<text x="' + (padL - 6) + '" y="' + (y + 4).toFixed(1) + '" font-size="11" fill="' + CHART_GREY + '" text-anchor="end">' + fmtNum(gv, decimalsOf(step)) + '</text>';
  }
  var line = pts.map(function (p, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p[1]).toFixed(1); }).join(" ");
  var marks = pts.map(function (p, i) {
    var labelAbove = i % 2 === 0;
    return '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="4.5" fill="' + (o.color || CHART_RED) + '"/>' +
      '<text x="' + X(i).toFixed(1) + '" y="' + (Y(p[1]) + (labelAbove ? -10 : 20)).toFixed(1) + '" font-size="12" font-weight="700" fill="' + CHART_TEXT + '" text-anchor="middle">' + fmtNum(p[1], o.decimals) + '</text>' +
      '<text x="' + X(i).toFixed(1) + '" y="' + (H - 8) + '" font-size="11" fill="' + CHART_GREY + '" text-anchor="middle">' + p[0] + '</text>';
  }).join("");
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(entry.name) + ' chart" style="width:100%;height:auto;display:block">' +
    grid +
    '<line x1="' + padL + '" y1="' + (H - padB) + '" x2="' + (W - padR) + '" y2="' + (H - padB) + '" stroke="#9fb0bf" stroke-width="1"/>' +
    '<path d="' + line + '" fill="none" stroke="' + (o.color || CHART_RED) + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    marks + '</svg>';
}

// Grouped vertical bars for two year series (for example exports against
// imports). opts: {height, decimals, labels:[a,b], colors:[a,b]}.
function groupBarChart(a, b, opts) {
  var o = opts || {};
  var W = 640, H = o.height || 230, padL = 52, padR = 14, padT = 26, padB = 30;
  var years = a.values.map(function (p) { return p[0]; });
  var all = a.values.map(function (p) { return p[1]; }).concat(b.values.map(function (p) { return p[1]; }));
  var rawMax = Math.max.apply(null, all);
  var step = niceStep(rawMax, 3);
  var hi = Math.ceil(rawMax / step) * step;
  if (hi <= rawMax) hi += step;
  function Y(v) { return padT + (1 - v / hi) * (H - padT - padB); }
  var slot = (W - padL - padR) / years.length, bw = Math.min(34, (slot - 18) / 2);
  var grid = "";
  for (var g = step; g < hi; g += step) {
    var y = Y(g);
    grid += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + CHART_GRID + '" stroke-width="1"/>' +
      '<text x="' + (padL - 6) + '" y="' + (y + 4).toFixed(1) + '" font-size="11" fill="' + CHART_GREY + '" text-anchor="end">' + fmtNum(g, decimalsOf(step)) + '</text>';
  }
  var bars = "";
  years.forEach(function (yr, i) {
    var cx = padL + slot * i + slot / 2;
    [[a, o.colors ? o.colors[0] : CHART_RED, -1], [b, o.colors ? o.colors[1] : CHART_GREY, 1]].forEach(function (pair) {
      var s = pair[0], col = pair[1], side = pair[2];
      var v = s.values[i][1], x = cx + side * (bw / 2 + 2) - bw / 2;
      bars += '<rect x="' + x.toFixed(1) + '" y="' + Y(v).toFixed(1) + '" width="' + bw + '" height="' + (H - padB - Y(v)).toFixed(1) + '" fill="' + col + '"/>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (Y(v) - 6).toFixed(1) + '" font-size="11" font-weight="700" fill="' + CHART_TEXT + '" text-anchor="middle">' + fmtNum(v, o.decimals) + '</text>';
    });
    bars += '<text x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" font-size="11" fill="' + CHART_GREY + '" text-anchor="middle">' + yr + '</text>';
  });
  var legend = '<g font-size="12" fill="' + CHART_TEXT + '">' +
    '<rect x="' + padL + '" y="4" width="12" height="12" fill="' + (o.colors ? o.colors[0] : CHART_RED) + '"/><text x="' + (padL + 17) + '" y="14">' + esc(o.labels ? o.labels[0] : a.name) + '</text>' +
    '<rect x="' + (padL + 210) + '" y="4" width="12" height="12" fill="' + (o.colors ? o.colors[1] : CHART_GREY) + '"/><text x="' + (padL + 227) + '" y="14">' + esc(o.labels ? o.labels[1] : b.name) + '</text></g>';
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Comparison chart" style="width:100%;height:auto;display:block">' +
    grid +
    '<line x1="' + padL + '" y1="' + (H - padB) + '" x2="' + (W - padR) + '" y2="' + (H - padB) + '" stroke="#9fb0bf" stroke-width="1"/>' +
    bars + legend + '</svg>';
}

// Horizontal bars for category rows: [[label, value], ...]. The value is
// printed at the end of each bar; the longest label sets the label column.
function hbarChart(rows, opts) {
  var o = opts || {};
  var W = 640, rowH = o.rowHeight || 44, padL = 8, padR = 76, labelW = o.labelWidth || 190, padT = 8;
  var H = padT + rows.length * rowH + 14;
  var hi = Math.max.apply(null, rows.map(function (r) { return r[1]; })) * 1.08;
  var bars = rows.map(function (r, i) {
    var y = padT + i * rowH, bw = (r[1] / hi) * (W - padL - labelW - padR);
    return '<text x="' + padL + '" y="' + (y + 21) + '" font-size="13" fill="' + CHART_TEXT + '">' + esc(r[0]) + '</text>' +
      '<rect x="' + (padL + labelW) + '" y="' + (y + 6) + '" width="' + bw.toFixed(1) + '" height="22" fill="' + (o.color || CHART_RED) + '"/>' +
      '<text x="' + (padL + labelW + bw + 8).toFixed(1) + '" y="' + (y + 22) + '" font-size="13" font-weight="700" fill="' + CHART_TEXT + '">' + fmtNum(r[1], o.decimals) + '</text>';
  }).join("");
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Bar chart" style="width:100%;height:auto;display:block">' + bars + '</svg>';
}

// A chart with a Chart | Table switch. The two renderings are kept in the
// page-wide panel registry (window.__chartPanels) so the toggle buttons only
// swap content; main.js owns the click handling.
function chartPanel(id, chartHtml, tableHtml, title) {
  window.__chartPanels = window.__chartPanels || {};
  window.__chartPanels[id] = { chart: chartHtml, table: tableHtml };
  return '<div class="chart-panel" role="group" aria-label="' + esc(title) + '">' +
    '<div class="chart-toggle"><button type="button" data-panel="' + id + '" data-view="chart" class="on" aria-pressed="true">Chart</button>' +
    '<button type="button" data-panel="' + id + '" data-view="table" aria-pressed="false">Table</button></div>' +
    '<div class="chart-body" id="panel-' + id + '">' + chartHtml + '</div></div>';
}

// A plain table of an indicator's observations, for the chart/table switch.
function valueTable(entry) {
  var rows = entry.values.map(function (p) {
    return '<tr><th scope="row">' + esc(p[0]) + '</th><td>' + fmtValue(p[1]) + '</td></tr>';
  }).join("");
  return '<table class="values"><caption>' + esc(entry.name) + ' — ' + esc(entry.unit) + '</caption>' +
    '<thead><tr><th scope="col">Period</th><th scope="col">Value</th></tr></thead><tbody>' + rows + '</tbody></table>';
}
