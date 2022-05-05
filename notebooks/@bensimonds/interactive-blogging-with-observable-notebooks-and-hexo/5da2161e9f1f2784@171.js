// https://observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@171
function _1(md){return(
md`# Interactive Blogging with Observable Notebooks and Hexo
## Inspired by Robin Linacre's [Interactive blogging with Observable Notebooks and Gatsby.js](https://www.robinlinacre.com/interactive_blogging/)`
)}

function _2(md){return(
md`Lets start with a brief summary of what this post is about:`
)}

function _3(d3,width,data)
{
  const height = 200;
  const margin = {left: 130, right: 40, top: 60, bottom: 10}
  const container = d3.create("div").attr("width", "100%")
  const svg = container.append("svg")
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleLinear()
    .domain([0, 1.0])
    .range([margin.left, width - margin.right]);
  const y = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);
  // Plot Bars
  svg.append("g").attr("id", "bars").selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(0))
    .attr("y", d => y(d.label))
    .attr("width", d => x(d.value) - x(0))
    .attr("height", y.bandwidth())
    .attr("fill","black")
  // Show Axes
  const xAxis = d3.axisTop(x);
  xAxis.tickFormat(d3.format('.0%'))
  svg.append("g").attr("transform", "translate(0,50)").call(xAxis)
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y))
  // Add an axis title.
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", x(0.5))
    .attr("y", 20)
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Propoprtion of this blog post by subject." + width);
  return container.node();
}


function _4(md){return(
md`I recently read Robin Linacres post on using observable to author interactive blog posts, and publishing the results to your personal website. Since my personal site is built on Hexo - a very similar style of static site generator, I wanted to try out a very similar sort of thing thing.`
)}

function _5(md){return(
md`---
### Steps

The steps are very similar to Robin's, with a few adjustments.

1. Create your notebook in observable.
2. Use the download code option in observable to find the link to your notebook code. For example, the url to download this notebook is \`https://api.observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@81.tgz?v=3\`.
3. Add this link to your javascript dependencies for your project with \`yarn add <url>.\`
4. We need some way to copy our notebook code from our \`node_modules\` folder to the \`public/\` folder when we build our static site. I added a step in my github actions workflow to do this. For developing locally I wrote a hexo script that does the same.
5. I created a helper function in hexo that generates the script and the div the notebook renders into and updated my post template to look in the post metadata for a \`notebook\` attribute and call the helper function.

To update the post, I just need to republish the notebook, and update my package.json file with the latest version number. Committing the change then rebuilds the static version of the page.`
)}

function _6(md){return(
md`## Appendix:

### Examples of Hexo Setup
My post markdown just looks like the following. I just need to add the path to the notebook in the front matter, though I can add additional content that will appear below the main notebook too.
\`\`\`
---
title: Observable Notebooks and Hexo
author: Ben Simonds
date: 2022-05-04 22:41:25
tags:
notebook: "@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo"
---
\`\`\`

The helper function looks like this:
\`\`\`
hexo.extend.helper.register('observable_notebook', function(path){
    return \`
    <script type="module">
        // Load the Observable runtime and inspector.
        import {Runtime, Inspector} from "/notebooks/\${path}/runtime.js";
        // Your notebook, compiled as an ES module.
        import notebook from "/notebooks/\${path}/index.js";
        const target_div = document.getElementById("observable-div")
        const runtime = new Runtime();
        const main = runtime.module(notebook, Inspector.into(target_div));
    </script>
    <div id="observable-div"></div>
    \`
  });
\`\`\`

And my post template just has a section that looks like this.

\`\`\`
<% if (page.notebook) { %>
  <%- observable_notebook(page.notebook) %>
<% } else { %>
\`\`\``
)}

function _data(){return(
[
  {"label": "Technical Messing Around", "value": 0.95},
  {"label": "Actual Data Viz", "value": 0.05}
]
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["d3","width","data"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("data")).define("data", _data);
  return main;
}
