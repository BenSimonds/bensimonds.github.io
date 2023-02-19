function _1(md){return(
md`# Perlin Snakes

A remaking of [Seph Gentle's](https://josephg.com/blog/) beautiful [Perlin snakes](https://josephg.com/perlin/3/) visualisation. I wanted to understand how it was put together, and discovered that it's rather fun to play with the parameters.`
)}

function _parameters(Inputs){return(
Inputs.form({
  nParticles: Inputs.range([10, 10000], {value: 2000, label: "Particle Count", step: 10}),
  period: Inputs.range([16, 512], {value: 256, label: "Period", step: 16}),
  stepSize: Inputs.range([1, 8], {value: 1, label: "Step Size (affects particle speed)", step: 1}),
  markSize: Inputs.range([1, 15], {value: 1.5, label: "Brush Size", step: 0.1}),
  octaves: Inputs.range([1, 5], {value: 2, label: "# Octaves", step: 1}),
})
)}

function* _3(width,DOM,noisejs,d3,parameters,noise2DOctaves)
{
  const height = width/2;
  const [w, h] = [width, height];
  const context = DOM.context2d(w, h);
  context.fillStyle = "hsl(216deg, 100%, 13%)";
  context.fillRect(0, 0, w, h)

  const noise = new noisejs.Noise(Math.random());

  // Create a bunch of particles.
  
  ;
  const stepSize = 2;
  const markSize = 1;
  const octaves = 2;
  const cm = d3.scaleSequential().interpolator(d3.interpolateSpectral).domain([-1, 1]);
  
  const yDistribution = d3.randomNormal(h/2, h/6)
  
  const particles = [];

  for (let i = 0; i <=parameters.nParticles; i++) {

  var particle = {
      x: Math.random() * w,
      y: yDistribution(),
      a: 0 // Our angle the particle is moving in
    }
    particles.push(particle);
    particles.push({
      x: particle.x,
      y: particle.y,
      a: - Math.PI // Add a particle moving in the opposite direction in the same position.
    })
  }

  function tick() {
    var results = [];
    particles.forEach((p, i) => {
      const v = noise2DOctaves(
        (x, y) => noise.perlin2(x, y), 
        p.x / parameters.period,
        p.y / parameters.period,
        parameters.octaves,
        0.75); // Calculate some noise value
      context.fillStyle = d3.color(cm(v)).copy({opacity: 0.05})//`hsla(${Math.floor(v*360)}, 95%, 25%, 0.05)`;
      context.fillRect(p.x, p.y, parameters.markSize, parameters.markSize);
      const a = v * 2 * Math.PI + p.a; // Modify our particles velocity a bit;
 
      p.x = p.x + Math.cos(a) * parameters.stepSize;
      p.y = p.y + Math.sin(a) * parameters.stepSize;
      

      results.push(p);
    })
    // Fade as time goes on
    // context.fillStyle ="hsla(216deg, 100%, 13%, 0.01)";
    // context.fillRect(0, 0, width, height)

    
    return results;
  }
  var counter = 0;
  while (true
        ) {
    tick();
    counter++
    yield context.canvas  
  }
  
}


function _noisejs(){return(
import("https://cdn.skypack.dev/noisejs@2.1.0")
)}

function _noise2DOctaves(){return(
function noise2DOctaves(f, x, y, octaves=2, persistence=1.0) {
  var total = 0;
  var frequency = 1;
  var amplitude = 1;
  var maxValue = 0;
  for (let i=0;i<octaves;i++) {
    total += f(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;                // Keep track of the maximum amplitude that could have been achieved.
    amplitude = amplitude * persistence;  // For each step in frequency, increase the amplitude by a factor of the persistence.
    frequency = frequency * 2;            // Double the frequency
  }
  return total / maxValue;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof parameters")).define("viewof parameters", ["Inputs"], _parameters);
  main.variable(observer("parameters")).define("parameters", ["Generators", "viewof parameters"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","DOM","noisejs","d3","parameters","noise2DOctaves"], _3);
  main.variable(observer("noisejs")).define("noisejs", _noisejs);
  main.variable(observer("noise2DOctaves")).define("noise2DOctaves", _noise2DOctaves);
  return main;
}
