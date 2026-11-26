// Singapore in Numbers — the indicator catalogue.
//
// Every figure on this site comes from one entry here: a short id, the exact
// wording the site shows, the unit, the observations, and the source it was
// taken from (an index into SOURCES in data/sources.js). Charts, cards and
// tables all read from this one list, so the same value, period and wording
// follow an indicator from the home page into its chart and its table.
//
// Years are the observation years. "latest" is the most recent observation
// in values. Where a source publishes only some years, the chart joins the
// published observations in time order on a true time axis; no value is
// invented for a year the source does not publish. Single-figure
// indicators carry one observation. A series marked categories: true has
// one observation year and a value per category, not a value per year.

const SERIES = [
  {
    id: "population-total",
    name: "Total population",
    topic: "population",
    unit: "thousand people",
    shortUnit: "thousand",
    values: [[2020, 5685.8], [2021, 5453.6], [2022, 5637.0], [2023, 5917.6], [2024, 6036.9], [2025, 6111.2], [2026, 6208.5]],
    source: 0,
    note: "Mid-year (end-June) total population. The 2021 dip reflects the fall in the non-resident population during the pandemic; the population passed 6 million in 2024 and reached 6.21 million at end-June 2026."
  },
  {
    id: "residents-65-plus",
    name: "Residents aged 65 years and over",
    topic: "population",
    unit: "% of resident population",
    shortUnit: "%",
    values: [[2016, 12.4], [2020, 15.2], [2022, 16.6], [2023, 17.3], [2024, 18.0], [2025, 18.8], [2026, 19.5]],
    source: 0,
    note: "Selected published observations; no value is shown for a year the source does not publish. Nearly 1 in 5 residents was 65 or older in 2026, up 7.1 percentage points in a decade. Among citizens the share was 21.4% in 2026, making Singapore a super-aged society."
  },
  {
    id: "median-age",
    name: "Median age of the resident population",
    topic: "population",
    unit: "years",
    shortUnit: "years",
    values: [[2020, 41.5], [2025, 43.2], [2026, 43.6]],
    source: 0,
    note: "The median age of citizens was 44.1 years in June 2026."
  },
  {
    id: "fertility-rate",
    name: "Resident total fertility rate",
    topic: "population",
    unit: "births per woman",
    shortUnit: "births/woman",
    values: [[2023, 0.97], [2024, 0.97], [2025, 0.87]],
    source: 0,
    note: "Resident total fertility rate — births per woman among residents. It has been below the replacement level of 2.1 since 1977. The 2025 figure, 0.87, is the lowest on record."
  },
  {
    id: "gdp-growth",
    name: "Real GDP growth",
    topic: "economy",
    unit: "% change on a year earlier",
    shortUnit: "%",
    values: [[2020, -3.6], [2021, 10.1], [2022, 4.0], [2023, 1.5], [2024, 5.3], [2025, 5.0]],
    source: 6,
    note: "Annual change in GDP at constant prices (World Bank). The 2024 figure was revised up from 4.4% to 5.3% and 2023 down from 1.8% to 1.5% in the Economic Survey of Singapore 2025. The 2020 fall is the pandemic contraction; 2021 is the rebound."
  },
  {
    id: "gdp-current",
    name: "GDP at current market prices",
    topic: "economy",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2024, 572.9], [2025, 603.9]],
    source: 6,
    note: "Nominal GDP in current US dollars (World Bank)."
  },
  {
    id: "gdp-per-capita",
    name: "GDP per capita at current prices",
    topic: "economy",
    unit: "US$",
    shortUnit: "US$",
    values: [[2024, 94897], [2025, 98814]],
    source: 6,
    note: "Nominal GDP divided by the total population (World Bank)."
  },
  {
    id: "gdp-constant",
    name: "GDP in constant 2015 US dollars",
    topic: "economy",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2020, 335.9], [2021, 370.0], [2022, 384.8], [2023, 390.4], [2024, 411.3], [2025, 432.0]],
    source: 6,
    note: "GDP in constant 2015 prices, for comparing the size of the economy across years (World Bank)."
  },
  {
    id: "gva-services",
    name: "Services value added, % of GDP",
    topic: "economy",
    unit: "% of GDP",
    shortUnit: "%",
    decimals: 1,
    values: [[2020, 72.2], [2021, 70.3], [2022, 71.6], [2023, 72.8], [2024, 73.1], [2025, 71.6]],
    source: 6,
    note: "Services value added as a share of GDP (World Bank). Industry was 21.5% and agriculture 0.03% in 2024."
  },
  {
    id: "gva-industry",
    name: "Industry value added, % of GDP",
    topic: "economy",
    unit: "% of GDP",
    shortUnit: "%",
    values: [[2020, 23.2], [2021, 24.6], [2022, 23.8], [2023, 22.1], [2024, 21.5], [2025, 22.7]],
    source: 6,
    note: "Industry value added as a share of GDP (World Bank), including manufacturing. Services were 73.1% in 2024."
  },
  {
    id: "unemployment",
    name: "Unemployment rate (ILO modelled)",
    topic: "labour",
    unit: "% of total labour force (ILO modelled estimate)",
    shortUnit: "%",
    values: [[2020, 4.1], [2021, 4.6], [2022, 3.6], [2023, 3.4], [2024, 2.7], [2025, 2.8]],
    source: 6,
    note: "Share of the total labour force without work but available and seeking it, on the ILO modelled definition (World Bank). The Ministry of Manpower's own annual overall rate was 2.0% in both 2024 and 2025; the two are not the same measure."
  },
  {
    id: "labour-force",
    name: "Labour force",
    topic: "labour",
    unit: "thousand people",
    shortUnit: "thousand",
    values: [[2024, 3596]],
    source: 2,
    note: "People in work plus people seeking work, resident and non-resident together, 2024."
  },
  {
    id: "labour-participation",
    name: "Labour force participation rate",
    topic: "labour",
    unit: "% of people aged 15 and over",
    shortUnit: "%",
    values: [[2024, 69.8]],
    source: 2,
    note: "Share of the population aged 15 and over in the labour force, 2024."
  },
  {
    id: "youth-unemployment",
    name: "Youth unemployment rate (ILO modelled, ages 15–24)",
    topic: "labour",
    unit: "% of the youth labour force (ILO modelled estimate)",
    shortUnit: "%",
    values: [[2020, 10.6], [2021, 9.5], [2022, 7.9], [2023, 8.5], [2024, 6.3], [2025, 6.8]],
    source: 6,
    note: "Unemployed people aged 15 to 24 as a share of the youth labour force, ILO modelled (World Bank)."
  },
  {
    id: "cpi-inflation",
    name: "Consumer price inflation",
    topic: "prices",
    unit: "% change on a year earlier",
    shortUnit: "%",
    values: [[2020, -0.2], [2021, 2.3], [2022, 6.1], [2023, 4.8], [2024, 2.4], [2025, 0.9]],
    source: 6,
    note: "Annual change in the all-items consumer price index (World Bank). Inflation peaked at 6.1% in 2022 and eased to 0.9% in 2025."
  },
  {
    id: "exports-goods",
    name: "Merchandise exports",
    topic: "trade",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2020, 362.5], [2021, 457.4], [2022, 515.8], [2023, 476.3], [2024, 505.7]],
    source: 1,
    note: "Exports of goods, including re-exports. Re-exports are goods imported and then exported again without transformation."
  },
  {
    id: "imports-goods",
    name: "Merchandise imports",
    topic: "trade",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2020, 329.8], [2021, 406.2], [2022, 475.6], [2023, 423.4], [2024, 458.7]],
    source: 1,
    note: "Imports of goods, including goods imported for re-export."
  },
  {
    id: "exports-services",
    name: "Commercial services exports",
    topic: "trade",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2020, 217.1], [2021, 284.4], [2022, 339.3], [2023, 357.9], [2024, 395.2]],
    source: 1,
    note: "Exports of commercial services, 2024: US$395.2 billion."
  },
  {
    id: "imports-services",
    name: "Commercial services imports",
    topic: "trade",
    unit: "US$ billion",
    shortUnit: "US$ bn",
    values: [[2020, 210.0], [2021, 247.3], [2022, 296.5], [2023, 326.0], [2024, 350.8]],
    source: 1,
    note: "Imports of commercial services, 2024: US$350.8 billion."
  },
  {
    id: "trade-openness",
    name: "Exports of goods and services",
    topic: "trade",
    unit: "% of GDP",
    shortUnit: "%",
    values: [[2024, 174.7], [2025, 177.9]],
    source: 6,
    note: "Gross exports of goods and services divided by GDP (World Bank). The ratio alone cannot say how much was re-exported."
  },
  {
    id: "household-income",
    name: "Median monthly household income from work",
    topic: "housing",
    unit: "S$ per month",
    shortUnit: "S$",
    values: [[2024, 11297]],
    source: 3,
    note: "Resident employed households, 2024 release. Up from S$10,869 in 2023 (+1.4% in real terms). Per household member the median was S$3,615."
  },
  {
    id: "income-by-dwelling",
    name: "Average monthly household income from work, by dwelling type",
    topic: "housing",
    unit: "S$ per month",
    shortUnit: "S$",
    values: [["1- & 2-room HDB flat", 4084], ["3-room HDB flat", 8094], ["4-room HDB flat", 11676], ["5-room & executive HDB flat", 15180], ["Condominiums & apartments", 23366], ["Landed properties", 30050]],
    source: 3,
    year: 2024,
    note: "Average (not median) monthly household income from work by type of dwelling, 2024, among resident employed households. Income from work includes employer CPF contributions. The overall average was S$14,570.",
    categories: true
  },
  {
    id: "gini",
    name: "Gini coefficient (household income from work)",
    topic: "housing",
    unit: "index, 0 to 1",
    shortUnit: "index",
    values: [[2024, 0.435]],
    source: 3,
    note: "Among resident employed households, per household member, before government transfers and taxes, 2024. After transfers and taxes it was 0.364, the lowest since records began in 2000."
  },
  {
    id: "hdb-share",
    name: "Residents living in HDB flats",
    topic: "housing",
    unit: "million residents",
    shortUnit: "million",
    decimals: 2,
    values: [[2026, 3.20]],
    source: 0,
    note: "An estimated 3.20 million residents, about 3 in 4, lived in Housing & Development Board flats at end-June 2026. 77.2% of resident households lived in HDB flats in 2025."
  },
  {
    id: "home-ownership",
    name: "Home ownership rate",
    topic: "housing",
    unit: "% of resident households",
    shortUnit: "%",
    values: [[2020, 87.9], [2025, 91.2]],
    source: 4,
    note: "Resident households owning their home, 2025, up from 87.9% in 2020 (General Household Survey 2025)."
  },
  {
    id: "life-expectancy",
    name: "Life expectancy at birth, residents",
    topic: "health",
    unit: "years",
    shortUnit: "years",
    values: [[2015, 82.9], [2019, 83.7], [2020, 83.7], [2021, 83.2], [2022, 83.0], [2023, 83.2], [2024, 83.7], [2025, 83.9]],
    source: 5,
    note: "Resident life expectancy at birth (Complete Life Tables 2024–2025). 2025 is preliminary: 83.9 years overall (men 81.8, women 86.0), up from 83.7 in 2024 (men 81.5, women 85.8) and 83.2 in 2023."
  },
  {
    id: "infant-mortality",
    name: "Infant mortality rate",
    topic: "health",
    unit: "deaths per 1,000 live births",
    shortUnit: "per 1,000",
    values: [[2023, 2]],
    source: 2,
    note: "Deaths of infants under one year per 1,000 live births, 2023."
  },
  {
    id: "physicians",
    name: "Physicians",
    topic: "health",
    unit: "per 10,000 people",
    shortUnit: "per 10,000",
    values: [[2022, 28]],
    source: 2,
    note: "Practising physicians per 10,000 people, 2022. Hospital beds were 28 per 10,000 people in 2023."
  },
  {
    id: "post-secondary",
    name: "Residents with post-secondary or higher qualifications",
    topic: "education",
    unit: "% of residents aged 25 and over",
    shortUnit: "%",
    values: [[2020, 58.3], [2025, 64.8]],
    source: 4,
    note: "Residents aged 25 and over with post-secondary or higher qualifications, 2025, up from 58.3% in 2020 (General Household Survey 2025). The figures exclude full-time students."
  },
  {
    id: "education-spending",
    name: "Public expenditure on education",
    topic: "education",
    unit: "% of GDP",
    shortUnit: "%",
    values: [[2024, 2.2]],
    source: 2,
    note: "Government spending on education as a share of GDP, 2024."
  },
  {
    id: "co2-per-capita",
    name: "CO2 emissions per capita",
    topic: "environment",
    unit: "metric tonnes per person",
    shortUnit: "t",
    values: [[2024, 9.62]],
    source: 2,
    note: "Carbon dioxide emissions per person, 2024."
  },
  {
    id: "land-area",
    name: "Land area",
    topic: "environment",
    unit: "square kilometres",
    shortUnit: "km²",
    values: [[2024, 724.8]],
    source: 6,
    note: "Land area (World Bank indicator AG.LND.TOTL.K2), 2024. Surface area, which includes inland water, was 735.6 km². Population density was 8,329 people per km² of land."
  },
  {
    id: "internet-users",
    name: "Internet users",
    topic: "environment",
    unit: "per 100 people",
    shortUnit: "per 100",
    values: [[2024, 94.4]],
    source: 2,
    note: "People using the internet per 100 people, 2024."
  },
  {
    id: "mobile-subscriptions",
    name: "Mobile cellular subscriptions",
    topic: "environment",
    unit: "per 100 people",
    shortUnit: "per 100",
    values: [[2024, 170.8]],
    source: 2,
    note: "Mobile cellular subscriptions per 100 people, 2024."
  },
  {
    id: "fixed-broadband",
    name: "Fixed broadband subscriptions",
    topic: "environment",
    unit: "per 100 people",
    shortUnit: "per 100",
    values: [[2024, 27.8]],
    source: 2,
    note: "Fixed broadband subscriptions per 100 people, 2024."
  },
  {
    id: "ethnic-chinese",
    name: "Chinese share of the resident population",
    topic: "population",
    unit: "% of residents",
    shortUnit: "%",
    values: [[2026, 73.9]],
    source: 0,
    note: "Ethnic composition of residents, end-June 2026: Chinese 73.9%, Malays 13.5%, Indians 9.0%, Others 3.6%."
  }
];

// Latest observation of a series: [year, value]. For a categorical series
// the year is the observation year and the value is the largest category;
// a third element carries that category's label.
function latestOf(entry) {
  if (entry.categories) {
    var best = entry.values.reduce(function (a, b) { return b[1] > a[1] ? b : a; });
    return [entry.year, best[1], best[0]];
  }
  return entry.values[entry.values.length - 1];
}

// First observation of a series: [year, value].
function firstOf(entry) {
  return entry.values[0];
}

// Look an indicator up by id; returns undefined when there is none.
function seriesById(id) {
  return SERIES.find(function (s) { return s.id === id; });
}

// The topic page a record belongs to: health and education records share
// the combined "health-education" topic page.
function topicSlugFor(entry) {
  return entry.topic === "health" || entry.topic === "education" ? "health-education" : entry.topic;
}

function topicMatches(entry, slug) {
  return slug === "health-education"
    ? (entry.topic === "health" || entry.topic === "education")
    : entry.topic === slug;
}

// All indicators of one topic, in catalogue order.
function seriesOfTopic(topic) {
  return SERIES.filter(function (s) { return topicMatches(s, topic); });
}
