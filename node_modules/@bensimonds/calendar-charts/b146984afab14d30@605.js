import define1 from "./a33468b95d0b15b0@808.js";

async function _1(FileAttachment,md){return(
md`# Calendar Charts

A calendar chart is a flexible way of displaying some kind of time series data binned into intervals (eg. days, weeks, months), using colour to illustrate some other variable. Examples abound, but common cases are calendar heatmaps (like Mike Bostock's [calendar](https://observablehq.com/@d3/calendar) chart) or the GitHub contributions heatmap. 

![image.png](${await FileAttachment("image.png").url()})

Commonly, weeks are represented on the x-axis, and the day of the week on the y-axis. This gives each day a unique cell (which is nice), but we aren't limited to this convention. For example, we could also give each day a unique x-coordinate, and use our y-axis for something else. 

Similarly, we usually see colour used to represent some continuous variable, but we could also use a categorical scale.

In this first example, I've used a few months of some stock market data from 2020 and use the y-axis to show our open, high, low, and close values (this isn't particularly informative, since the differences between them are small, it's just for demonstration).`
)}

function _2(Legend,chart){return(
Legend(chart.scales.c, {title: "Dow Jones Industrial Average"})
)}

function _chart(dji2,CalendarGrid,d3,width)
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


function _4(md){return(
md`Let's do something with some categorical data. We'll show the days President Trump went golfing during his presidency, using some data from [TrumpGolfCount.com](https://trumpgolfcount.com). In this example I've used the common convention of putting weeks on the x axis and day of the week on the y, which helpfully shows that most of Trump's golfing at least occurred on the weekend.`
)}

function _5(Swatches,chart2){return(
Swatches(chart2.scales.c)
)}

function _chart2(CalendarGrid,trumpGolf,d3,width)
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


function _7(md){return(
md`We can examine longer timespans as well. In the example below, we see the history of armed conflicts by year from the [UCDP/PRIO Armed Conflict Dataset](https://ucdp.uu.se/downloads/index.html#armedconflict). Showing the regions on the y axis lets us compare continents over time (this time with years on the x axis).`
)}

function _intensityLevel(Inputs){return(
Inputs.select(["Minor","War"], {label: "Intensity Level"})
)}

function _chart3(intensityLevel,CalendarGrid,conflictsByRegionYear,d3,width)
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


function _10(Legend,chart3){return(
Legend(chart3.scales.c, {title: "# Armed Conflicts"})
)}

function _11(md){return(
md`### Implementation`
)}

function _CalendarGrid(d3){return(
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
)}

function _13(md){return(
md`## Appendix`
)}

function _14(ucdpPrioAcd221){return(
ucdpPrioAcd221.filter(d => d.intensity_level == 2)
)}

async function _dji2(FileAttachment,d3)
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


async function _trumpGolf(FileAttachment,d3)
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


async function _ucdpPrioAcd221(FileAttachment)
{
  const raw = await FileAttachment("ucdp-prio-acd-221.csv").csv({typed: true})
  const regionNames = ["_","Europe","Middle East","Asia","Africa","Americas"]
  return raw.map(d => ({
    ...d,
    regions: d.region.toString().split(',').map(parseInt).map(d => regionNames[d])
  }))
}


function _conflictsByRegionYear(d3,ucdpPrioAcd221)
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


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/9b0f5b9e47cf221830b77fb39a03ec309aa97e27e170371131f08295fe41100233d3944d81c414c869ccb296157eadc5f2bfd64727eb6effcc562a99f59e0a99.png", import.meta.url), mimeType: "image/png", toString}],
    ["^DJI-2.csv", {url: new URL("./files/754e2916be7548300012f5d0d6406308809baff7a2419cca200561b60eb4e788a826f8a588c66afdecbe119eea3b03725a5182fca591c03bc8cdfb1071436085.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["trump_golf_outings.json", {url: new URL("./files/9324ec159eca9689ec0b051cbfe358002d2b8b03969fbba46f472c6f85547c06dffbbabaeb1ed2e0271620f2595959a77dded583c970c7711378e19efca4f3a9.json", import.meta.url), mimeType: "application/json", toString}],
    ["ucdp-prio-acd-221.csv", {url: new URL("./files/18c901885a1fba4b5839671da8eb974b9ed15e0cbed3ad4cc2b68c55e6f781d8e4d065a41e5ff1e98a88cf242ac65a9cf350291cb15280376c724bd19b74cca1.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["Legend","chart"], _2);
  main.variable(observer("chart")).define("chart", ["dji2","CalendarGrid","d3","width"], _chart);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Swatches","chart2"], _5);
  main.variable(observer("chart2")).define("chart2", ["CalendarGrid","trumpGolf","d3","width"], _chart2);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof intensityLevel")).define("viewof intensityLevel", ["Inputs"], _intensityLevel);
  main.variable(observer("intensityLevel")).define("intensityLevel", ["Generators", "viewof intensityLevel"], (G, _) => G.input(_));
  main.variable(observer("chart3")).define("chart3", ["intensityLevel","CalendarGrid","conflictsByRegionYear","d3","width"], _chart3);
  main.variable(observer()).define(["Legend","chart3"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("CalendarGrid")).define("CalendarGrid", ["d3"], _CalendarGrid);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["ucdpPrioAcd221"], _14);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  main.variable(observer("dji2")).define("dji2", ["FileAttachment","d3"], _dji2);
  main.variable(observer("trumpGolf")).define("trumpGolf", ["FileAttachment","d3"], _trumpGolf);
  main.variable(observer("ucdpPrioAcd221")).define("ucdpPrioAcd221", ["FileAttachment"], _ucdpPrioAcd221);
  main.variable(observer("conflictsByRegionYear")).define("conflictsByRegionYear", ["d3","ucdpPrioAcd221"], _conflictsByRegionYear);
  return main;
}
