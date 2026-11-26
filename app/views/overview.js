// Singapore in Numbers — the overview (home) page.
//
// The first screen has to do four jobs at once: say which country this is,
// lead with one finding a viewer can grasp at thumbnail size, prove breadth
// with a compact strip of indicators, and show the way into every topic.
// The ageing headline does the first two; the indicator strip and the topic
// grid do the rest. Everything on this page is drawn from the catalogue.

function renderOverview() {
  var ageing = seriesById("residents-65-plus");
  var kpis = [
    ["population-2026", "Total population", "6.21 million", "end-June 2026"],
    ["gdp-growth", "Real GDP growth", "+4.4%", "2024, % on a year earlier"],
    ["cpi-inflation", "Consumer price inflation", "2.4%", "2024, % on a year earlier"],
    ["unemployment", "Unemployment rate", "3.2%", "2024, % of labour force"]
  ].map(function (row) {
    var s = seriesById(row[0]);
    return '<a class="kpi" href="#/topic/' + s.topic + '">' +
      '<span class="kpi-value">' + row[2] + '</span>' +
      '<span class="kpi-name">' + esc(row[1]) + '</span>' +
      '<span class="kpi-year">' + esc(row[3]) + '</span></a>';
  }).join("");

  var ageChart = lineChart(ageing, { decimals: 1, ymin: 0, height: 190 });
  var agePanel = chartPanel("home-ageing", ageChart, valueTable(ageing),
    "Residents aged 65 years and over, % of resident population");

  var pop = seriesById("population-total");
  var popPanel = chartPanel("home-population", lineChart(pop, { decimals: 1 }),
    valueTable(pop), "Total population, thousand people");

  var topics = TOPICS.map(function (t) {
    return '<a class="topic-card" href="#/topic/' + t.slug + '">' +
      '<span class="topic-name">' + esc(t.title) + '</span>' +
      '<span class="topic-blurb">' + esc(t.blurb) + '</span>' +
      '<span class="topic-figure">' + esc(t.headlineText) + '</span></a>';
  }).join("");

  return '<section class="lead">' +
    '<p class="eyebrow">Singapore · Population Trends 2026, Department of Statistics Singapore</p>' +
    '<h1>Nearly 1 in 5 residents is 65 or older</h1>' +
    '<p class="lede">The share of residents aged 65 and over rose from 12.4% in 2016 to 19.5% in 2026 — up 7.1 percentage points in a decade. Singapore is now a super-aged society: among citizens the share reached 21.4% in 2026.</p>' +
    agePanel +
    '<p class="source">Source: ' + esc(citeSource(ageing.source)) + '. <a href="#/sources">All sources</a></p></section>' +
    '<section class="kpis" aria-label="Key indicators">' + kpis + '</section>' +
    '<section><h2>Total population</h2>' + popPanel +
    '<p class="source">Source: ' + esc(citeSource(pop.source)) + '. The 2021 dip is the pandemic outflow; the population passed 6 million in 2024 and reached 6.21 million at end-June 2026.</p></section>' +
    '<section><h2>Explore the topics</h2><div class="topic-grid">' + topics + '</div></section>' +
    '<section class="about-note"><h2>About this site</h2>' +
    '<p>Singapore in Numbers is an independent reader of published official statistics. Every figure names its source and its year; nothing here is estimated by this site. Figures are the latest published for each indicator, so years differ between indicators. <a href="#/sources">See the sources and method</a>.</p></section>';
}
