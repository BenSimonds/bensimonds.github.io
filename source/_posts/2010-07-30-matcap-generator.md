---
title: Matcap Generator
date: '2010-07-30'
tags:
- blender
- blender 2.5
- generator
- matcap
- material
- quick projects
- resources
- sculpting
author: Ben Simonds
alias: blog/posts/2010-07-30-matcap-generator

---

Edit: I've updated the .blend download to fix an issue with the rendered matcap images not aliasing correctly when used as matcaps, but to get the most out of the matcap images at the bottom you may want to crop the outer few pixels from the outside of the image. Alternatively if you're using them in blender, just set the "size" option in the texture mapping options to 0.98 in each direction

![>< ><](/images/old/matcaps.jpg)


Whilst doing some sculpting today I found myself casting around for some nice matcap images to apply to my sculpt. Whilst zbrush central has some great ones that are well worth checking out, these all come in a rather unhelpful .zmt format, which if you dont have zbrush are difficult if not impossible to export to something you can use in blender. So I thought it would be simple enough to build my own matcap generator in blender that I could use to generate whatever material I liked and render it as a matcap style sphere. It was a fairly quick process and the results work rather well as matcap images for my sculpts. I thought I'd share the generator .blend and a few of the matcaps I generated for anyone interested in doing some sculpting in blender, or just showing off the results.

You can download the generator .blend file from [BlendSwap](http://www.blendswap.com/blends/view/4060) , see after the jump for the matcap images themselves.

![>< ><](/images/old/generator.jpg)

As you can see it's a pretty simple blend file. just a sphere with a basic three point lighting rig and some planes for ray traced reflections. You can mess around with the world settings and material settings on the sphere to get all sorts of results though.

Here are the seven matcap images used for the renders above. To use them, just create a shadeless material for your model and then add the image as a texture mapped to the materials normal co-ordinates. Then, in the display settings panel of the transform sidebar (hit "N" while in the 3D view to bring it up) set the shading mode to GLSL and set the window draw mode to textured. The generator file also includes a sample matcap material if you need to know the specifics of how to set it up.

![>< ><](/images/old/generator11.jpg?w=150)

![>< ><](/images/old/generator2.jpg?w=150)

![>< ><](/images/old/generator3.jpg?w=150)

![>< ><](/images/old/generator5.jpg?w=150)

![>< ><](/images/old/generator7.jpg?w=150)

![>< ><](/images/old/generator6.jpg?w=150)

![>< ><](/images/old/generator8.jpg?w=150)

![Creative Commons Licence](http://i.creativecommons.org/l/by/3.0/88x31.png)

This work by [Ben Simonds](bensimonds.com) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/). Based on a work at [bensimonds.com](http://bensimonds.com/2010/07/30/matcap-generator/).



