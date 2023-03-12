function _1(md){return(
md`# Spinning Globe`
)}

function _colors(Inputs){return(
Inputs.form({
  countryOutline: Inputs.color({value: '#d61f1f', label: "Country Outline"}),
  countryFill: Inputs.color({value: '#800a21', label: "Country Fill"}),
  oceanFill: Inputs.color({value: '#060623', label: "Oceans"}),
  graticule: Inputs.color({value: '#152123', label: "Graticule"}),
  bgHaze1: Inputs.color({value: '#0eb7e1', label: "BG Haze 1"}),
  bgHaze2: Inputs.color({value: '#045181', label: "BG Haze 2"}),
  bg: Inputs.color({value: '#000', label: "BG Color"}),
})
)}

function* _3(DOM,width,height,d3,projection,inset,colors,graticule,countries,vx,vy)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);

  function draw() {
    // Save current context so it can be restored later.
    context.save()
    // The pattern for context is to create a path and THEN fill or stroke it.
    context.beginPath()

    function haze(alpha=0.5, r1=0, r2=height/2 - inset) {
        context.save()
        var grd = context.createRadialGradient(width/3, height/3, r1, height/2, height/2, r2);
        grd.addColorStop(0.0, colors.bgHaze1);
        grd.addColorStop(0.35, colors.bgHaze2);
        grd.addColorStop(1, colors.bg);
        // Fill with gradient
        context.globalAlpha = alpha
        context.fillStyle = grd;
        context.beginPath()
        context.arc(width / 2, height / 2, r2, 0, 2 * Math.PI, false);
        context.fill()
        context.restore()
    
    }
    haze(0.5, 0, width*1.5)

    // Draw globe circle to draw over
    context.fillStyle = colors.oceanFill;
    context.beginPath()
    context.arc(width / 2, height / 2, height / 2 - inset, 0, 2 * Math.PI, false);
    context.fill()
    

    // Set resampling precision for drawing the graticule. 
    // Our projection will need to add extra points to our lines so they dont look janky.
    projection.precision(0.2); 
    // Lets go for a black semitranparent stroke.
    context.strokeStyle = colors.graticule;
    context.globalAlpha = 1;
    path(graticule); // Create the path
    context.stroke(); // Stroke that path.

    // Draw our country geojson
    if (countries.features) {
        context.globalAlpha = 1;
        context.fillStyle = colors.countryFill;
        context.strokeStyle = colors.countryOutline;
        context.lineWidth = 1;
        projection.precision(0); // Dont resample country geometry
        for (const feature of countries.features) {
            context.beginPath();
            path(feature);
            context.fill();
            context.stroke();
        }
    }

    // Draw a circle around the edge of the sphere
    context.globalAlpha = 0.1;
    context.beginPath();
    context.lineWidth = 1;
    context.arc(width / 2, height / 2, height / 2 - inset, 0, 2 * Math.PI, false);
    context.stroke();   

    haze(0.3, 0, width)
    // Restore our context before we finish
    context.restore()
  }

  while (true) {
    // Wipe the canvas.
    const t = performance.now();
    const rot = [vx * t, vy * t];
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    draw();
    projection.rotate(rot);
    yield context.canvas;
  }
}


function _4(md){return(
md`# Appendix`
)}

function _countries(FileAttachment){return(
FileAttachment("custom.geo.json").json()
)}

function _inset(){return(
50
)}

function _height(width){return(
width / 2
)}

function _vx(){return(
0.03
)}

function _vy(){return(
-0.05
)}

function _projection(d3,inset,width,height){return(
d3.geoOrthographic()
    .fitExtent([
        [inset, inset], [width - inset, height - inset]], // The region we want our sphere to fit in.
        {type: "Sphere"}
    )
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["custom.geo.json", {url: new URL("./files/c47d86a5f6e479788307e8da3ed59a9eeb7d89e6f57fa8a508e6a2ec8e0e9f070c764e2a8b289724679309e97d32301e62070398016a76f7f440dbe400566dea.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof colors")).define("viewof colors", ["Inputs"], _colors);
  main.variable(observer("colors")).define("colors", ["Generators", "viewof colors"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","width","height","d3","projection","inset","colors","graticule","countries","vx","vy"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("countries")).define("countries", ["FileAttachment"], _countries);
  main.variable(observer("inset")).define("inset", _inset);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("vx")).define("vx", _vx);
  main.variable(observer("vy")).define("vy", _vy);
  main.variable(observer("projection")).define("projection", ["d3","inset","width","height"], _projection);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  return main;
}
