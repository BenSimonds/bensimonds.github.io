// Some data to start with. We'll use a random grid.
const gridSize = 32;
const gridScale = 10; // cell size in pixels.


function generateRandom() {
    // Generator for random cells
    let data = [[]]; // will be a 2D array of numbers.
    for (let j = 0; j < gridSize; j++) {
        data[j] = [];
        for (let i = 0; i < gridSize; i++) {
            data[j][i] = Math.round(Math.random());
        }
    }
    return data;
}

function step(data, protected) {
    /* Calculate the next step in the simulation.
    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    */
    const shape = [data[0].length, data.length];
    function countNeighbours(data, j, i) {
        const left = i === 0 ? shape[0] - 1 : i - 1;
        const right = i === shape[0] - 1 ? 0 : i + 1;
        const above = j === 0 ? shape[1] - 1 : j - 1;
        const below = j === shape[1] - 1 ? 0 : j + 1;

        return (
            data[above][left] +
            data[above][i] +
            data[above][right] +
            data[j][left] +
            data[j][right] +
            data[below][left] +
            data[below][i] +
            data[below][right]
        )
    }
    const newData = [[]];
    for (let j = 0; j < shape[1]; j++) {
        newData[j] = [];
        for (let i = 0; i < gridSize; i++) {
            const n = countNeighbours(data, j, i);
            const live = data[i][j] === 1;
            if (protected.includes(`${i}-${j}`)) {
                newData[j][i] = 1;
            } else if (live && (n === 2 || n === 3)) {
                newData[j][i] = 1; // Any live cell with two or three live neighbours survives.
            } else if (!live && n === 3) {
                newData[j][i] = 1; // Any dead cell with three live neighbours becomes a live cell.
            } else {
                newData[j][i] = 0; //  All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            }
        }
    }
    return newData;
}

function flatten(data) {
    // Flatten function to turn our grid into an array of i, j, value objects.
    const flattened = [];
    data.forEach((row, j) => {
        row.forEach((value, i) => {
            flattened.push({ i: i, j: j, value: value });
        });
    });
    return flattened;
}


function lifeChart(xcells, ycells) {
    // Return a chart function used to draw our cells.
    // Inspired by https://bost.ocks.org/mike/chart/
    const x = d3.scaleBand()
        .domain(d3.range(xcells))
        .range([0, xcells * gridScale])
        .padding(0.1);

    const y = d3.scaleBand()
        .domain(d3.range(0, ycells))
        .range([0, ycells * gridScale])
        .padding(0.1);

    function handleMouseOver(d, i) {
        console.log("MOUSEOVER"); // Replaced later.
    }

    function chart(selection) {
        selection.each(function (d, i) {
            const live = d.filter(d => d.value === 1); // We only need to render our live cells.
            // Fast ease for live cells
            const tfast = d3.transition().duration(100).ease(d3.easeExpIn);
            // Slow ease for dead ones
            const tslow = d3.transition().duration(1000).ease(d3.easeExpOut);
            // Main chart update.
            const rects = d3.select(this)
                .selectAll("rect")
                .data(live, d => `${d.i}-${d.j}`)
                .join(
                    enter => {
                        enter.append("rect")
                            .attr("x", d => x(d.i))
                            .attr("y", d => y(d.j))
                            .attr("rx", 2)
                            .attr("ry", 2)
                            .attr("width", x.bandwidth())
                            .attr("height", y.bandwidth())
                            .on("mouseover", handleMouseOver)
                            .transition(tfast)
                            .attr("fill", "white")
                            .attr("opacity", 1)
                    },
                    update => {
                        update
                            .attr("x", d => x(d.i))
                            .attr("y", d => y(d.j))
                            .attr("width", x.bandwidth())
                            .attr("height", y.bandwidth())
                            .transition(tfast)
                            .attr("fill", "white")
                            .attr("opacity", 1)
                    },
                    exit => exit.attr("fill", "#0FCE92").transition(tslow).attr("opacity", 0)
                );
        });
    }

    // Getter-Setter methods for chart attributes.
    chart.handleMouseOver = (value) => {
        if (!arguments.length) return handleMouseOver;
        handleMouseOver = value;
        return handleMouseOver
    }

    return chart;
}

// Setup SVG
// Set width on our inner div to center viz.
// d3.select("#lifeDiv").style("width", `${gridSize * gridScale}px`);
const svg = d3.select('#lifeSvg');
svg.attr("width", gridSize * gridScale).attr("height", gridSize * gridScale);

// Create Data
let data = generateRandom();
let protected = []; // protected cells by mousover survive till the next frame.
const life = lifeChart(gridSize, gridSize, protected);

// Create Mouseover function to protect/revive cells.
function handleMouseOver(d, i) {
    const dd = d.target.__data__
    data[dd.j][dd.i] = 1;
    d3.select(d.target).attr("fill", "white");
    // Protect this cell until the next frame
    protected.push(`${dd.i}-${dd.j}`);
}
life.handleMouseOver(handleMouseOver);

// Main loop to update our data and re-render our chart
setInterval(function () {
    svg.datum(flatten(data)).call(life);
    data = step(data, protected);
    protected = [];
}, 100);

// Set a handler on the randomize button to reset our data.
d3.select("#randomise").on("click", () => {
    data = generateRandom();
})

