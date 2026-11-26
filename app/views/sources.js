// Singapore in Numbers — sources and method.
//
// Every figure on the site traces to one record here. The method is short
// on purpose: take the published observations for each indicator, quote
// them with their year and population, and never fill a gap with an
// estimate.

function renderSources() {
  var items = SOURCES.map(function (s, i) {
    var usedBy = SERIES.filter(function (x) { return x.source === i; }).length;
    return '<article class="source-item" id="source-' + i + '"><h2>' + esc(s.agency) + '</h2>' +
      '<p><strong>' + esc(s.title) + '</strong></p><p>' + esc(s.detail) + '</p>' +
      (s.url ? '<p>Original: <span class="url-text">' + esc(s.url) + '</span> <button type="button" class="copy-btn" data-copy="' + esc(s.url) + '">Copy link</button></p>'
        : '<p>No verified original address is listed for this source; it is cited by agency and publication.</p>') +
      '<p class="source">Retrieved ' + esc(s.retrieved) + ' · Cited by ' + usedBy + ' indicator' + (usedBy === 1 ? "" : "s") + ' on this site.</p></article>';
  }).join("");
  return '<p class="crumb"><a href="#/">&larr; Overview</a></p>' +
    '<h1>Sources &amp; method</h1>' +
    '<p class="lede">Every figure on this site comes from a published official source. Nothing here is estimated by this site, and no figure is shown without its year. Figures are selected published observations, so years differ between indicators.</p>' +
    '<section><h2>Method</h2><ul class="method">' +
    '<li>Each indicator takes the published observations for its series; years therefore differ between indicators.</li>' +
    '<li>Values are quoted exactly as published, with the unit and the population they describe (total population, residents, citizens, or resident households).</li>' +
    '<li>Charts join published observations in time order; the line between two observations does not invent values for the years between them.</li>' +
    '<li>Where a source revises a figure, the latest vintage is used and the older one is named — GDP growth for 2024 was first published as 4.4% and later revised to 5.3%, which is the figure used here.</li>' +
    '<li>Changes are calculated before display rounding; a rise from 12.4% to 19.5% is 7.1 percentage points.</li>' +
    '<li>Figures are checked against the source row before they are published here; where two sources disagree, the originating agency wins.</li>' +
    '</ul></section>' +
    '<section><h2>Sources</h2>' + items + '</section>';
}
