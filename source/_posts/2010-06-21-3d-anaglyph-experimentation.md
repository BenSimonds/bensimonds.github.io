---
title: 3D Anaglyph Experimentation
date: '2010-06-21'
tags:
- 3d
- anaglyph
- blender
- compositing
- quick projects
- red blue anaglyph
- red cyan
- tutorials
author: Ben Simonds
alias: blog/posts/2010-06-21-3d-anaglyph-experimentation

---

![>< ><](/images/old/clint3d.jpg)


I got a pair of 3D anaglyph glasses off amazon the other day, and had a go at creating anaglyph 3D images. The method is actually extremely simple - all you need is a right eye and a left eye image (place two cameras slightly apart but pointed at the same point in the scene, and render both), which are combined to make a single anaglyph. This is easily done using the combine/separate RGBA nodes in blender's node editor. You just take the red channel from the left image and the blue and green channels from the right image, and combine them to get the result. Like so:

![>< ><](/images/old/3d.png)

This gives pretty good results. One thing to note though is that the red channel of an image contains less texture information, and so desaturating the left eye image slightly before separating the channels can give better results. You can see in the node set-up above I have used a HSV node to do this. The method also works for animation - just import a sequence or movie file for each eye (yup, you'll have to render twice) instead of a still image. 

Animated gif:

![>< ><](/images/old/gunspin.gif)

