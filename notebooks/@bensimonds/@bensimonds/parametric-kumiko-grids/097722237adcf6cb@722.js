import define1 from "./450051d7f1174df8@254.js";

function _1(md){return(
md`# Parametric Kumiko Grids
`
)}

function _2(width,grids,bisectRatio,solve,htl,asanoha)
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


function _3(md){return(
md`

I came across a problem recently in a woodworking project, where I wanted to fit a kumiko grid into a panel. Kumiko grids are based on squares, and but my panel was a rectangle that didn't fit some whole number of squares perfectly (ie. having a rational number ratio between that width and height that wasn't too complex.

By adding some padding to the design though, I realised there must be some width of padding around the edge of of the frame that would turn the inner frame into one that would fit a whole number of squares exactly.

Adjust the padding width below - as the ratio of the inner rectangle reaches a value close to a whole number the matching number of squares will appear in the grid.`
)}

function _padding(Scrubber,d3,width){return(
Scrubber(d3.range(0,width/5,0.1), {initial:0, alternate: true, format: d3.format('.0f')})
)}

function _5(width,padding,d3,htl)
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


function _6(tex,width,md){return(
md`To find the _exact_ padding ${tex`p`}, we just need to solve the following, for a horizontal rectangle of height ${tex`h`} and width ${tex`w`}. For example:

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

Where ${tex`n \times m`} is our number of squares we want to fit and ${tex`x`} is the size of our squares. We can solve this with some iteration.



`
)}

function _solve(){return(
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
)}

function _8(tex,md){return(
md`Now we can use our solver to fit a nice grid into a rectangle with any ratio of side length, using an even amount of padding around the edges to force the inner rectangle to have a whole number ratio in its side lengths. The process goes as follows - first we just find a whole number combination ${tex`n \times m`} that gives a ratio just larger than that of the outer rectangle, then we solve to get the padding and square size. `
)}

function _ratio(Scrubber,d3){return(
Scrubber(d3.range(1.3, 4, 0.005), {initial:2, alternate: true, autoplay: true, format: d3.format('.2f')})
)}

function _10(width,ratio,grids,bisectRatio,solve,htl,asanoha)
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


function _11(md){return(
md`Which means I can design a Kumiko grid to fit any size woodworking project.`
)}

function _img_07852(FileAttachment){return(
FileAttachment("IMG_0785 2.jpg").image({width: 450})
)}

function _13(md){return(
md`## Appendix

I've used the following array to store a list of integer grid ratios.`
)}

function _grids()
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


function _15(md){return(
md`And this d3 bisect function to find the closest integer ratio to any grid size.`
)}

function _bisectRatio(d3){return(
d3.bisector(d => d.ratio)
)}

function _17(md){return(
md`And here's a couple of little \`htl\` fragment generating functions for drawing the square version of the Asanoha pattern.`
)}

function _asanohaQuadrant(htl){return(
function asanohaQuadrant(transform, stroke="black", strokeWidth=2) {
  return htl.svg.fragment`<g transform="${transform}">
  <path d="M 0 0 L 100 100 L 75 25 L 0 0 M 100 0 L 75 25" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke"/>
  <path d="M 100 100 L 25 75 L 0 0 M 0 100 L 25 75" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke"/>
  <rect x=0 y=0 width=100 height=100 stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" vector-effect="non-scaling-stroke" />
</g>`}
)}

function _asanoha(htl,asanohaQuadrant){return(
function asanoha(x, y, size, stroke="black", strokeWidth=2) {
  return htl.svg.fragment`<g transform="translate(${x} ${y}) scale(${size / 100})">
  ${asanohaQuadrant("scale(0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(50, 50) scale(-0.5 0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(50, 50) scale(0.5 -0.5)", stroke, strokeWidth)}
  ${asanohaQuadrant("translate(100, 100) scale(-0.5 -0.5)", stroke, strokeWidth)}
</svg>`
}
)}

function _20(htl,asanoha){return(
htl.svg`<svg>${asanoha(100,10,100)}<svg>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["IMG_0785 2.jpg", {url: new URL("./files/eef1beef61842eeeaf7e3e06505e3ce25e93b9045a56ccc28810a0495c25f3481ce74e56e4bea72fba52aecb50abe3f65cee8614cd43e8e70600729b4eabcb47.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["width","grids","bisectRatio","solve","htl","asanoha"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof padding")).define("viewof padding", ["Scrubber","d3","width"], _padding);
  main.variable(observer("padding")).define("padding", ["Generators", "viewof padding"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","padding","d3","htl"], _5);
  main.variable(observer()).define(["tex","width","md"], _6);
  main.variable(observer("solve")).define("solve", _solve);
  main.variable(observer()).define(["tex","md"], _8);
  main.variable(observer("viewof ratio")).define("viewof ratio", ["Scrubber","d3"], _ratio);
  main.variable(observer("ratio")).define("ratio", ["Generators", "viewof ratio"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","ratio","grids","bisectRatio","solve","htl","asanoha"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("img_07852")).define("img_07852", ["FileAttachment"], _img_07852);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("grids")).define("grids", _grids);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("bisectRatio")).define("bisectRatio", ["d3"], _bisectRatio);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("asanohaQuadrant")).define("asanohaQuadrant", ["htl"], _asanohaQuadrant);
  main.variable(observer("asanoha")).define("asanoha", ["htl","asanohaQuadrant"], _asanoha);
  main.variable(observer()).define(["htl","asanoha"], _20);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
