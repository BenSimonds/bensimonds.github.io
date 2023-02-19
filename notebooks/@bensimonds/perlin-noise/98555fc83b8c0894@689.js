function _1(md){return(
md`# Perlin Noise

This notebook builds up some examples of the Perlin noise algorithm from scratch. It's based heavily on the following resources: 

- [Undestanding perlin noise in (C#)](http://adrianb.io/2014/08/09/perlinnoise.html)
- [@Josephg/noisejs on github](https://github.com/josephg/noisejs)

Perlin noise is way of creating a continuous noise field, by chopping up the domain you want to create noise in into units, giving each unit it's own noise vector, and then interpolating smoothly between them. 

## 1D Perlin Noise
Our 1D Perlin noise function takes an input x and returns a continuous noise field. We basically assign each integer value a random value, and just interpolate smoothly between them.`
)}

function _noise1d(cells1d,nUnique,lerp,fade){return(
function noise1d (x) {

  // Get the integer component of x to tell us which "unit" of we're in.
  const _x = Math.floor(x);
  // Treat x as the distance within that unit length.
  x = x - _x;

  // For each unit coordinate genreate a pseudo random gradient vector.
  // This part I haven't done exactly like the perlin algorithm, but it boils down to something pretty similar.
  const g1 = cells1d[(_x) % nUnique]; 
  const g2 = cells1d[(_x+1) % nUnique];

  // Linearly interpolate between g1 and g2 to give our output.
  return lerp(g1, g2, fade(x))
}
)}

function _3(md){return(
md`Let's test our our 1D noise function with a line chart. ● circles mark each integer point, so you can see how the function interpolates between them. <span style='color: red;'>●</span> red circles mark where the pattern repeats as we loop through our array of random values.`
)}

function _nUnique(Inputs){return(
Inputs.range([1, 256], {value: 16, step: 1, label: "# Unique values"})
)}

function _5(d3,width,noise1d,nUnique)
{
  // generate some noise
  const [bottom, top] = [0, 64];
  const x = d3.range(bottom, top, (top - bottom)/width);
  const data = x.map((d) => [d, noise1d(d)]);
  const integerPoints = d3.range(bottom, top).map(d => [d, noise1d(d)]);
  const height = width / 4;

  // render it with a simple line chart.
  const svg = d3.create('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style('background-color','white');

  const scaleX = d3.scaleLinear([0, width]).domain([bottom, top])
  const scaleY = d3.scaleLinear([height, 0]).domain([-1, 2])

  
  var line = d3.line()
  // Draw a line with our perlin data.
  svg.append("path")
    .attr('d', line(data.map(d => [scaleX(d[0]), scaleY(d[1])])))
    .attr("stroke","black")
    .attr("fill","none");
  // Draw a circle showing the noise value at each integer point
  svg.selectAll("circle")
    .data(integerPoints)
    .enter()
    .append("circle")
    .attr("cx",d => scaleX(d[0]))
    .attr("cy",d => scaleY(d[1]))
    .attr("r", 3)
    .attr("fill", (d, i) =>  i % nUnique === 0 ? "red" : "black")
 

  return svg.node();

}


function _6(md){return(
md`## 2D Perlin Noise
For our 2D perlin noise we need to create a 2D pseudo-random vector at each integer grid point, rather than a scalar value. Then to convert that to a value we can compute the dot product been this vector and any points position within the cell to compute a noise value.`
)}

function _noise2d(nUnique,cells2d,perm,dot,lerp,fade){return(
function noise2d(x, y) {
  // get our position within the unit space.
  const _x = Math.floor(x);
  const _y = Math.floor(y);
  x = x - _x;
  y = y - _y;
  
  // Get the x and y cooridnates of the left and right, top and bottom of the cell
  // Taking the modulo of these by nUnique gives us noise that repeats every nUnique units.
  const _x0 = _x % nUnique;
  const _y0 = _y % nUnique;
  const _x1 = (_x + 1) % nUnique;
  const _y1 = (_y + 1) % nUnique;

  // Get our gradient vectors
  const g00 = cells2d[_x0 + perm[_y0]]
  const g10 = cells2d[_x1 + perm[_y0]]
  const g01 = cells2d[_x0 + perm[_y1]]
  const g11 = cells2d[_x1 + perm[_y1]]

  // Get the displacement between a given point and the four corners of the cell
  const d00 = [x, y];
  const d10 = [x-1, y];
  const d01 = [x , y-1];
  const d11 = [x-1, y-1];

  // Compute the influence of each corner on a given point.
  const in00 =  dot(g00, d00);
  const in10 =  dot(g10, d10);
  const in01 =  dot(g01, d01);
  const in11 =  dot(g11, d11);

  // Finally interpolate betweeen our influences. First on the x axis for the top and bottom pairs of points
  const l1 = lerp(in00, in10, fade(x));
  const l2 = lerp(in01, in11, fade(x));
  // Then on the y axis to fade from left to right.
  return lerp(l1, l2, fade(y)) + 0.5;
  
}
)}

function _8(md){return(
md`We can draw our noise field with some shapes, coloring them by the value of the field at that location. We'll also draw in the random vector for the field at each integer loaction, so we can see how this influences the noise pattern. You'll see the vectors always point in the direction of the higher (blue) values, and that the integer points themselves always lie at the midpoint of the color gradient - because their dot product will always be zero.`
)}

function _theta(Inputs){return(
Inputs.range([0, 360], {value: 0, step: 5, label: "Rotate noise vectors"})
)}

function _10(width,d3,noise2d,cells2d,nUnique,perm)
{
  const margin = {left: 40, top: 40, right: 40, bottom: 40}
  const height = width;
  
  // generate some 2D noise
  const nUnits = 8;
  const shapesPerRepeat = 8;

 // Scales for drawing things.
  const scaleX = d3.scaleLinear([margin.left, width-margin.right]).domain([0, nUnits])
  const scaleY = d3.scaleLinear([margin.top, height-margin.bottom]).domain([0, nUnits])
  const scaleC = d3.scaleSequential(d3.interpolateRdYlBu).domain([0, 1])
  
  const [start, stop] = [0, shapesPerRepeat * nUnits];
  const shapeSize = Math.floor(width / (stop - start)) - 1;
  const data = [];
  const vectorData = [];
  for (let i = start; i<= stop; i++) {
    for (let j = start; j<= stop; j++) {
      const x = i / shapesPerRepeat;
      const y = j / shapesPerRepeat;
      data.push({i, j, x, y, value: noise2d(x, y)})
    }
  }
  for (let i = 0; i <= nUnits; i++) {
    for (let j = 0; j <= nUnits; j++) {
      const x = i;
      const y = j;
      vectorData.push({i, j, x, y, vector: cells2d[x % nUnique + perm[y % nUnique]]})
    }
  }
  

  // Render our data this time as a grid of rectangles.
  const div = d3.create('div').style('position','relative')
    .style('width', `${width}px`)
    .style('height', `${height}px`)
  const canvas = div.append('canvas')
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .attr('width', width)
    .attr('height', height)
    
  const context = canvas.node().getContext('2d');
  const svg = div.append('svg')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', 2)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      

  

  data.forEach(function(d, i) {
    context.beginPath();
    context.rect(scaleX(d.x), scaleY(d.y), shapeSize, shapeSize);
    context.fillStyle=scaleC(d.value);
    context.fill();
    context.closePath();
  });

  svg.append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, shapeSize, shapeSize])
    .attr('refX', shapeSize / 2)
    .attr('refY', shapeSize / 2)
    .attr('markerWidth',shapeSize)
    .attr('markerHeight', shapeSize)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()([
      [0, 0], 
      [0, shapeSize], 
      [shapeSize, shapeSize / 2]
    ]))
    .attr('fill', 'black');;

 var line = d3.line()
 var gArrows = svg.selectAll('g')
    .data(vectorData)
    .enter()
    
  gArrows.append('circle')
    .attr('cx', d => scaleX(d.x))
    .attr('cy', d => scaleY(d.y))
    .attr('r', 4)
    .attr('stroke','black')
    .attr('fill', 'none')
  
  gArrows.append('path')
    .attr('d', d => line([
      [scaleX(d.x), scaleY(d.y)],
      [scaleX(d.x + d.vector[0] / 3), scaleY(d.y + d.vector[1]/3)]
    ]))
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("fill","none")
    //.attr('marker-end', 'url(#arrow)')
    .attr('fill', 'none');
  

  return div.node();

}


function _11(md){return(
md`## Layering Noise - Octaves
We can create more natural, fractal like noise, by combining noise functions with different scales. If we make each layer of noise a have a smaller scale, and progressively adjust their influence, we end up with a nice looking "scale-free" noise texture with detail at both large and small scales.`
)}

function _noise2DOctaves(noise2d){return(
function noise2DOctaves(x, y, octaves=2, persistence=1.0) {
  var total = 0;
  var frequency = 1;
  var amplitude = 1;
  var maxValue = 0;
  for (let i=0;i<octaves;i++) {
    total += noise2d(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;                // Keep track of the maximum amplitude that could have been achieved.
    amplitude = amplitude * persistence;  // For each step in frequency, increase the amplitude by a factor of the persistence.
    frequency = frequency * 2;            // Double the frequency
  }
  return total / maxValue;
}
)}

function _13(md){return(
md`You can play with how layers are blended together below. Persistence defines how much influence smaller scales of noise have - a value of \`0.5\` means each smaller scale of noise has half the influence of the layer before it. A value of 1 means each layer has the same influence.`
)}

function _persistence(Inputs){return(
Inputs.range([0, 2], {value: 0.5, step: 0.1, label: "Persistence"})
)}

function _octaves(Inputs){return(
Inputs.range([1, 8], {value: 5, step: 1, label: "# Octaves"})
)}

function _16(width,d3,noise2DOctaves,octaves,persistence)
{
  const margin = {left: 40, top: 30, right: 30, bottom: 30}
  const height = width;
  
  // generate some 2D noise
  const nUnits = 2;
  const shapesPerRepeat = 64;

 // Scales for drawing things.
  const scaleX = d3.scaleLinear([margin.left, width-margin.right]).domain([0, nUnits])
  const scaleY = d3.scaleLinear([margin.top, height-margin.bottom]).domain([0, nUnits])
  

  
  const [start, stop] = [0, shapesPerRepeat * nUnits];
  const shapeSize = Math.floor(width / (stop - start));
  const data = [];
  const vectorData = [];
  for (let i = start; i<= stop; i++) {
    for (let j = start; j<= stop; j++) {
      const x = i / shapesPerRepeat;
      const y = j / shapesPerRepeat;
      data.push({i, j, x, y, value: noise2DOctaves(x, y, octaves, persistence)})
    }
  }
  // Normalise our data
  const scaleC = d3.scaleSequential(d3.interpolateRdYlBu).domain(d3.extent(data.map(d => d.value)))
 

  // Render our data this time as a grid of rectangles.
  const div = d3.create('div').style('position','relative')
  const svg = div.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style('background-color','white')

  svg.append('g').attr('transform','translate(0,20)').call(d3.axisTop(scaleX));
  svg.append('g').attr('transform','translate(30,0)').call(d3.axisLeft(scaleY));
    

  const canvas = div.append('canvas')
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
  .attr('width', width)
    .attr('height', height)
    
  const context = canvas.node().getContext('2d');
  
    
  data.forEach(function(d, i) {
    context.beginPath();
    context.rect(scaleX(d.x), scaleY(d.y), shapeSize, shapeSize);
    context.fillStyle=scaleC(d.value);
    context.fill();
    context.closePath();
  });
    


  return div.node();

}


function _17(md){return(
md`## 📝 A note on the algorithm
One important part of the Perlin algorithm I've neglected a bit here is how the random vectors for each grid point are chosen and what they should be. In the [real](http://adrianb.io/2014/08/09/perlinnoise.html) Perlin algorithm these aren't completely random, but are picked in such a way as to make generating the noise pattern really efficient. In my examples, I've generated and picked random vectors much less efficiently, but in a way that makes it more fun to play with the charts above.`
)}

function _18(md){return(
md`## Appendix

Our \`cells\` arrays act as a lookup of values we can sample vectors (for 2d Noise) or numbers (for 1d noise) from.`
)}

function _cells2d(cells2Base,rotate,theta){return(
cells2Base.map(d => rotate(d, theta / 360 * 2 * Math.PI))
)}

function _cells2Base(nUnique)
{
  // This acts as the source for cells2d, allowing us to rotate cells2d without picking new random values.
  var cells = [];
  for (let i=0;i<(nUnique * 2);i++) {
    cells.push([(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2]);
  }
  return cells;
}


function _cells1d(nUnique)
{
  // Actas as a lookup for the random 1D value
  var cells = [];
  for (let i=0;i<nUnique;i++) {
    cells.push(Math.random());
  }
  return cells;
}


function _22(md){return(
md`\`perm\` is just a randomised array of the number of unique noise values we have. It acts as a way to randomise how we choose vectors on our x vs y axis, so they dont correlate.`
)}

function _perm(nUnique){return(
[...new Array(nUnique).keys()].sort(() => Math.random() - 0.5)
)}

function _24(md){return(
md`Finally we have some numbers for fading an interpolating smoothly between values, and a helper function for taking vector dot products.`
)}

function _lerp(){return(
function lerp(a,b,t) {
    return ((1-t) * a) + (t * b);
  }
)}

function _fade(){return(
function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }
)}

function _dot(){return(
function dot(a, b) {
  return a.map((d, i) => d * b[i]).reduce((a, b) => a+b, 0)
}
)}

function _rotate(){return(
function rotate(vec, theta) {
  return [
    //𝑥2=cos𝛽𝑥1−sin𝛽𝑦1
    // y2=sin𝛽𝑥1+cos𝛽𝑦1
    Math.cos(theta) * vec[0] - Math.sin(theta) * vec[1],
    Math.sin(theta) * vec[0] + Math.cos(theta) * vec[1]
  ]
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("noise1d")).define("noise1d", ["cells1d","nUnique","lerp","fade"], _noise1d);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof nUnique")).define("viewof nUnique", ["Inputs"], _nUnique);
  main.variable(observer("nUnique")).define("nUnique", ["Generators", "viewof nUnique"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","width","noise1d","nUnique"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("noise2d")).define("noise2d", ["nUnique","cells2d","perm","dot","lerp","fade"], _noise2d);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof theta")).define("viewof theta", ["Inputs"], _theta);
  main.variable(observer("theta")).define("theta", ["Generators", "viewof theta"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","d3","noise2d","cells2d","nUnique","perm"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("noise2DOctaves")).define("noise2DOctaves", ["noise2d"], _noise2DOctaves);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof persistence")).define("viewof persistence", ["Inputs"], _persistence);
  main.variable(observer("persistence")).define("persistence", ["Generators", "viewof persistence"], (G, _) => G.input(_));
  main.variable(observer("viewof octaves")).define("viewof octaves", ["Inputs"], _octaves);
  main.variable(observer("octaves")).define("octaves", ["Generators", "viewof octaves"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","d3","noise2DOctaves","octaves","persistence"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("cells2d")).define("cells2d", ["cells2Base","rotate","theta"], _cells2d);
  main.variable(observer("cells2Base")).define("cells2Base", ["nUnique"], _cells2Base);
  main.variable(observer("cells1d")).define("cells1d", ["nUnique"], _cells1d);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("perm")).define("perm", ["nUnique"], _perm);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("lerp")).define("lerp", _lerp);
  main.variable(observer("fade")).define("fade", _fade);
  main.variable(observer("dot")).define("dot", _dot);
  main.variable(observer("rotate")).define("rotate", _rotate);
  return main;
}
