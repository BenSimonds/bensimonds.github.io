---
title: Painting With Polygons
date: '2009-07-29'
tags:
- blender
- cg
- quick projects
- siggraph
author: Ben Simonds
alias: blog/posts/2009-07-29-painting-with-polygons

---

Here's a great technique that popped up on the [forums](http://blenderartists.org/forum/showthread.php?t=162560), based on a siggraph paper by Isaac Botkin ([link](http://www.outside-hollywood.com/siggraph/)), here's their video:


<iframe title="vimeo-player" src="https://player.vimeo.com/video/5660045" width="640" height="360" frameborder="0" allowfullscreen></iframe>

 
What intrigued me about the technique is that it doesn't rely on any fancy algorithm, plug-in or rendering technique. Instead it uses displacement mapping to perturb the surface of the model and then motion-blurs the results of several displacements per frame to give the result. If the displacement is applied cyclically, i.e. it oscillates once per frame, then this is consistent over multiple frames and can even be used for animation. I've been having a play at doing this in blender and here are the results I've had so far:


<iframe title="vimeo-player" src="https://player.vimeo.com/video/5825247" width="640" height="360" frameborder="0" allowfullscreen></iframe>



For the truly interested, here's a [blendfile](http://www.blendswap.com/3D-models/materials/painting-with-polygons/). More after the jump...

[![PolyPaintingTest8 ><](/images/old/polypaintingtest8.jpg?w=300)](/images/old/polypaintingtest8.jpg)

What seems to help in particular is applying a Kirsch filter in the compositor, which brightens the image slightly and also dilates the colours a bit to give a more painterly feel. I particularly like the effect it has at low subdivision levels - it gives a cubist sort of effect: 

[![PolyPaintingTest2 ><](/images/old/polypaintingtest2.jpg?w=300)](/images/old/polypaintingtest2.jpg)



Rather a weird one: Looks like the brushstroke style used by Edvard Munch in The Scream. Except way out of control. 

[![PolyPaintingTest7 ><](/images/old/polypaintingtest7.jpg?w=300)](/images/old/polypaintingtest7.jpg)



Here, a rough paint texture is mapped to the screen space coordinates, and affects the surface normals of the mesh, altering the lighting to give a really nice paint effect. 

[![PolyPaintingTest3 ><](/images/old/polypaintingtest3.jpg?w=300)](/images/old/polypaintingtest3.jpg)





