// https://observablehq.com/@bensimonds/interactive-blogging-with-observable-notebooks-and-hexo@76
function _1(md){return(
md`# Interactive Blogging with Observable Notebooks and Hexo
## Inspired by Robin Linacre's [Interactive blogging with Observable Notebooks and Gatsby.js](https://www.robinlinacre.com/interactive_blogging/)`
)}

function _2(md){return(
md`---
### Steps`
)}

function _3(md){return(
md`I recently read Robin Linacres post on using observable to author interactive blog posts, and publishing the results to your personal website. Since my personal site is built on Hexo - a very similar style of static site generator, I wanted to try out a very similar sort of thing thing.`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  return main;
}
