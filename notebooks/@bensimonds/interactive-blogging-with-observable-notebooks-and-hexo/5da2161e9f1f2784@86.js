// https://observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@86
function _1(md){return(
md`# Interactive Blogging with Observable Notebooks and Hexo
## Inspired by Robin Linacre's [Interactive blogging with Observable Notebooks and Gatsby.js](https://www.robinlinacre.com/interactive_blogging/)`
)}

function _2(md){return(
md`I recently read Robin Linacres post on using observable to author interactive blog posts, and publishing the results to your personal website. Since my personal site is built on Hexo - a very similar style of static site generator, I wanted to try out a very similar sort of thing thing.`
)}

function _3(md){return(
md`---
### Steps

The steps are very similar to Robins, with a few adjustments.

1. Create your notebook in observable.
2. Use the download code option in observable to find the link to your notebook code. For example, the url to download this notebook is \`https://api.observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@81.tgz?v=3\`.
3. Add this link to your javascript dependencies for your project with \`yarn add <url>.\`
4. We need some way to copy our notebook code from our \`node_modules\` folder to the \`public/\` folder when we build our static site. I added a step in my github actions workflow to do this. For developing locally I wrote a hexo script that does the same.
5. I created a helper function in hexo that generates the script and the div the notebook renders into and updated my post template to look in the post metadata for a \`notebook\` attribute and call the helper function.

\`post.md\`:
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

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  return main;
}
