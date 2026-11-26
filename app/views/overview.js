// Singapore in Numbers — the overview (home) page.
//
// The first screen has to do four jobs at once: say which country this is,
// lead with one finding a viewer can grasp at thumbnail size, prove breadth
// with a compact strip of indicators, and show the way into every topic.
// The ageing headline does the first two; the indicator strip and the topic
// grid do the rest. Everything on this page is drawn from the catalogue:
// the indicator strip reads the latest observation of each series, so a
// correction in the catalogue reaches the home page too.

function renderOverview() {
  var ageing = seriesById("residents-65-plus");

  // The indicator strip: latest observation of four headline series, with
  // the basis each figure needs (end-June for the population count, ILO
  // modelled for the unemployment rate) printed under it.
  var kpis = [
    { id: "population-total", basis: "end-June", value: function (s, last) { return fmtValue(last[1] / 1000, 2) + " million"; } },
    { id: "gdp-growth", basis: "% on a year earlier", value: function (s, last) { return "+" + fmtValue(last[1], 1) + "%"; } },
    { id: "cpi-inflation", basis: "% on a year earlier", value: function (s, last) { return fmtValue(last[1], 1) + "%"; } },
    { id: "unemployment", basis: "% of labour force, ILO modelled", value: function (s, last) { return fmtValue(last[1], 1) + "%"; } }
  ].map(function (row) {
    var s = seriesById(row.id), last = latestOf(s);
    return '<a class="kpi" href="#/topic/' + s.topic + '">' +
      '<span class="kpi-value">' + esc(row.value(s, last)) + '</span>' +
      '<span class="kpi-name">' + esc(s.name) + '</span>' +
      '<span class="kpi-year">' + last[0] + ' · ' + esc(row.basis) + '</span></a>';
  }).join("");

  var ageChart = lineChart(ageing, { decimals: 1, ymin: 0, height: 170, label: "Residents aged 65 years and over, % of resident population" });
  var agePanel = chartPanel("home-ageing", ageChart, valueTable(ageing),
    "Residents aged 65 years and over, % of resident population");

  var topics = TOPICS.map(function (t) {
    return '<a class="topic-card" href="#/topic/' + t.slug + '">' +
      '<span class="topic-name">' + esc(t.title) + '</span>' +
      '<span class="topic-blurb">' + esc(t.blurb) + '</span>' +
      '<span class="topic-figure">' + esc(t.headlineText()) + '</span></a>';
  }).join("");

  return '<section class="lead">' +
    '<p class="eyebrow">Singapore · Population Trends 2026, Department of Statistics Singapore</p>' +
    '<h1>Nearly 1 in 5 residents is 65 or older</h1>' +
    '<p class="lede">The share of residents aged 65 and over rose from 12.4% in 2016 to 19.5% in 2026 — up 7.1 percentage points in a decade. Singapore is now a super-aged society: among citizens the share reached 21.4% in 2026.</p>' +
    agePanel +
    '<p class="source">Source: ' + citeSourceLink(ageing.source) + '. Selected published observations; no value is shown for a year the source does not publish.</p></section>' +
    '<section class="kpis" aria-label="Key indicators">' + kpis + '</section>' +
    '<section><h2>Explore the topics</h2><div class="topic-grid">' + topics + '</div></section>' +
    '<section class="about-note"><h2>About this site</h2>' +
    '<p>Singapore in Numbers is an independent reader of published official statistics. Every figure names its source and its year; nothing here is estimated by this site. Figures are selected published observations, so years differ between indicators. <a href="#/sources">See the sources and method</a>.</p></section>';
}
