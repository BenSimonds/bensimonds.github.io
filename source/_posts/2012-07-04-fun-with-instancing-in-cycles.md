---
title: Fun with Instancing in Cycles
date: '2012-07-04'
tags:
- blender
- cycles
- duplicates
- duplifaces
- fractal
- instancing
- quick projects
- suzanne
- tutorials
author: Ben Simonds
alias: blog/posts/2012-07-04-fun-with-instancing-in-cycles

---

I've been experimenting more with cycles lately, and one thing I'm really impressed with already is the speed with which it handles instanced objects. I thought I'd share some silly experiments I made in the process and also a tip for using instances.

![>< ><](/images/old/fractal1.jpg)


It's great fun to use instancing to create fractal-like structures out of repeating objects. The image above I call the monkeybulb - after the mandelbulb fractal - and is made up of over 9000 suzannes (though even this is small fry compared to [Agus3D's instanced forest](http://blenderartists.org/forum/showthread.php?249664)). It's made by repeatedly extruding all the individual faces of a cube, and then smoothing the results. I then create a suzanne object that I parent to the fractal mesh, and turn on Dupli Faces to create repeated instances of suzanne. The image below uses a similar strategy, using a few array modifiers to duplicate a plane.

![>< ><](/images/old/fractal2.jpg)


One thing that's important to note is that I dont use an array modifier to duplicate the cubes seen in the image. This would result in a non-instanced verison of the scene that would render slower - as the array modifier generates new geometry rather than instancing the same cuber over and over. Instead I use array modifiers to duplicate a plane, then apply these modifiers, and parent the cube to the applied mesh, once again using Dupli Faces to handle the duplication of the cube. The difference in render time that this produces is quite something, as demonstrated by the renders below. Because the array modifier doesn't produce instances, both rendering and creation of the bvh structure are significantly slower than when using Dupli Faces.

![>< ><](/images/old/instances.jpg)


Left: Duplicated using the Array modifier: 7.51 seconds. Right: Duplicated with Duplifaces: 2.53 seconds. 

Anyway, just thought it was a fun thing to experiment with and also a worthwhile tip to know. So far as I know, both duplifaces/verts and particle systems create genuine duplicates, whilst the array modifier does not. Hope it's useful and not trivially obvious to all but me!

Edit: Here's one more fractal-like render. This time an apollonian gasket made up of spheres. I used a development build to get use of the Object Data node, so that I could randomise the colour of each sphere.

![>< ><](/images/old/fractal3.jpg)

