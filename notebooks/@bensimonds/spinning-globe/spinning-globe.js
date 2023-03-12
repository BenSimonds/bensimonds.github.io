// URL: https://observablehq.com/@bensimonds/spinning-globe
// Title: Spinning Globe
// Author: Ben Simonds (@bensimonds)
// Version: 145
// Runtime version: 1

const m0 = {
  id: "13bfad22ac57d5a3@145",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Spinning Globe`
)})
    },
    {
      name: "viewof colors",
      inputs: ["Inputs"],
      value: (function(Inputs){return(
Inputs.form({
  countryOutline: Inputs.color({value: '#d61f1f', label: "Country Outline"}),
  countryFill: Inputs.color({value: '#800a21', label: "Country Fill"}),
  oceanFill: Inputs.color({value: '#060623', label: "Oceans"}),
  graticule: Inputs.color({value: '#152123', label: "Graticule"}),
  bgHaze1: Inputs.color({value: '#0eb7e1', label: "BG Haze 1"}),
  bgHaze2: Inputs.color({value: '#045181', label: "BG Haze 2"}),
  bg: Inputs.color({value: '#000', label: "BG Color"}),
})
)})
    },
    {
      name: "colors",
      inputs: ["Generators","viewof colors"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["DOM","width","height","d3","projection","inset","colors","graticule","countries","vx","vy"],
      value: (function*(DOM,width,height,d3,projection,inset,colors,graticule,countries,vx,vy)
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
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Appendix`
)})
    },
    {
      name: "countries",
      inputs: ["FileAttachment"],
      value: (function(FileAttachment){return(
FileAttachment("custom.geo.json").json()
)})
    },
    {
      name: "inset",
      value: (function(){return(
50
)})
    },
    {
      name: "height",
      inputs: ["width"],
      value: (function(width){return(
width / 2
)})
    },
    {
      name: "vx",
      value: (function(){return(
0.03
)})
    },
    {
      name: "vy",
      value: (function(){return(
-0.05
)})
    },
    {
      name: "projection",
      inputs: ["d3","inset","width","height"],
      value: (function(d3,inset,width,height){return(
d3.geoOrthographic()
    .fitExtent([
        [inset, inset], [width - inset, height - inset]], // The region we want our sphere to fit in.
        {type: "Sphere"}
    )
)})
    },
    {
      name: "graticule",
      inputs: ["d3"],
      value: (function(d3){return(
d3.geoGraticule10()
)})
    }
  ]
};

const notebook = {
  id: "13bfad22ac57d5a3@145",
  modules: [m0]
};

export default notebook;
