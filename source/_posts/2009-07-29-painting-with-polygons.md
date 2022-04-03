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







# Comments


Reyn (Aug 11, 2009)
> Very interesting, indeed.  Thanks for the blend file.  I'll try that at as soon as possible. ^_^

Нефотореалистичный рендеринг: рисуем полигонами / Теория / artnotes.ru / CG, blender, photoshop, 3ds max, уроки, информация (Aug 24, 2009)
> [...] Автор: Ben Simonds [...]

Non-Photorealistic Rendering Test | Robert Murrish (Mar 07, 2011)
> [...] a test I did based on a technique detailed by Isaac Botkin at Siggraph 2009. I must also credit Ben Simonds for introducing me to the technique and pointing me to that Siggraph paper. As always with a render [...]

Kevin (Jan 12, 2011)
> Hi Ben, the above link for the blend file seems to be broken. Any chance you could take a look, I'd like to look into this technique and the file would answer a few questions I'm thinking. It's a very cool look for npr types of renders.
> 
> Cheers,
> Kevin

bensimonds (Jan 14, 2011)
> Thanks for pointing that out. I've uploaded the file to blendswap: http://www.blendswap.com/3D-models/materials/painting-with-polygons/

Diehl Art Gallery (Jun 27, 2010)
> Interesting work, all the best!

Pri Argoud (Feb 25, 2016)
> Hi Ben, same problem with the file here... link's broken :(

Sebastian Sanchez-pena Lemos (Oct 06, 2017)
> Here is the new working link: https://www.blendswap.com/blends/view/4562
