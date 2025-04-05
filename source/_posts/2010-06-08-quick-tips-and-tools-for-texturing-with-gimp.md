---
title: Quick Tips and Tools for Texturing With GIMP
date: '2010-06-08'
tags:
- ao map
- blender
- blur
- brushes
- filters
- gaussian
- gimp
- gimp brushes
- high-pass
- selective gaussian blur
- texture
- textures
- texturing
- tutorial
- tutorials
author: Ben Simonds
alias: blog/posts/2010-06-08-quick-tips-and-tools-for-texturing-with-gimp

---

![>< ><](/images/old/tex1.jpg)


GIMP may not have the technical bells and whistles of photoshop, but if you know your way around it, it still gets the job done. The following are a few of the tools and techniques I find most useful when working on textures in the GIMP.

**Transitions:** When cloning and painting textures from multiple sources, using hard edged brushes is a good way to avoid pixel soup. The difficulty of course is that the boundaries between different texture sources can then be very obvious. A good solution is to pick a nice grungy/splattery looking brush and set the size to random (as well as any pressure settings you want if you're using a tablet). This should give a nice fractal like pattern with reasonably hard edges, that is ideal for blending many kinds of textures, either with the clone brush or layer masks, I use it for all sorts of grungy stuff, as well as for painting skin. 

A nice brush setup for cloning and painting alpha masks.

![>< ><](/images/old/gradients2.jpg)

 
Click for full size . Transitioning between textures with this kind of brush gives nicer results than a smooth fade, maintaining the crispness of the textures throughout the transition. The black and white image on the right shows the alpha mask for blending between the layers.
![>< ><](/images/old/gradients1.jpg)


You can find theses kinds of brushes all over the place. I'll include a few links to my favourites at the end though. **Selective Gaussian Blur:﻿﻿** Probably my favourite filter, I regularly use this tool when texturing in the gimp. When baking AO maps it can be tedious to set the quality way up and wait around to get smooth results. Much easier is to bake at medium quality and blur the results to get rid of the results. With a simple Gaussian blur though any sharp edges in your bake will also get blurred, which you don't want. Selective gaussian blur gets around this by only blurring noise and slight differences, and maintaining sharp boundaries. Playing around with the settings will usually take your baked AO maps from noisy to nice and smooth in the press of a button. For best results do a small regular gaussian blur (say two or three pixels) first to smooth out the noise slightly, then run selective Gaussian blur to do the main work of smoothing out the texture. 

Left: Original baked AO texture. Middle: Simple 15px gaussian blur. Right: 2pixel gaussian blur followed by a 15px selective gaussian blur. Sharp edges are preserved but the noise is gone.

![>< ><](/images/old/selectivegauss.jpg)

It's also usefull for all sorts of other things, I often use it when working on bump or displacement maps to even out flat areas whilst keeping the sharper bumps. **High Pass Filter:** Another great filter for working on textures, it's sort of the opposite of a blur. It pulls out the high frequency detail and gets rid of the large details. This is fantastically usefull when trying to create seamless textures. High passed images also make great overlay layers for adding detail to a texture or render. 

The high pass filter removes the large features of your image, leaving only the details. This makes tiling your textures much easier. It can however remove a lot of the colour from a texture, and leave it feeling dull, so use it sparingly and think of ways to reintroduce that interest.

![>< ><](/images/old/highpass.jpg)

 ## Some great GIMP resources:
So that's a few tips that I find useful fairly often. Here's some links for useful plugins, brushes for texturing: 

  * DeviantArt is a great resource for [GIMP brushes](http://browse.deviantart.com/resources/applications/gimpbrushes/). In general there's a lot that aren't much use, but a number of the grungy/splatter type brush sets can be really helpful in creating textures. Here are two sets that I find [quite](http://akisu-sama.deviantart.com/art/GIMP-Grunge-Brush-Pack-2-13556205?q=boost:popular+in:resources/applications/gimpbrushes&qo=18) useful.
  * [Goro](http://www.area-56.de/_area56_data/news.php?mode=recent&page=0) is a fantastic digital painter, who has a pack of Photoshop brushes on his site available for download. You can find them [here](http://www.area-56.de/_area56_data/tutorials.html), along with some great tutorials. GIMP will actually use Photoshop .abr brush files just like any other brush if you put them in your _.gimp-2.6/brushes/_ directory. Not everything carries over (GIMPS brush engine is unfortunately nowhere near as sophisticated as Photoshops), but they work ok and it's a useful set.
  * GIMP Paint Studio provides some fantastic brushes and other tools for making painting in gimp easier. The downloads section on the site also has some excellent extra brushes too. [Check it out.](http://code.google.com/p/gps-gimp-paint-studio/)
  * If you're using ubuntu, you can find some great add-ons for the GIMP in synaptic package manager. Look up gimp-data-extras, which has some useful brushes (including the grunge brush from earlier in this post) and filters, and gimp-normalmap, which generates great normal maps from image textures. I'm sure with a bit of googling you can find these online as well.
