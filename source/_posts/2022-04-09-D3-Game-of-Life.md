---
title: D3 Game of Life
author: Ben Simonds
date: 2022-04-09 11:47:35
thumbnail: 'thumb.png'
summary: Creating Conway's game of life with d3.
tags: 
    - javascript
    - cellular automata
---

Resurrecting the blog with the occasional post about what I'm messing around with these days, starting with a bit Conway's game of life written in javascript with [d3](https://d3js.org/).


<div style="text-align:center; padding: 50px 0px 50px 0px">
    <div id='lifeDiv' style="margin: auto;">
        <svg style="background-color: #222226;" id='lifeSvg'></svg>
    </div>
    <button class="button-primary" style="margin: auto;" id="randomise" type="button">Randomise!</button>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.4.3/d3.js" integrity="sha512-eoH3qHpO0w6WxfCFAwXAKYOWdVUSbGwhMSdqEZKREs7eOzxjz+uu03fX0UbQh4CDyV+eZ3qG7oFXQLzcTVWqEg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{% asset_path 'life.js'%}">
</script>

Inspired by Mike Bostock's [Towards Reusable Charts](https://bost.ocks.org/mike/chart/).