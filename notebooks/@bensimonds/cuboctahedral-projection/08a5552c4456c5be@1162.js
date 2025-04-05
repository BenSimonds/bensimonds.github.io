function _1(md){return(
md`# Cuboctahedral Projection

The inspiration from this came from [this collection](https://www.davidrumsey.com/luna/servlet/view/search;JSESSIONID=865a7d1e-595f-4216-be80-5c34d89b0826?q=pub_list_no%3d%2215437.000%22&qvq=sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=0) on Buckminster Fuller's [Dymaxion Globe](https://en.wikipedia.org/wiki/Dymaxion_map) in the [David Rumsey Historical Map Collection](https://www.davidrumsey.com/), which I had a great time printing out and assembling into a 3d globe.

> Printed on one side only of the two heavy center sheets of this issue of LIFE is a new kind of world map. It is a projection of the round earth on 14 flat segments, eight triangles and six squares. The map may be removed from the magazine and, in accordance with instructions on pages 44 and 53, cut out and assembled as a three-dimensional approximation of a globe or laid out as a flat map, with which the world may be fitted together and rearranged to illuminate special aspects of its geography.

Later Dymaxion maps are projected onto an icosahedron, which can already be done with the [d3-geo-polygons](https://github.com/d3/d3-geo-polygon) library, but I think the cuboctahedron has some personality to it.`
)}

async function _2(FileAttachment,md){return(
md`Here is Buckminster Fuller's Map.

![Dymaxion Globe Net](${await FileAttachment("download.jpg").url()})

And below is my implementation with a custom \`d3-geo-polygons\` projection.`
)}

function _map(DOM,width,height,d3,projection,outline,graticule,land,basefaces)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);
  context.save();

  // Draw Background, Graticule and Land
  context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
  context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
  context.beginPath(), path(land), context.fillStyle = "#000", context.globalAlpha = 0.4, context.fill();
  
  // Higlight each face with a random color.
  const randomColor = d3.scaleOrdinal(d3.schemeTableau10)
  basefaces.forEach((f, i) => {
    // Fill Face
    const poly = {type:"Polygon", coordinates: [[...f, f[0]]]};
    const centroid = {type: "Point", coordinates: d3.geoCentroid(poly)};
    context.beginPath(), path(poly), context.fillStyle = randomColor(i), context.lineWidth = 2,context.globalAlpha = 0.4, context.fill();
    // Label Face
    context.beginPath(), path.pointRadius(10)(centroid), context.globalAlpha = 1, 
      context.lineWidth = 1, context.fillStyle='white', context.strokeStyle='black', context.fill(), context.stroke();
    context.fillStyle="black", context.strokeStyle="none", context.textBaseline="middle", context.textAlign="center", 
      context.fillText(i, projection(centroid.coordinates)[0], projection(centroid.coordinates)[1]);
  });
  
  context.restore();
  // Stroke Outline
  context.beginPath(), path(outline), context.strokeStyle = "#888", context.stroke();
  return context.canvas;
}


function _projection(cuboctahedron){return(
cuboctahedron()
)}

function _cuboctahedron(d3,extraGeo,basefaces){return(
function cuboctahedron(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = d3.geoCentroid({type: "MultiPoint", coordinates: face});
    return extraGeo.geoGnomonic()
      .rotate([-c[0], -c[1]])
      .scale(1)
      .translate([0, 0])
  };

  var faces = basefaces.map(function(face, i) {
    return {face: face, project: faceProjection(face), children: [], shared: []};
  });
  
  // Create spanning tree linking each face to its children. 
  faces[8].children = [12,4].map(d => faces[d]);
  faces[4].children = [7].map(d => faces[d]);
  faces[11].children = [13].map(d => faces[d]);
  faces[6].children = [11,10].map(d => faces[d]);
  faces[2].children = [6].map(d => faces[d]);
  faces[5].children = [9,2].map(d => faces[d]);
  faces[1].children = [8,5].map(d => faces[d]);
  faces[0].children = [1,3].map(d => faces[d]);

  function getFace(lambda, phi) {
    // Find which face a given point on the sphere belongs to.
    // This method is not super efficient but gets the job done.
    const point = [lambda / Math.PI * 180, phi / Math.PI * 180];
    for (let i = 0; i < faces.length; ++i) {
      const poly = {type: "Polygon", coordinates: [[...faces[i].face, faces[i].face[0]]]};
      if (d3.geoContains(poly, point)) return faces[i];
    }
  }

  return extraGeo.geoPolyhedral(faces[0], getFace)
    .angle(0)
    .scale(100)
    .center([0, 45]);
}
)}

function _baseverts(){return(
[
  [45, 45],[135, 45],[-135,45],[-45,45],
  [0,0],[90,0],[-180,0],[-90,0],
  [45, -45],[135, -45],[-135,-45],[-45,-45],
]
)}

function _basefaces(baseverts){return(
[
  [0,3,2,1],
  [3,0,4],
  [0,1,5],
  [1,2,6],
  [2,3,7],
  [4,0,5,8],
  [5,1,6,9],
  [6,2,7,10],
  [7,3,4,11],
  [4,8,11],
  [5,9,8],
  [6,10,9],
  [7,11,10],
  [8,9,10,11]
].map(function(face) {
  return face.map(function(i) {
    return baseverts[i];
  });
})
)}

function _8(md){return(
md`---
## Appendix`
)}

function _height(d3,projection,width,outline)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0);
  const l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}


function _path(d3,projection){return(
d3.geoPath(projection)
)}

function _outline(){return(
{type: "Sphere"}
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

function _land(topojson,world){return(
topojson.feature(world, world.objects.land)
)}

function _borders(topojson,world){return(
topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
)}

function _world(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _extraGeo(require){return(
require("d3-geo", "d3-geo-polygon")
)}

function _testnet(d3,htl,basefaces,baseverts)
{
  // Just testing out that I've connected the right vertices together.
  const line = d3.line();
  return htl.svg`<svg viewBox="${-200} ${-100} 400 200" style="display: block;">
    ${basefaces.map((face, i) => {
      return htl.svg.fragment`
        <path stroke="#aaa" fill="none" d="${line(face.map(([x,y]) => [x, -y]))}" />
        <text fill="red" text-anchor="middle"  alignment-baseline="middle" font-size="8" x=${d3.mean(face, d=>d[0])} y=${-d3.mean(face, d=>d[1])}>${i}</text>`
    })}
    ${baseverts.map(([x,y]) => htl.svg.fragment`<circle cx="${x}" cy="${-y}" r="2" fill="black"/>`)}
    ${baseverts.map(([x,y], i) => htl.svg.fragment`<text fill="blue"text-anchor="middle" x="${x}" y="${-y - 5}" r="2" font-size="6" fill="black">${i} (${x},${y})</text>`)}
  </svg>`
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/254a99fef9cfdc739794cf276a25ffce226b9d17d64789497bbed4935f1fda7d621149894d3a06e546f0e5c53beda2580db0166433ff2fac65397af1aa3627ea.json", import.meta.url), mimeType: "application/json", toString}],
    ["download.jpg", {url: new URL("./files/54ae867d0d5e763776a50799a922abce335ee396a192c68bab75fddd0911232556b1ec7a68406c9a02df8f317c0c28cef05259307a6ba47b14d30b50854f7188.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer("map")).define("map", ["DOM","width","height","d3","projection","outline","graticule","land","basefaces"], _map);
  main.variable(observer("projection")).define("projection", ["cuboctahedron"], _projection);
  main.variable(observer("cuboctahedron")).define("cuboctahedron", ["d3","extraGeo","basefaces"], _cuboctahedron);
  main.variable(observer("baseverts")).define("baseverts", _baseverts);
  main.variable(observer("basefaces")).define("basefaces", ["baseverts"], _basefaces);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("height")).define("height", ["d3","projection","width","outline"], _height);
  main.variable(observer("path")).define("path", ["d3","projection"], _path);
  main.variable(observer("outline")).define("outline", _outline);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("land")).define("land", ["topojson","world"], _land);
  main.variable(observer("borders")).define("borders", ["topojson","world"], _borders);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("extraGeo")).define("extraGeo", ["require"], _extraGeo);
  main.variable(observer("testnet")).define("testnet", ["d3","htl","basefaces","baseverts"], _testnet);
  return main;
}
