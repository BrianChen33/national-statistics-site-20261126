// Singapore in Numbers — the eight topic pages.
//
// Each topic answers three questions in order: what is the figure, how has
// it changed, and where can it be checked. A topic has one headline
// observation, one principal chart (with a table behind the same switch),
// a row of supporting figures, and a citation. Charts are built from the
// indicator catalogue only; no topic invents a number, and the headline
// line is built from the same series it names, so a correction in the
// catalogue reaches the headline too.

var TOPICS = [
  {
    slug: "population",
    title: "Population",
    blurb: "How many people live here, how old they are, and how households are changing.",
    headline: "residents-65-plus",
    headlineText: function () {
      var s = seriesById("residents-65-plus"), first = firstOf(s), last = latestOf(s);
      return "Nearly 1 in 5 residents was 65 or older in " + last[0] + " — " + fmtValue(last[1], 1) + "%, up from " + fmtValue(first[1], 1) + "% in " + first[0] + ".";
    },
    stats: ["population-total", "median-age", "fertility-rate", "ethnic-chinese"],
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
    headlineText: function () {
      var s = seriesById("gdp-growth"), last = latestOf(s), prev = s.values[s.values.length - 2];
      return "Real GDP grew " + fmtValue(last[1], 1) + "% in " + last[0] + ", easing from " + fmtValue(prev[1], 1) + "% in " + prev[0] + ".";
    },
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
    headlineText: function () {
      var s = seriesById("unemployment"), last = latestOf(s);
      return "Unemployment was " + fmtValue(last[1], 1) + "% of the labour force in " + last[0] + " (ILO modelled), down from 4.6% in 2021.";
    },
    stats: ["labour-force", "labour-participation", "youth-unemployment", "household-income"],
    chart: function () {
      var s = seriesById("unemployment");
      return { title: "Unemployment rate, % of total labour force (ILO modelled)", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    }
  },
  {
    slug: "prices",
    title: "Prices",
    blurb: "What things cost, and how fast prices are rising.",
    headline: "cpi-inflation",
    headlineText: function () {
      var s = seriesById("cpi-inflation"), last = latestOf(s);
      return "Consumer prices rose " + fmtValue(last[1], 1) + "% in " + last[0] + " — down from 6.1% in 2022.";
    },
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
    headlineText: function () {
      var ex = seriesById("exports-goods"), im = seriesById("imports-goods"), lx = latestOf(ex), li = latestOf(im);
      return "Singapore exported US$" + fmtValue(lx[1], 1) + "bn of goods in " + lx[0] + " and imported US$" + fmtValue(li[1], 1) + "bn.";
    },
    stats: ["exports-goods", "imports-goods", "exports-services", "imports-services"],
    chart: function () {
      var ex = seriesById("exports-goods"), im = seriesById("imports-goods");
      var chart = groupBarChart(ex, im, { decimals: 1, labels: ["Merchandise exports", "Merchandise imports"], label: "Merchandise trade, US$ billion" });
      var rows = "<table class=\"values\"><caption>Merchandise trade, US$ billion</caption><thead><tr><th scope=\"col\">Year</th><th scope=\"col\">Exports</th><th scope=\"col\">Imports</th></tr></thead><tbody>" +
        ex.values.map(function (p, i) { return "<tr><th scope=\"row\">" + p[0] + "</th><td>" + fmtValue(p[1], 1) + "</td><td>" + fmtValue(im.values[i][1], 1) + "</td></tr>"; }).join("") + "</tbody></table>";
      return { title: "Merchandise trade, US$ billion", chart: chart, table: rows, source: ex.source };
    },
    extra: function () {
      var rows = ["exports-goods", "imports-goods", "exports-services", "imports-services"].map(function (id) {
        var s = seriesById(id), last = latestOf(s);
        return [s.name.replace("Merchandise ", "").replace("Commercial services ", "Services "), last[1]];
      });
      var yr = latestOf(seriesById("exports-goods"))[0];
      return "<h2>Goods and services, " + yr + "</h2><p>Merchandise exports already include re-exports — goods imported and then exported again. Services are shown separately.</p>" +
        hbarChart(rows, { decimals: 1, label: "Goods and services trade, US$ billion, " + yr }) +
        "<p class=\"source\">US$ billion. Source: " + citeSourceLink(1) + ".</p>";
    }
  },
  {
    slug: "housing",
    title: "Housing",
    blurb: "Where people live, what households earn, and who owns their home.",
    headline: "hdb-share",
    headlineText: function () {
      var s = seriesById("hdb-share"), last = latestOf(s);
      return "About 3 in 4 residents — " + fmtValue(last[1], 2) + " million people — live in HDB flats (end-June " + last[0] + ").";
    },
    stats: ["home-ownership", "household-income", "gini", "hdb-share"],
    chart: function () {
      var s = seriesById("income-by-dwelling");
      var chart = hbarChart(s.values, { decimals: 0, label: "Average monthly household income from work by dwelling type, S$ per month, 2024" });
      return {
        title: "Average monthly household income from work by dwelling type, S$ per month, 2024",
        sub: "Resident employed households; income from work includes employer CPF contributions.",
        chart: chart, table: valueTable(s), source: s.source
      };
    }
  },
  {
    slug: "health-education",
    title: "Health & Education",
    blurb: "How long people live, how healthy they are, and how far schooling reaches.",
    headline: "life-expectancy",
    headlineText: function () {
      var s = seriesById("life-expectancy"), last = latestOf(s);
      return "Life expectancy at birth for residents was " + fmtValue(last[1], 1) + " years in " + last[0] + " (preliminary).";
    },
    stats: ["life-expectancy", "infant-mortality", "physicians", "post-secondary", "education-spending"],
    chart: function () {
      var s = seriesById("life-expectancy");
      return { title: "Life expectancy at birth, residents, years", chart: lineChart(s, { decimals: 1 }), table: valueTable(s), source: s.source };
    },
    extra: function () {
      var s = seriesById("post-secondary");
      var rows = s.values.slice().reverse().map(function (p) { return [String(p[0]), p[1]]; });
      return "<h2>Schooling keeps rising</h2><p>Residents aged 25 and over with post-secondary or higher qualifications, %.</p>" +
        hbarChart(rows, { decimals: 1, label: "Residents with post-secondary or higher qualifications, %" }) +
        "<p class=\"source\">Source: " + citeSourceLink(s.source) + ". Excludes full-time students.</p>";
    }
  },
  {
    slug: "environment",
    title: "Environment & Digital",
    blurb: "Emissions, land, and how connected everyday life is.",
    headline: "co2-per-capita",
    headlineText: function () {
      var s = seriesById("co2-per-capita"), last = latestOf(s);
      return "CO2 emissions were " + fmtValue(last[1], 2) + " tonnes per person in " + last[0] + ".";
    },
    stats: ["co2-per-capita", "land-area", "internet-users"],
    chart: function () {
      var ids = ["internet-users", "mobile-subscriptions", "fixed-broadband"];
      var rows = ids.map(function (id) {
        var s = seriesById(id), last = latestOf(s);
        return [s.name, last[1]];
      });
      var yr = latestOf(seriesById("internet-users"))[0];
      var chart = hbarChart(rows, { decimals: 1, label: "Connectivity, per 100 people, " + yr });
      var table = "<table class=\"values\"><caption>Connectivity, per 100 people, " + yr + "</caption><thead><tr><th scope=\"col\">Measure</th><th scope=\"col\">" + yr + "</th></tr></thead><tbody>" +
        rows.map(function (r) { return "<tr><th scope=\"row\">" + esc(r[0]) + "</th><td>" + fmtValue(r[1], 1) + "</td></tr>"; }).join("") + "</tbody></table>";
      return { title: "Connectivity, per 100 people, " + yr, chart: chart, table: table, source: 2 };
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
    '<span class="stat-value">' + esc(fmtAmount(entry, last[1])) + '</span>' +
    '<span class="stat-name">' + esc(entry.name) + '</span>' +
    '<span class="stat-year">' + last[0] + ' · ' + esc(entry.unit) + '</span></a>';
}

// The topic index: all eight topics, one click from anywhere.
function renderTopicsIndex() {
  var cards = TOPICS.map(function (t) {
    return '<a class="topic-card" href="#/topic/' + t.slug + '">' +
      '<span class="topic-name">' + esc(t.title) + '</span>' +
      '<span class="topic-blurb">' + esc(t.blurb) + '</span>' +
      '<span class="topic-figure">' + esc(t.headlineText()) + '</span></a>';
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
    '<section class="lead"><p class="lead-text">' + esc(t.headlineText()) + '</p>' +
    '<h2>' + esc(c.title) + '</h2>' + (c.sub ? '<p class="chart-sub">' + esc(c.sub) + '</p>' : "") + chartPanel("topic-" + t.slug, c.chart, c.table, c.title) +
    '<p class="source">Source: ' + citeSourceLink(c.source === undefined ? h.source : c.source) + '. <a href="#/sources">All sources</a></p></section>' +
    (extra ? '<section class="extra">' + extra + '</section>' : "") +
    '<h2>Key figures</h2><div class="stat-grid">' + stats + '</div>' +
    '<p class="note">' + esc(h.note) + '</p>';
}
