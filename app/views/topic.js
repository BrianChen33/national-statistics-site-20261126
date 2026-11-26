// Singapore in Numbers — the eight topic pages.
//
// Each topic answers three questions in order: what is the figure, how has
// it changed, and where can it be checked. A topic has one headline
// observation, one principal chart (with a table behind the same switch),
// a row of supporting figures, and a citation. Charts are built from the
// indicator catalogue only; no topic invents a number.

var TOPICS = [
  {
    slug: "population",
    title: "Population",
    blurb: "How many people live here, how old they are, and how households are changing.",
    headline: "residents-65-plus",
    headlineText: "Nearly 1 in 5 residents was 65 or older in 2026 — 19.5%, up from 12.4% in 2016.",
    stats: ["population-2026", "median-age", "fertility-rate", "ethnic-chinese"],
    chart: function () {
      var s = seriesById("population-total");
      return { title: "Total population, thousand people", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "economy",
    title: "Economy",
    blurb: "The size of the economy, how fast it grows, and what it is made of.",
    headline: "gdp-growth",
    headlineText: "Real GDP grew 4.4% in 2024, after 1.8% in 2023.",
    stats: ["gdp-current", "gdp-per-capita", "gdp-constant", "gva-services"],
    chart: function () {
      var s = seriesById("gdp-growth");
      return { title: "Real GDP growth, % on a year earlier", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "labour",
    title: "Labour",
    blurb: "Who works, who is looking for work, and what households earn.",
    headline: "unemployment",
    headlineText: "Unemployment was 3.2% of the labour force in 2024, down from 4.6% in 2021.",
    stats: ["labour-force", "labour-participation", "youth-unemployment", "household-income"],
    chart: function () {
      var s = seriesById("unemployment");
      return { title: "Unemployment rate, % of total labour force", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "prices",
    title: "Prices",
    blurb: "What things cost, and how fast prices are rising.",
    headline: "cpi-inflation",
    headlineText: "Consumer prices rose 2.4% in 2024 — down from 6.1% in 2022.",
    stats: ["cpi-inflation", "household-income", "gini"],
    chart: function () {
      var s = seriesById("cpi-inflation");
      return { title: "Consumer price inflation, % on a year earlier", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "trade",
    title: "Trade",
    blurb: "What Singapore buys and sells — and how much trade matters to an economy this open.",
    headline: "trade-openness",
    headlineText: "Exports of goods and services were worth 178.8% of GDP in 2024.",
    stats: ["exports-goods", "imports-goods", "exports-services", "imports-services"],
    chart: function () {
      var ex = seriesById("exports-goods"), im = seriesById("imports-goods");
      var chart = groupBarChart(ex, im, { decimals: 1, labels: ["Merchandise exports", "Merchandise imports"] });
      var rows = "<table class=\"values\"><caption>Merchandise trade, US$ billion</caption><thead><tr><th scope=\"col\">Year</th><th scope=\"col\">Exports</th><th scope=\"col\">Imports</th></tr></thead><tbody>" +
        ex.values.map(function (p, i) { return "<tr><th scope=\"row\">" + p[0] + "</th><td>" + fmtValue(p[1]) + "</td><td>" + fmtValue(im.values[i][1]) + "</td></tr>"; }).join("") + "</tbody></table>";
      return { title: "Merchandise trade, US$ billion", chart: chart, table: rows, source: ex.source };
    },
    extra: function () {
      var rows = [["Goods exports", 505.7], ["Goods imports", 458.7], ["Services exports", 395.2], ["Services imports", 350.8]];
      return "<h2>Goods and services, 2024</h2><p>Merchandise exports already include re-exports — goods imported and then exported again. Services are shown separately.</p>" +
        hbarChart(rows, { decimals: 1, labelWidth: 150 }) +
        "<p class=\"source\">US$ billion. Source: " + esc(citeSource(1)) + ".</p>";
    }
  },
  {
    slug: "housing",
    title: "Housing",
    blurb: "Where people live, what households earn, and who owns their home.",
    headline: "hdb-share",
    headlineText: "About 3 in 4 residents — 3.20 million people — live in HDB flats.",
    stats: ["home-ownership", "household-income", "gini", "hdb-share"],
    chart: function () {
      var s = seriesById("income-by-dwelling");
      var chart = hbarChart(s.values, { decimals: 0, labelWidth: 215 });
      return { title: "Average monthly household income from work by dwelling type, S$, 2024", chart: chart, table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "health-education",
    title: "Health & Education",
    blurb: "How long people live, how healthy they are, and how far schooling reaches.",
    headline: "life-expectancy",
    headlineText: "Life expectancy at birth for residents was 83.5 years in 2024.",
    stats: ["life-expectancy", "infant-mortality", "physicians", "post-secondary", "education-spending"],
    chart: function () {
      var chart = hbarChart([["Women", 85.6], ["Men", 81.2]], { decimals: 1, labelWidth: 80 });
      var table = "<table class=\"values\"><caption>Life expectancy at birth, residents, years</caption><thead><tr><th scope=\"col\">Group</th><th scope=\"col\">2024</th></tr></thead><tbody><tr><th scope=\"row\">All residents</th><td>83.5</td></tr><tr><th scope=\"row\">Men</th><td>81.2</td></tr><tr><th scope=\"row\">Women</th><td>85.6</td></tr></tbody></table>";
      return { title: "Life expectancy at birth, residents, years, 2024", chart: chart, table: table, source: 5 };
    },
    extra: function () {
      var chart = hbarChart([["2025", 64.8], ["2020", 58.3]], { decimals: 1, labelWidth: 60 });
      return "<h2>Schooling keeps rising</h2><p>Residents aged 25 and over with post-secondary or higher qualifications, %.</p>" +
        chart +
        "<p class=\"source\">Source: " + esc(citeSource(4)) + ".</p>";
    }
  },
  {
    slug: "environment",
    title: "Environment & Digital",
    blurb: "Emissions, land, and how connected everyday life is.",
    headline: "co2-per-capita",
    headlineText: "CO2 emissions were 9.62 tonnes per person in 2024.",
    stats: ["co2-per-capita", "land-area", "internet-users"],
    chart: function () {
      var chart = hbarChart([["Internet users", 94.4], ["Mobile subscriptions", 170.8], ["Fixed broadband", 27.8]], { decimals: 1, labelWidth: 170 });
      var table = "<table class=\"values\"><caption>Connectivity, per 100 people, 2024</caption><thead><tr><th scope=\"col\">Measure</th><th scope=\"col\">2024</th></tr></thead><tbody><tr><th scope=\"row\">Internet users</th><td>94.4</td></tr><tr><th scope=\"row\">Mobile cellular subscriptions</th><td>170.8</td></tr><tr><th scope=\"row\">Fixed broadband subscriptions</th><td>27.8</td></tr></tbody></table>";
      return { title: "Connectivity, per 100 people, 2024", chart: chart, table: table, source: 2 };
    }
  }
];

function topicBySlug(slug) {
  return TOPICS.find(function (t) { return t.slug === slug; });
}

// One supporting-figure card: big latest value, name, unit and year.
function statCard(entry) {
  var last = latestOf(entry);
  return '<a class="stat-card" href="#/explorer/' + entry.id + '">' +
    '<span class="stat-value">' + fmtValue(last[1]) + ' <span class="stat-unit">' + esc(entry.shortUnit) + '</span></span>' +
    '<span class="stat-name">' + esc(entry.name) + '</span>' +
    '<span class="stat-year">' + last[0] + ' · ' + esc(entry.unit) + '</span></a>';
}

// The topic index: all eight topics, one click from anywhere.
function renderTopicsIndex() {
  var cards = TOPICS.map(function (t) {
    var h = seriesById(t.headline), last = latestOf(h);
    return '<a class="topic-card" href="#/topic/' + t.slug + '">' +
      '<span class="topic-name">' + esc(t.title) + '</span>' +
      '<span class="topic-blurb">' + esc(t.blurb) + '</span>' +
      '<span class="topic-figure">' + esc(t.headlineText) + '</span></a>';
  }).join("");
  return '<p class="crumb"><a href="#/">&larr; Overview</a></p>' +
    '<h1>Topics</h1><p class="lede">Eight topics cover the country. Each page leads with one finding, shows the series behind it, and names its source.</p>' +
    '<div class="topic-grid">' + cards + '</div>';
}

// One topic page.
function renderTopic(slug) {
  var t = topicBySlug(slug);
  if (!t) {
    return '<h1>Topic not found</h1><p>There is no topic at this address. <a href="#/topics">See all topics</a>.</p>';
  }
  var h = seriesById(t.headline);
  var c = t.chart();
  var stats = t.stats.map(function (id) { return statCard(seriesById(id)); }).join("");
  var extra = t.extra ? t.extra() : "";
  return '<p class="crumb"><a href="#/topics">&larr; All topics</a></p>' +
    '<h1>' + esc(t.title) + '</h1><p class="lede">' + esc(t.blurb) + '</p>' +
    '<section class="lead"><p class="lead-text">' + esc(t.headlineText) + '</p>' +
    '<h2>' + esc(c.title) + '</h2>' + chartPanel("topic-" + t.slug, c.chart, c.table, c.title) +
    '<p class="source">Source: ' + esc(citeSource(c.source === undefined ? h.source : c.source)) + '. <a href="#/sources">All sources</a></p></section>' +
    (extra ? '<section class="extra">' + extra + '</section>' : "") +
    '<h2>Key figures</h2><div class="stat-grid">' + stats + '</div>' +
    '<p class="note">' + esc(h.note) + '</p>';
}
