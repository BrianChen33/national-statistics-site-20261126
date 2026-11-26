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
    detail: "Annual report on population size, age structure, households and housing. Total population 6.21 million at end-June 2026 (6.11 million in 2025); residents 65+ at 19.5% of residents in 2026, from 18.8% in 2025 and 12.4% in 2016; resident total fertility rate 0.87 in 2025, from 0.97 in 2024; median age 43.6 years in 2026, 43.2 in 2025.",
    url: "https://www.singstat.gov.sg/publication-resources/population-trends-2026",
    retrieved: "26 November 2026"
  },
  {
    agency: "APEC Policy Support Unit",
    title: "Explore by Economy: Singapore",
    detail: "APEC Stats economy page, drawing on the Department of Statistics Singapore, the IMF and the World Bank. Carries the 2020–2024 series for trade in goods and services. The address is APEC's staging host for the same table.",
    url: "https://statistics-stg.apec.org/explore-by-economy?economy=SGPX",
    retrieved: "26 November 2026"
  },
  {
    agency: "Federal Statistical Office of Germany (Destatis)",
    title: "International statistics: Basic indicators — Singapore",
    detail: "Country table compiled from international sources, as at 19 November 2025. Carries the 2024 headline figures for labour, health, education, connectivity and emissions.",
    url: "https://www.destatis.de/EN/Themes/Countries-Regions/International-Statistics/Country/Asia/SG.html?nn=21896",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "Key Household Income Trends, 2024",
    detail: "Annual release on resident household income from work, 2024 release vintage. Median monthly household income from work S$11,297 in 2024; average by dwelling type; Gini 0.435 before transfers and taxes, 0.364 after. Reported by Channel News Asia on 13 February 2025.",
    url: "https://www.channelnewsasia.com/singapore/median-monthly-household-income-real-after-inflation-household-singstat-4934851",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "General Household Survey 2025",
    detail: "Mid-decade national survey of the resident population and households, published 30 June 2026. Home ownership 91.2% in 2025 (from 87.9% in 2020); residents aged 25 and over with post-secondary or higher qualifications 64.8% (from 58.3%), excluding full-time students. Data for 2025 are preliminary.",
    url: "https://www.singstat.gov.sg/publication-resources/general-household-survey-2025",
    retrieved: "26 November 2026"
  },
  {
    agency: "Department of Statistics Singapore",
    title: "Complete Life Tables for Singapore Resident Population, 2024–2025",
    detail: "Life expectancy at birth for residents was 83.9 years in 2025 (preliminary; men 81.8, women 86.0), up from 83.7 in 2024 (men 81.5, women 85.8) and 83.2 in 2023. Published 3 June 2026.",
    url: "https://www.singstat.gov.sg/publication-resources/complete-life-tables-for-singapore-resident-population-2024-2025",
    retrieved: "26 November 2026"
  },
  {
    agency: "World Bank",
    title: "World Development Indicators",
    detail: "Country series for Singapore, read from the World Bank API and country data page: GDP growth, consumer prices, ILO-modelled unemployment, value-added shares, GDP in current and constant dollars, exports of goods and services as a share of GDP, land area 724.8 km² (surface area 735.6 km²) and population density 8,329 people per km² in 2024.",
    url: "https://data.worldbank.org/?locations=SG-XD",
    retrieved: "26 November 2026"
  },
  {
    agency: "Ministry of Trade and Industry",
    title: "Economic Survey of Singapore 2025",
    detail: "Full-year 2025 growth 5.0%, easing from 5.3% in 2024 (revised from 4.4%; 2023 revised from 1.8% to 1.5%). CPI-All Items rose 0.9% in 2025. Published February 2026.",
    url: "https://isomer-user-content.by.gov.sg/1004/16f78938-9d69-4df0-87a2-c6e6b0376da6/FullReport_AES2025.pdf",
    retrieved: "26 November 2026"
  }
];

// A short citation line for one source record, used under charts and tables.
function citeSource(index) {
  var s = SOURCES[index];
  if (!s) return "";
  return s.agency + " — " + s.title;
}

// The same citation as a link to the source's own record on the sources page.
function citeSourceLink(index) {
  var s = SOURCES[index];
  if (!s) return "";
  return '<a href="#/sources#source-' + index + '">' + esc(citeSource(index)) + '</a>';
}
