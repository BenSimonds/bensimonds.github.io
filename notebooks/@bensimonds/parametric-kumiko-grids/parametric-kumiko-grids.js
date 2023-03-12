// URL: https://observablehq.com/@bensimonds/parametric-kumiko-grids
// Title: Parametric Kumiko Grids
// Author: Ben Simonds (@bensimonds)
// Version: 726
// Runtime version: 1

const m0 = {
  id: "097722237adcf6cb@726",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Parametric Kumiko Grids
`
)})
    },
    {
      inputs: ["width","grids","bisectRatio","solve","htl","asanoha"],
      value: (function(width,grids,bisectRatio,solve,htl,asanoha)
{
  const margin = 10,
    height = width * 0.32,
    w = width - 2 * margin,
    h = height - 2 * margin,
    // Find the closest whole number ratio that's a bit more extreme than w / h
    b = grids[bisectRatio.left(grids, w/h)],
    m = b.m,
    n = b.n,
    [p, x] = solve(w, h, n, m)
    
    ;

  
  const frame =  htl.html`
    <svg width=${width} height=${height}>

<!-- Outer Frame --!>
      <rect id='outer' x=${margin} y=${margin} width=${w} height=${h} stroke="#222" stroke-width="1.5" fill="none"></rect>

<!-- Vertical Grid --!>
${
  Array.from(Array(n*2+1).keys()).map(i => {
    return htl.svg.fragment`<path d="M ${margin + p + i * x / 2} ${margin} V ${h + margin}" stroke="#222" stroke-width="2">`
  }) 
}
<!-- Horizontal Grid --!>
${
  Array.from(Array(m*2+1).keys()).map(i => {
    return htl.svg.fragment`<path d="M ${margin} ${margin + p + i * x / 2} H ${w + margin}" stroke="#222" stroke-width="2">`
  }) 
}
<!-- Asanoha pattern --!>
${
  Array.from(Array(n*m).keys()).map(i => {
      const u = i % n;
      const v = Math.floor(i / n)
      // return htl.svg.fragment`<rect x=${margin + p + u * x} y=${margin + p + v * x} width=${x} height=${x} stroke="blue" fill="none"></rect>`
      return asanoha(margin + p + u * x, margin + p + v * x, x, "#222", 2)
  })}

      
  
  </svg>
  `
  return frame;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

I came across a problem recently in a woodworking project, where I wanted to fit a [kumiko](https://en.wikipedia.org/wiki/Kumiko_(woodworking)) grid into a panel. Kumiko grids can be based on a variety of patterns, but for my panel I wanted to use the square asanoha pattern you see above. The issue was that my panel was a rectangle that didn't fit some whole number of squares perfectly (ie. having a rational number ratio between that width and height that wasn't too complex).

By adding some padding around the edge of the design though, I realised I could adjust the ratio between the width and height of the inner rectangle to fit a whole number of squares exactly.

Adjust the padding width below - as the aspect ratio of the inner rectangle reaches a value close to a whole number the matching number of squares will appear in the grid.`
)})
    },
    {
      name: "viewof padding",
      inputs: ["Scrubber","d3","width"],
      value: (function(Scrubber,d3,width){return(
Scrubber(d3.range(0,width/5,0.1), {initial:0, alternate: true, format: d3.format('.0f')})
)})
    },
    {
      name: "padding",
      inputs: ["Generators","viewof padding"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["width","padding","d3","htl"],
      value: (function(width,padding,d3,htl)
{
  const margin = 10,
    height = width / 2.5, // Some non-whole number ratio
    p = Math.min(height / 2 - margin, padding),
    dp2 = d3.format('.2f'),
    dp0 = d3.format('.0f'),
    outerRatio = (width -  margin * 2) / (height - margin * 2),
    innerRatio = (width - margin * 2 - p * 2 )/(height - margin * 2 - p * 2),
    close = 0.1,
    isRoughlyWhole = innerRatio % 1 < close || innerRatio % 1 > (1-close),
    squareSize = isRoughlyWhole ? (width - margin * 2 - p * 2) / innerRatio : undefined;

  
  const frame =  htl.html`
    <svg width=${width} height=${height} stroke-width=2>
      <rect id='outer' x=10 y=10 width=${width - margin * 2} height=${height - margin * 2} stroke="#49586B" fill="none"></rect>
      <text x=${width / 2} y=${height / 2} text-anchor="middle" fill="#49586B"> Outer Rectangle: ${dp0(width)} x ${dp0(height)} Ratio:  ${dp2(width/height)} : 1</text>
        
      <rect id='inner' x=${10 + p} y=${10 + p} width=${width - p*2 - 20} height=${height - p * 2 - 20} stroke="#D6934D" fill="none"></rect>
      <text x=${width / 2} y=${height / 2 + 30} text-anchor="middle" fill="#D6934D"> Inner Rectangle: ${dp0(width - p)} x ${dp0(height - p)} Ratio: ${dp2(innerRatio)} : 1 </text>
  
  ${
    !isRoughlyWhole ? null : Array.from(Array(Math.round(innerRatio)).keys()).map(i => {
      return htl.svg.fragment`<rect x=${p + margin + i * squareSize} y=${p + margin} width=${squareSize} height=${squareSize} stroke="#4F659E" fill="none"></rect>`
  })}
  </svg>
  `
  return frame;
}
)
    },
    {
      inputs: ["tex","width","md"],
      value: (function(tex,width,md){return(
md`To find the _exact_ padding ${tex`p`} needed for any given panel, we just need to solve the following, for a horizontal rectangle of height ${tex`h`} and width ${tex`w`}. For example:

<svg width=${width} height=${width/3} viewBox="-10 -10 100 100">
  
  <rect id='outer' x=10 y=10 width=${100} height=${60} stroke="black" fill="none"></rect>
  <rect id='inner' x=${20} y=${20} width=${40} height=${40} stroke="#D6934D" fill="none"></rect>
  <rect id='inner' x=${60} y=${20} width=${40} height=${40} stroke="#D6934D" fill="none"></rect>
  <g font-style="italic" font-size=6>
  <text x="5" y="40" text-anchor="end" alignment-baseline="middle">h = 60</text>
  <text x="60" y="5" text-anchor="middle" alignment-baseline="middle">w = 100</text>
  <text x="40" y="40" text-anchor="middle" alignment-baseline="middle">x = 40</text>
  <text x="60" y="15" text-anchor="middle" alignment-baseline="middle">p = 10</text>
    </g>
</svg>

In general:
<br/>
${tex`w = 2p + nx`}
<br/>
${tex`h = 2p + mx`}
<br/>

Where ${tex`n \times m`} is our number of squares we want to fit and ${tex`x`} is the size of our squares. We can solve this with some iteration - narrowing in on the correct values by repeatedly plugging them into the formulas above.`
)})
    },
    {
      name: "solve",
      value: (function(){return(
function solve(w, h, n, m=1, threshold=0.001) {
  var error = 1, p=0, i=0, x = w / n;
  while (error > threshold && i < 1000) {
    p = (h - x * m) / 2; // Calculate what p should be based on x.
    var newx = (w - 2 * p) / n // Calculate what x should be based on p
    error = Math.abs(newx - x); // Update the error
    x = newx; // Update x
    i++;
  }
  return [p, x];
}
)})
    },
    {
      inputs: ["tex","md"],
      value: (function(tex,md){return(
md`Now we can use our solver to fit a nice grid into a rectangle with any ratio of side length, using an even amount of padding around the edges to force the inner rectangle to have a whole number ratio in its side lengths. The process goes as follows - first we just find a whole number combination ${tex`n \times m`} that gives a ratio just larger than that of the outer rectangle, then we solve to get the padding and square size. `
)})
    },
    {
      name: "viewof ratio",
      inputs: ["Scrubber","d3"],
      value: (function(Scrubber,d3){return(
Scrubber(d3.range(1.3, 4, 0.005), {initial:2, alternate: true, autoplay: true, format: d3.format('.2f')})
)})
    },
    {
      name: "ratio",
      inputs: ["Generators","viewof ratio"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["width","ratio","grids","bisectRatio","solve","htl","asanoha"],
      value: (function(width,ratio,grids,bisectRatio,solve,htl,asanoha)
{
  const margin = 10,
    height = width / 1.3,
    w = width - 2 * margin,
    h = w / ratio,
    // Find the closest whole number ratio that's a bit more extreme than w / h
    b = grids[bisectRatio.left(grids, ratio)],
    m = b.m,
    n = b.n,
    [p, x] = solve(w, h, n, m)
    
    ;
  console.log(b)
  
  const frame =  htl.html`
    <svg width=${width} height=${height}>

<!-- Outer Frame --!>
      <rect id='outer' x=${margin} y=${margin} width=${w} height=${h} stroke="black" stroke-width="2" fill="none"></rect>

<!-- Vertical Grid --!>
${
  Array.from(Array(n*2+1).keys()).map(i => {
    return htl.svg.fragment`<path d="M ${margin + p + i * x / 2} ${margin} V ${h + margin}" stroke="#D6934D" stroke-width="2">`
  }) 
}
<!-- Horizontal Grid --!>
${
  Array.from(Array(m*2+1).keys()).map(i => {
    return htl.svg.fragment`<path d="M ${margin} ${margin + p + i * x / 2} H ${w + margin}" stroke="#D6934D" stroke-width="2">`
  }) 
}
<!-- Asanoha pattern --!>
${
  Array.from(Array(n*m).keys()).map(i => {
      const u = i % n;
      const v = Math.floor(i / n)
      return asanoha(margin + p + u * x, margin + p + v * x, x, "#4F659E", 2)
  })}

      
  
  </svg>
  `
  return frame;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Which means I can design a Kumiko grid to fit any size woodworking project.`
)})
    },
    {
      name: "img_07852",
      inputs: ["FileAttachment"],
      value: (function(FileAttachment){return(
FileAttachment("IMG_0785 2.jpg").image({width: 450})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Appendix

I've used the following array to store a list of integer grid ratios.`
)})
    },
    {
      name: "grids",
      value: (function()
{
  const grids = [];
  const ratios = [];
  const largest = 5;
  for (let m = 1; m < largest; ++m) {
    for (let n = m; n < largest; ++n) {
      if (!ratios.includes(n/m)) {
          grids.push({m, n, ratio: n/m})
          ratios.push(n/m)
      }
    
    }  
  }
  return grids.sort((a,b) => a.ratio - b.ratio);
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`And this d3 bisect function to find the closest integer ratio to any grid size.`
)})
    },
    {
      name: "bisectRatio",
      inputs: ["d3"],
      value: (function(d3){return(
d3.bisector(d => d.ratio)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`And here's a couple of little \`htl\` fragment generating functions for drawing the square version of the Asanoha pattern.`
)})
    },
    {
      name: "asanohaQuadrant",
      inputs: ["htl"],
      value: (function(htl){return(
function asanohaQuadrant(transform, stroke="black", strokeWidth=2) {
  return htl.svg.fragment`<g transform="${transform}">
  <path d="M 0 0 L 100 100 L 75 25 L 0 0 M 100 0 L 75 25" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke"/>
  <path d="M 100 100 L 25 75 L 0 0 M 0 100 L 25 75" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke"/>
  <rect x=0 y=0 width=100 height=100 stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke" />
</g>`}
)})
    },
    {
      name: "asanoha",
      inputs: ["htl","asanohaQuadrant"],
      value: (function(htl,asanohaQuadrant){return(
function asanoha(x, y, size, stroke="black", strokeWidth=2) {
  return htl.svg.fragment`<g transform="translate(${x} ${y}) scale(${size / 100})">
  ${asanohaQuadrant("scale(0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(50, 50) scale(-0.5 0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(50, 50) scale(0.5 -0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(100, 100) scale(-0.5 -0.5)", stroke, strokeWidth)}
</svg>`
}
)})
    },
    {
      inputs: ["htl","asanoha"],
      value: (function(htl,asanoha){return(
htl.svg`<svg>${asanoha(100,10,100)}<svg>`
)})
    },
    {
      from: "@mbostock/scrubber",
      name: "Scrubber",
      remote: "Scrubber"
    }
  ]
};

const m1 = {
  id: "@mbostock/scrubber",
  variables: [
    {
      name: "Scrubber",
      inputs: ["html","Inputs"],
      value: (function(html,Inputs){return(
function Scrubber(values, {
  format = value => value,
  initial = 0,
  delay = null,
  autoplay = true,
  loop = true,
  loopDelay = null,
  alternate = false
} = {}) {
  values = Array.from(values);
  const form = html`<form style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 33px; align-items: center;">
  <button name=b type=button style="margin-right: 0.4em; width: 5em;"></button>
  <label style="display: flex; align-items: center;">
    <input name=i type=range min=0 max=${values.length - 1} value=${initial} step=1 style="width: 180px;">
    <output name=o style="margin-left: 0.4em;"></output>
  </label>
</form>`;
  let frame = null;
  let timer = null;
  let interval = null;
  let direction = 1;
  function start() {
    form.b.textContent = "Pause";
    if (delay === null) frame = requestAnimationFrame(tick);
    else interval = setInterval(tick, delay);
  }
  function stop() {
    form.b.textContent = "Play";
    if (frame !== null) cancelAnimationFrame(frame), frame = null;
    if (timer !== null) clearTimeout(timer), timer = null;
    if (interval !== null) clearInterval(interval), interval = null;
  }
  function running() {
    return frame !== null || timer !== null || interval !== null;
  }
  function tick() {
    if (form.i.valueAsNumber === (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)) {
      if (!loop) return stop();
      if (alternate) direction = -direction;
      if (loopDelay !== null) {
        if (frame !== null) cancelAnimationFrame(frame), frame = null;
        if (interval !== null) clearInterval(interval), interval = null;
        timer = setTimeout(() => (step(), start()), loopDelay);
        return;
      }
    }
    if (delay === null) frame = requestAnimationFrame(tick);
    step();
  }
  function step() {
    form.i.valueAsNumber = (form.i.valueAsNumber + direction + values.length) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", {bubbles: true}));
  }
  form.i.oninput = event => {
    if (event && event.isTrusted && running()) stop();
    form.value = values[form.i.valueAsNumber];
    form.o.value = format(form.value, form.i.valueAsNumber, values);
  };
  form.b.onclick = () => {
    if (running()) return stop();
    direction = alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
    form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", {bubbles: true}));
    start();
  };
  form.i.oninput();
  if (autoplay) start();
  else stop();
  Inputs.disposal(form).then(stop);
  return form;
}
)})
    }
  ]
};

const notebook = {
  id: "097722237adcf6cb@726",
  modules: [m0,m1]
};

export default notebook;
