// Singapore in Numbers — the source records.
//
// One record per source the indicator catalogue cites, in the order the
// catalogue numbers them. Each record names the originating agency, the exact
// publication or table, and — only where the address was verified — the
// original URL, kept as copyable text. A source with no verified URL is
// cited by agency and publication alone; no address on this site is guessed.

const SOURCES = [
  {
    agency: "Department of Statistics Singapore",
    title: "Population Trends, 2026",
    detail: "Annual report on population size, age structure, households and housing. Total population 6.21 million at end-June 2026; residents 65+ at 19.5% of residents, from 12.4% in 2016.",
    url: "https://www.singstat.gov.sg/publication-resources/population-trends-2026",
    retrieved: "26 November 2026"
  },
  {
    agency: "APEC Policy Support Unit",
    title: "Explore by Economy: Singapore",
    detail: "APEC Stats economy page, drawing on the Department of Statistics Singapore, the IMF and the World Bank. Carries the 2020–2024 series for population, GDP, consumer prices, unemployment, trade in goods and services, and value-added shares.",
    url: "https://statistics-stg.apec.org/explore-by-economy?economy=SGPX",
    retrieved: "26 November 2026"
  },
  {
    agency: "Federal Statistical Office of Germany (Destatis)",
    title: "International statistics: Basic indicators — Singapore",
    detail: "Country table compiled from international sources, as at 19 November 2025. Carries the 2024 headline figures for GDP, GDP per capita, inflation, population, labour, trade, health and education.",
    url: "https://www.destatis.de/EN/Themes/Countries-Regions/International-Statistics/Country/Asia/SG.html?nn=21896",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "Key Household Income Trends, 2024",
    detail: "Annual release on resident household income from work. Median monthly household income from work S$11,297 in 2024; average by dwelling type; Gini 0.435 before transfers and taxes, 0.364 after. Reported by Channel News Asia on 13 February 2025.",
    url: "https://www.channelnewsasia.com/singapore/median-monthly-household-income-real-after-inflation-household-singstat-4934851",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "General Household Survey 2025",
    detail: "Mid-decade national survey of the resident population and households. Home ownership 91.2% in 2025 (from 87.9% in 2020); residents aged 25 and over with post-secondary or higher qualifications 64.8% (from 58.3%).",
    url: "",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "Complete Life Tables for Singapore Resident Population, 2024–2025",
    detail: "Life expectancy at birth for residents was 83.5 years in 2024 (men 81.2, women 85.6), up from 83.2 in 2023 and 82.6 in 2014.",
    url: "https://www.singstat.gov.sg/publication-resources/complete-life-tables-for-singapore-resident-population-2024-2025",
    retrieved: "26 November 2026"
  },
  {
    agency: "World Bank",
    title: "World Development Indicators",
    detail: "Country series for Singapore, as published in the World Bank's Data360 and indicator tables. Land area 736 km² and population density 8,329 people per km² in 2024.",
    url: "",
    retrieved: "26 November 2026"
  }
];

// A short citation line for one source record, used under charts and tables.
function citeSource(index) {
  var s = SOURCES[index];
  if (!s) return "";
  return s.agency + " — " + s.title;
}
