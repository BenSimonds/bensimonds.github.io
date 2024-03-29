// URL: https://observablehq.com/@bensimonds/voronoi-cells
// Title: Voronoi Cells
// Author: Ben Simonds (@bensimonds)
// Version: 524
// Runtime version: 1

const m0 = {
  id: "6c54627640a71236@524",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Voronoi Cells

Some cell-like things with [d3-delaunay](https://github.com/d3/d3-delaunay).`
)})
    },
    {
      name: "viewof nCells",
      inputs: ["Inputs"],
      value: (function(Inputs){return(
Inputs.range([1, 500], {value: 100, step: 1, label: "Number of cells"})
)})
    },
    {
      name: "nCells",
      inputs: ["Generators","viewof nCells"],
      value: (G, _) => G.input(_)
    },
    {
      name: "chart",
      inputs: ["width","d3","randomPointsNormal","nCells","relax","subdivide","contractDistance"],
      value: (function(width,d3,randomPointsNormal,nCells,relax,subdivide,contractDistance)
{
  const height = width * 0.6;
  const bounds = [0, 0, width, height];
  const svg = d3.create("svg")
      .attr("width", bounds[2])
      .attr("height", bounds[3])
      .attr("viewBox", bounds)
      .style('background-color','#333333');
  

  var line = d3.line().curve(d3.curveBasisClosed);
  

  // Create some random points.
  var points = randomPointsNormal(nCells, width/2, width/4, height/2, height/4);
  points = relax(points, bounds, 1);

  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi(bounds);

  const cells = svg.append('g')

  const g = cells.selectAll("g")
    // Drop the last point since curvebasis closed closes the loop for us and will create a pinch at the repeated point otherwise.
    .data([... voronoi.cellPolygons()].map(d => subdivide(d.slice(0, -1)).slice(0, -1)))
    .join(
      (enter) => {
        const g = enter.append("g");
        g.append("path")
          .attr('class', 'cellWall')
          .attr("d", (d, i) => line(contractDistance(d, points[i],  Math.sqrt(-d3.polygonArea(d)) / 40)))
          .attr("stroke", d3.color("#E0E4CC").darker())
          .attr("fill","#E0E4CC")
        g.append("path")
          .attr('class', 'plasma')
          .attr("d", (d, i) => line(contractDistance(d, points[i],  Math.sqrt(-d3.polygonArea(d)) / 40 + 10)))
          .attr("stroke","#A7DBD8")
          .attr("fill","#A7DBD8")
        g.append("circle")
          .attr('class', 'nucleus')
          .attr("cx", (d, i) => points[i][0])
          .attr("cy", (d, i) => points[i][1])
          .attr("r", (d, i) => Math.sqrt(-d3.polygonArea(d)) / 10)
          .attr("stroke","#F38630")
          .attr("fill","#F38630")

        return g;
      },
      (update) => {
        update.select('.cellWall')
          .attr("d", d =>line(d)) 
          .attr("stroke","#E0E4CC")
          .attr("fill","#E0E4CC");
        update.select('.plasma')
          .attr("d", (d, i) => line(contractDistance(d, points[i], 10)))
          .attr("stroke","#A7DBD8")
          .attr("fill","#A7DBD8")
        update.select('.nucleus')
          .attr("cx", (d, i) => points[i][0])
          .attr("cy", (d, i) => points[i][1])
          .attr("r", (d, i) => Math.sqrt(-d3.polygonArea(d)) / 10)
          .attr("stroke", d3.color("#F38630").darker())
          .attr("fill","#F38630");
        return update;
      },
      (exit) => exit.remove()
    )
  return svg.node()
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Appendix`
)})
    },
    {
      name: "randomPoly",
      inputs: ["d3"],
      value: (function(d3){return(
function randomPoly(n, x0=0, y0=0, x1=100, y1=100) {
    // Create a random n sided convex polygon by choosing some random points.
    // Bounds defines the x and y domain the points will be sampled from.
    const randomX = d3.randomUniform(x0, x1);
    const randomY = d3.randomUniform(y0, y1);
    const points = [...Array(3).keys()].map(i => [randomX(),randomY()]);
    // Construct the convex hull of our points.  
    var poly = d3.polygonHull(points);
    while (poly.length < n) {
        poly = d3.polygonHull([...poly, [randomX(), randomY()]])
    }
    return poly;
}
)})
    },
    {
      name: "subdivide",
      value: (function(){return(
function subdivide(poly) {
  // Subdivide a polygon by adding a vertex between each pair of points.
  const newPoly = [];
  for (let i=0; i<poly.length; i++) {
    const point = poly[i]
    newPoly.push(point);
    const next = i == poly.length - 1 ? poly[0] : poly[i+1];
    newPoly.push([(point[0] + next[0]) / 2, (point[1] + next[1]) / 2])
  }
  return newPoly
}
)})
    },
    {
      name: "myRandomPoly",
      inputs: ["randomPoly"],
      value: (function(randomPoly){return(
randomPoly(5)
)})
    },
    {
      inputs: ["subdivide","myRandomPoly"],
      value: (function(subdivide,myRandomPoly){return(
subdivide(myRandomPoly)
)})
    },
    {
      name: "randomPointsUniform",
      inputs: ["d3"],
      value: (function(d3){return(
function randomPointsUniform(n, x0=0, y0=0, x1=100, y1=100) {
  const randomX = d3.randomUniform(x0, x1);
  const randomY = d3.randomUniform(y0, y1);
  return [...Array(n).keys()].map(i => [randomX(),randomY()]);
}
)})
    },
    {
      name: "randomPointsNormal",
      inputs: ["d3"],
      value: (function(d3){return(
function randomPointsNormal(n, xMu=50, xSigma=50, yMu=50, ySigma=50) {
  const randomX = d3.randomNormal(xMu, xSigma);
  const randomY = d3.randomNormal(yMu, ySigma);
  return [...Array(n).keys()].map(i => [randomX(),randomY()]);
}
)})
    },
    {
      name: "contractFactor",
      value: (function(){return(
function contractFactor(points, centroid, k) {
  // Move each point in a set of points a factor of k closer to the centroid.
  return points.map(p => [
    p[0] + k*(centroid[0] - p[0]),
    p[1] + k*(centroid[1] - p[1]),
  ])
}
)})
    },
    {
      name: "relax",
      inputs: ["d3","distance"],
      value: (function(d3,distance){return(
function relax(points, bounds, iterations=100) {
  // Relax points by moving each point to the centroid of its vodonoi cell.
  const polygons = [...d3.Delaunay.from(points).voronoi(bounds).cellPolygons()];
  const centroids = polygons.map(d3.polygonCentroid);
  // Test if converged by checking distance to centroid.
  var converged = points.every((point, i) => distance(point, centroids[i]) < 1);
  if (converged || iterations == 0) {
    return centroids;
  } else {
    // Recursively relax till converged or we run out of iterations
    return relax(centroids, bounds, iterations-1);
  }
  
}
)})
    },
    {
      name: "displacement",
      value: (function(){return(
function displacement(a, b) {
  return [b[0]-a[0], b[1]-a[1]]
}
)})
    },
    {
      name: "distance",
      inputs: ["displacement"],
      value: (function(displacement){return(
function distance(a, b) {
  if (b === undefined) {
    return Math.abs(Math.sqrt(a[0]**2 + a[1]**2));
  } else {
   return distance(displacement(a, b))
  }
}
)})
    },
    {
      name: "contractDistance",
      inputs: ["displacement","distance"],
      value: (function(displacement,distance){return(
function contractDistance(points, centroid, d) {
  // Move each point in a set of points a distance d closer to the centroid.
  const vec = (p) => displacement(p, centroid);
  const dist = (p) => distance(p, centroid);
  const unitVecToCentroid = (p) => {
    const v = vec(p);
    const d = dist(p);
    return [v[0] / d, v[1] / d];
  }
  // Return the point moved towards the centroid, without going past it.
  return points.map(p => distance(vec(p)) < d ? centroid : [ 
    p[0] + d*unitVecToCentroid(p)[0],
    p[1] + d*unitVecToCentroid(p)[1],
  ])
}
)})
    },
    {
      inputs: ["d3","randomPoly","contractDistance"],
      value: (function(d3,randomPoly,contractDistance)
{
  const svg = d3.create("svg")
      .attr("width", 100)
      .attr("height", 100)
      .attr("viewbox", "0 0 100 100");
  const p = randomPoly(6);

  var line = d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveBasisClosed);

  const poly = randomPoly(5);
  const centroid = d3.polygonCentroid(poly);
  svg.append('polygon').attr('stroke','black').attr('fill','#fff').attr('points', poly);
  svg.append('polygon').attr('stroke','black').attr('fill','#ddd').attr('points', contractDistance(poly, centroid, 8));
  svg.append('polygon').attr('stroke','black').attr('fill','#bbb').attr('points', contractDistance(poly, centroid, 16));
  svg.append('polygon').attr('stroke','black').attr('fill','#999').attr('points', contractDistance(poly, centroid, 24));
  svg.append('polygon').attr('stroke','black').attr('fill','#777').attr('points', contractDistance(poly, centroid, 32));
  svg.append('polygon').attr('stroke','black').attr('fill','#555').attr('points', contractDistance(poly, centroid, 40));
  
  
  
  return svg.node();
}
)
    },
    {
      inputs: ["randomPointsNormal","d3"],
      value: (function(randomPointsNormal,d3)
{
  const points = randomPointsNormal(40);
  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, 100, 100])
  return [...voronoi.cellPolygons()];
}
)
    },
    {
      name: "height",
      value: (function(){return(
200
)})
    }
  ]
};

const notebook = {
  id: "6c54627640a71236@524",
  modules: [m0]
};

export default notebook;
