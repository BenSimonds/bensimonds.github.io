// URL: https://observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo
// Title: Interactive Blogging with Observable Notebooks and Hexo
// Author: Ben Simonds (@bensimonds)
// Version: 197
// Runtime version: 1

const m0 = {
  id: "5da2161e9f1f2784@197",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Interactive Blogging with Observable Notebooks and Hexo
I recently read Robin Linacre's [post](https://www.robinlinacre.com/interactive_blogging/) on using observable to author interactive blog posts with [Gatsby](https://www.gatsbyjs.com/). Since my personal site is built on [Hexo](https://hexo.io/) - a very similar style of static site generator, I was inspired to try out a very similar sort of thing thing.

Lets start with a brief summary of what this post is about:`
)})
    },
    {
      inputs: ["width","d3","data"],
      value: (function(width,d3,data)
{
  const svgwidth = Math.min(width, 760)
  const height = 200;
  const margin = {left: 130, right: 40, top: 60, bottom: 10}
  const container = d3.create("div").attr("width", "100%")
  const svg = container.append("svg")
      .attr("height", height)
      .attr("viewBox", [0, 0, svgwidth, height]);
  
  const x = d3.scaleLinear()
    .domain([0, 1.0])
    .range([margin.left, svgwidth - margin.right]);
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
    .text("Proportion of this blog post by subject.");
  return container.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Steps

The steps are very similar to Robin's, with a few adjustments.

1. Create your notebook in observable.
2. Use the download code option in observable to find the link to your notebook code. For example, the url to download this notebook is \`https://api.observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@81.tgz?v=3\`.
3. Add this link to your javascript dependencies for your project with \`yarn add <url>.\`
4. We need some way to copy our notebook code from our \`node_modules\` folder to the \`public/\` folder when we build our static site. I added a step in my github actions workflow to do this. For developing locally I wrote a hexo script that does the same.
5. I created a helper function in hexo that generates the script and the div the notebook renders into and updated my post template to look in the post metadata for a \`notebook\` attribute and call the helper function.

To update the post, I just need to republish the notebook, and update my package.json file with the latest version number. Committing the change then rebuilds the static version of the page.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Hexo Setup
My post markdown just looks like the following. I just need to add the path to the notebook in the front matter, though I can add additional content that will appear below the main notebook too.
\`\`\`yaml
---
title: Observable Notebooks and Hexo
author: Ben Simonds
date: 2022-05-04 22:41:25
tags:
notebook: "@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo"
---
\`\`\`

The helper function looks like this:
\`\`\`javascript
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

\`\`\`ejs
<% if (page.notebook) { %>
  <%- observable_notebook(page.notebook) %>
<% } else { %>
  <h2><%- page.title %></h2>
<% } %>
\`\`\``
)})
    },
    {
      name: "data",
      value: (function(){return(
[
  {"label": "Technical Messing Around", "value": 0.95},
  {"label": "Actual Data Visualisation", "value": 0.05}
]
)})
    }
  ]
};

const notebook = {
  id: "5da2161e9f1f2784@197",
  modules: [m0]
};

export default notebook;
