// URL: https://observablehq.com/@bensimonds/calendar-charts
// Title: Calendar Charts
// Author: Ben Simonds (@bensimonds)
// Version: 605
// Runtime version: 1

const m0 = {
  id: "b146984afab14d30@605",
  variables: [
    {
      inputs: ["FileAttachment","md"],
      value: (async function(FileAttachment,md){return(
md`# Calendar Charts

A calendar chart is a flexible way of displaying some kind of time series data binned into intervals (eg. days, weeks, months), using colour to illustrate some other variable. Examples abound, but common cases are calendar heatmaps (like Mike Bostock's [calendar](https://observablehq.com/@d3/calendar) chart) or the GitHub contributions heatmap. 

![image.png](${await FileAttachment("image.png").url()})

Commonly, weeks are represented on the x-axis, and the day of the week on the y-axis. This gives each day a unique cell (which is nice), but we aren't limited to this convention. For example, we could also give each day a unique x-coordinate, and use our y-axis for something else. 

Similarly, we usually see colour used to represent some continuous variable, but we could also use a categorical scale.

In this first example, I've used a few months of some stock market data from 2020 and use the y-axis to show our open, high, low, and close values (this isn't particularly informative, since the differences between them are small, it's just for demonstration).`
)})
    },
    {
      inputs: ["Legend","chart"],
      value: (function(Legend,chart){return(
Legend(chart.scales.c, {title: "Dow Jones Industrial Average"})
)})
    },
    {
      name: "chart",
      inputs: ["dji2","CalendarGrid","d3","width"],
      value: (function(dji2,CalendarGrid,d3,width)
{
  const filteredData = dji2.filter(d => (d.Date.getFullYear() === 2000));
const c = CalendarGrid(filteredData, {
  x: d => d.Date,
  y: d => d.Measure,
  c: d => d.Value,
  xFormat: d3.utcFormat('%d %b %Y'),
  cScale: d3.scaleLinear().range(['blue','yellow']).domain(d3.extent(filteredData.map(d => d.Value))).interpolate(d3.interpolateLab),
  width: 'auto',
  height: 'auto',
  responsive: false
});
  const node = d3.create('div')
    .style('width', width)
    .style('height', 300)
    .style('overflow','auto')
    .node();
  node.appendChild(c);
  return Object.assign(node, c);
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Let's do something with some categorical data. We'll show the days President Trump went golfing during his presidency, using some data from [TrumpGolfCount.com](https://trumpgolfcount.com). In this example I've used the common convention of putting weeks on the x axis and day of the week on the y, which helpfully shows that most of Trump's golfing at least occurred on the weekend.`
)})
    },
    {
      inputs: ["Swatches","chart2"],
      value: (function(Swatches,chart2){return(
Swatches(chart2.scales.c)
)})
    },
    {
      name: "chart2",
      inputs: ["CalendarGrid","trumpGolf","d3","width"],
      value: (function(CalendarGrid,trumpGolf,d3,width)
{
const c = CalendarGrid(trumpGolf, {
  x: d => d3.utcMonday(d.date),
  y: d => ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.date.getUTCDay()],
  yDomain: ["Mon","Tue","Wed","Thu","Fri","Sat", "Sun"],
  c: d => d.category,
  title: d => `${d3.timeFormat('%d %b, %y')(d.date)}: ${d.category}`,
  cFormat: c => c,
  cScale: d3.scaleOrdinal().range(d3.schemeGnBu[4].reverse()).domain(["Yes","Maybe","Probably Not","No"]),
  xUnit: d3.utcMonday,
  width: 'auto',
  height: 'auto',
  responsive: false
});
  const node = d3.create('div')
    .style('width', width)
    .style('height', 300)
    .style('overflow','auto')
    .node();
  node.appendChild(c);
  return Object.assign(node, {scales: c.scales});
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`We can examine longer timespans as well. In the example below, we see the history of armed conflicts by year from the [UCDP/PRIO Armed Conflict Dataset](https://ucdp.uu.se/downloads/index.html#armedconflict). Showing the regions on the y axis lets us compare continents over time (this time with years on the x axis).`
)})
    },
    {
      name: "viewof intensityLevel",
      inputs: ["Inputs"],
      value: (function(Inputs){return(
Inputs.select(["Minor","War"], {label: "Intensity Level"})
)})
    },
    {
      name: "intensityLevel",
      inputs: ["Generators","viewof intensityLevel"],
      value: (G, _) => G.input(_)
    },
    {
      name: "chart3",
      inputs: ["intensityLevel","CalendarGrid","conflictsByRegionYear","d3","width"],
      value: (function(intensityLevel,CalendarGrid,conflictsByRegionYear,d3,width)
{
 function getConflicts(d) {
   return d.conflicts.filter(d => d.intensity_level >= (intensityLevel==='War' ? 2 : 1 ))
 }
const c = CalendarGrid(conflictsByRegionYear, {
  x: d => d.date,
  y: d => d.region,
  c: d => getConflicts(d).length,
  title: d => `${d.year}: ${getConflicts(d).length} - Areas Affected: ${[... new Set(getConflicts(d).map(c => c.location))].join(', ')}`,
  xFormat: d3.utcFormat("%Y"),
  cFormat: c => c,
  cScale: d3.scaleLinear().domain([0, 1, 30]).range(['lightgrey','pink','red']),
  xUnit: d3.utcYear,
  width: 'auto',
  height: 'auto',
  responsive: false,
  margin: {left: 120, right: 10, top:30, bottom: 10},
});
  const node = d3.create('div')
    .style('width', width)
    .style('height', 300)
    .style('overflow','auto')
    .node();
  node.appendChild(c);
  return Object.assign(node, {scales: c.scales});
}
)
    },
    {
      inputs: ["Legend","chart3"],
      value: (function(Legend,chart3){return(
Legend(chart3.scales.c, {title: "# Armed Conflicts"})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Implementation`
)})
    },
    {
      name: "CalendarGrid",
      inputs: ["d3"],
      value: (function(d3){return(
function CalendarGrid(data, {
  // X AXIS
  x = (d) => d,   // Given d in data, returns the (temporal) x-value
  xUnit = d3.utcDay, // Provide a different unit eg. d3.utcMonth, d3.utcDay
  xFormat = d3.utcFormat('%d %b'), // Provide a format function for your dates.
  xScale = undefined, // Provide your own d3.scaleTime based scale for the x axis.
  xDomain = undefined, // Provide your own [start date, end date] for the x axis.
  // Y AXIS
  y = (d) => undefined, // Given d in data, returns the (categorical/ordinal) y-value
  yDomain = undefined, // Provide your own y domain to order categories how you would like. Defaults to the unique values returned by y(),
  // COLOR
  c = (d) => '#000', // Given d in data, returns the value that determines the color of the cell. Assumed to be continuous by default.
  cFormat = d3.format('.3s'), // Provide a formatter for your values for the colors.
  cScale = undefined, // Provide your own d3 scale for colors, could be d3.scaleOrdinal, d3.scaleDiverging, etc.
  // Titles
  title = undefined, // Given d in data, return a title
  // Other Config
  cellSize = 20, // Size of the cells.
  cellPadding = 0.1, // Amount of padding between cells.
  rx = 2, // Rounding radius for cells
  width = 'auto', // Chart width in pixels or 'auto' to have it be determined by the data
  height = 'auto', // Chart height  or 'auto' to have it be determined by the data
  margin = {top: 30, right: 10, bottom: 5, left: 60}, // Standard d3 margin conventions
  responsive = true, // Whether to use the viewbox attribute to constrain the chart to the svg size.
} = {}) {

  // Get our domains for each dimension.
  xDomain = xDomain || d3.extent(data.map(d => x(d)));
  const xUnique = xUnit.range(xDomain[0], d3.timeDay.offset(xDomain[1], 1));
  const yUnique = yDomain || [... new Set(data.map(d => y(d)))];

  // Set up chart width and height.
  const contentSize = {
    x: margin.left + margin.right + cellSize * (xUnique.length + 1),
    y: margin.top + margin.bottom + cellSize * (yUnique.length + 1),
  }
  if (width === 'auto') width = contentSize.x;
  if (height === 'auto') height = contentSize.y;
  const viewBox = responsive ? contentSize : {x: width, y: height};
  const svg = d3.create('svg').attr("viewBox", `0 0 ${viewBox.x} ${viewBox.y}`).attr('width', width).attr('height', height);
  
  if (xScale === undefined) {
    xScale = d3.scaleTime()
      .range([margin.left, margin.left + cellSize * xUnique.length])
      .domain(xDomain)
  }
  
  const yScale = d3.scaleBand()
    .range([margin.top, margin.top + cellSize * yUnique.length])
    .domain(yUnique)
    .round(true)
    .padding(cellPadding);

  if (cScale === undefined) {
    // Assume a symmetric diverging color scale
    const cMax = d3.quantile(data.map(d => c(d)), 0.975, Math.abs);
    cScale = d3.scaleDiverging().domain([-cMax, 0, cMax]).interpolator(d3.interpolatePiYG);
  }
  if (title === undefined) {
    // Title = x, y, value
    title = (d) => `${xFormat(x(d))}, ${y(d)}: ${cFormat(c(d))}`
  }
  
  // Draw our cells
  const cellsGroup = svg.append('g').attr('id','cells');
  cellsGroup.selectAll('g')
    .data(data, d => `${x(d)}-${y(d)}`)
    .join(
      (enter) => {
        const g = enter.append('g');
        const cell = g.append('rect')
          .attr('x', d => xScale(x(d)))
          .attr('y', d => yScale(y(d)))
          .attr('width', yScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .attr('rx', rx)
          .attr('fill', d=> cScale(c(d)))
        cell.append('title').text(title)
        return g;
      }
    )
  // Draw the X axis labels.
  const xLabelGroup = svg.append('g').attr('id','xLabels')
  
  const xLabels = 
    xUnit === d3.utcDay ? d3.utcMonday.range(...xDomain) :   // Mondays for daily data
    xUnit === d3.utcWeek ? d3.utcMonth.range(...xDomain).map(d3.utcMonday) :   // First monday of the month
    xUnit === d3.utcMonday ? d3.utcMonth.range(...xDomain).map(d3.utcMonday) : // First monday of the month
    xUnit === d3.utcMonth ? d3.utcYear.range(...xDomain) : // First monday of the year
    xUnit === d3.utcYear ? d3.utcYear.range(...xDomain, 10) : // First monday of the decade
    d3.utcYear.range(...xDomain);
    
  xLabelGroup.selectAll('g').data(xLabels)
    .join(
      (enter) => {
        const g = enter.append('g')
        g.append('path').attr('d', d => d3.line()([
          [xScale(d) + yScale.step() / 2, margin.top - 2],
          [xScale(d) + yScale.step() / 2, margin.top - 10]]))
          .attr('stroke','black')
          ;
        g.append('text')
          .text(d => xFormat(d))
          .attr('x', d => xScale(d) + (yScale.step() / 2))
          .attr('y', margin.top - 15)
          .attr('alignment-baseline', 'bottom')
          .attr('text-anchor', 'middle')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '0.8rem');
        return g;
      }
    )

  const yLabelGroup  = svg.append('g').attr('id','yLabels');
  yLabelGroup.selectAll('text').data(yUnique).join(
    (enter) => {
      const t = enter.append('text')
        .text(d => d)
        .attr('x', margin.left - 5)
        .attr('y', d => yScale(d) + (yScale.step() / 2))
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'end')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '0.8rem');
      return t;
    }
  )

  return Object.assign(svg.node(), {scales: {x: xScale, y: yScale, c: cScale}});
  
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Appendix`
)})
    },
    {
      inputs: ["ucdpPrioAcd221"],
      value: (function(ucdpPrioAcd221){return(
ucdpPrioAcd221.filter(d => d.intensity_level == 2)
)})
    },
    {
      from: "@d3/color-legend",
      name: "Legend",
      remote: "Legend"
    },
    {
      from: "@d3/color-legend",
      name: "Swatches",
      remote: "Swatches"
    },
    {
      name: "dji2",
      inputs: ["FileAttachment","d3"],
      value: (async function(FileAttachment,d3)
{
  const raw = await FileAttachment("^DJI-2.csv").csv({typed: true})
  // unstack our data into a series of date, measure, value records.
  const dateRange = d3.extent(raw.map(d => d.Date));
  const tidy = [];
  raw.forEach(d => {
    ["Open","High","Low","Close"].forEach(m => {
      tidy.push({Date: d.Date, Measure: m, Value: d[m]})
    })
  });
  
  return tidy;
}
)
    },
    {
      name: "trumpGolf",
      inputs: ["FileAttachment","d3"],
      value: (async function(FileAttachment,d3)
{
  const data = await FileAttachment("trump_golf_outings.json").json();
  const columns = [
    "date",
    "arrival_time",
    "arrival_source",
    "departure_time",
    "departure_source",
    "club",
    "played_golf",
    "played_golf_source",
    "comment",
    ];
  const parseDate = d3.utcParse('%Y-%m-%d');
  const parseTime = d3.utcParse('%Y-%m-%d %H:%M:%S');
  const parsed = data.map(d => {
    const obj = {};
    columns.forEach((c, i) => {
      obj[c] = d[i]
    })
    obj.date = parseDate(obj.date)
    obj.arrival_time = parseTime(obj.arrival_time)
    obj.departure_time = parseTime(obj.departure_time)
    return obj;
  });
  // Turn into something indexed by date. With a value for whether he v
  const golfDays = d3.rollup(
    parsed, 
    v => {
      return {
        category: 
          v.some(e => e.played_golf === "Yes") ? "Yes" :
          v.some(e => e.played_golf === "Maybe") ? "Maybe" :
          v.some(e => e.played_golf === "Probably Not") ? "Probably Not" :
          "No",
        data: v,
      }
    },
    d=> d.date
    )
  // Compile a full index.
  const golfCalendar = [];
  d3.utcDay.range(...d3.extent(parsed.map(d => d.date))).forEach(d => {
    golfCalendar.push({date: d, ... golfDays.get(d) || {'category': "No", data: []}})
  })

  
  return golfCalendar;
  
}
)
    },
    {
      name: "ucdpPrioAcd221",
      inputs: ["FileAttachment"],
      value: (async function(FileAttachment)
{
  const raw = await FileAttachment("ucdp-prio-acd-221.csv").csv({typed: true})
  const regionNames = ["_","Europe","Middle East","Asia","Africa","Americas"]
  return raw.map(d => ({
    ...d,
    regions: d.region.toString().split(',').map(parseInt).map(d => regionNames[d])
  }))
}
)
    },
    {
      name: "conflictsByRegionYear",
      inputs: ["d3","ucdpPrioAcd221"],
      value: (function(d3,ucdpPrioAcd221)
{
  const years = d3.utcYear.range(
    d3.utcYear(d3.min(ucdpPrioAcd221.map(d => new Date(d.year, 1, 1)))),
    d3.utcYear(d3.max(ucdpPrioAcd221.map(d => new Date(d.year + 1, 1, 1)))),
  )
  const regions = ["Europe","Middle East","Asia","Africa","Americas"];
  const data = [];
  years.forEach(y => {
    regions.forEach(r => {
      const datum = {
        year: y.getFullYear(),
        date: y,
        region: r,
        conflicts: ucdpPrioAcd221.filter(d => (d.year === y.getFullYear()) && (d.regions.includes(r)))
      };
      data.push(datum);
    })
  });
  return data;
}
)
    }
  ]
};

const m1 = {
  id: "@d3/color-legend",
  variables: [
    {
      name: "Legend",
      inputs: ["d3"],
      value: (function(d3){return(
function Legend(color, {
  title,
  tickSize = 6,
  width = 320, 
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
        : color.quantiles ? color.quantiles() // scaleQuantile
        : color.domain(); // scaleThreshold

    const thresholdFormat
        = tickFormat === undefined ? d => d
        : typeof tickFormat === "string" ? d3.format(tickFormat)
        : tickFormat;

    x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);

    tickAdjust = () => {};
  }

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title));

  return svg.node();
}
)})
    },
    {
      name: "Swatches",
      inputs: ["d3","htl"],
      value: (function(d3,htl){return(
function Swatches(color, {
  columns = null,
  format,
  unknown: formatUnknown,
  swatchSize = 15,
  swatchWidth = swatchSize,
  swatchHeight = swatchSize,
  marginLeft = 0
} = {}) {
  const id = `-swatches-${Math.random().toString(16).slice(2)}`;
  const unknown = formatUnknown == null ? undefined : color.unknown();
  const unknowns = unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
  const domain = color.domain().concat(unknowns);
  if (format === undefined) format = x => x === unknown ? formatUnknown : x;

  function entity(character) {
    return `&#${character.charCodeAt(0).toString()};`;
  }

  if (columns !== null) return htl.html`<div style="display: flex; align-items: center; margin-left: ${+marginLeft}px; min-height: 33px; font: 10px sans-serif;">
  <style>

.${id}-item {
  break-inside: avoid;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}

.${id}-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - ${+swatchWidth}px - 0.5em);
}

.${id}-swatch {
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin: 0 0.5em 0 0;
}

  </style>
  <div style=${{width: "100%", columns}}>${domain.map(value => {
    const label = `${format(value)}`;
    return htl.html`<div class=${id}-item>
      <div class=${id}-swatch style=${{background: color(value)}}></div>
      <div class=${id}-label title=${label}>${label}</div>
    </div>`;
  })}
  </div>
</div>`;

  return htl.html`<div style="display: flex; align-items: center; min-height: 33px; margin-left: ${+marginLeft}px; font: 10px sans-serif;">
  <style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin-right: 0.5em;
  background: var(--color);
}

  </style>
  <div>${domain.map(value => htl.html`<span class="${id}" style="--color: ${color(value)}">${format(value)}</span>`)}</div>`;
}
)})
    }
  ]
};

const notebook = {
  id: "b146984afab14d30@605",
  modules: [m0,m1]
};

export default notebook;
