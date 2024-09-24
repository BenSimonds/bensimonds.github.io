---
title: Depth of Field in Blender
date: '2011-06-01'
tags:
- blender
- blur
- bokeh
- compositing
- depth of field
- dof
- focal blur
- focus
- tutorials
author: Ben Simonds
alias: blog/posts/2011-06-01-depth-of-field-in-blender

---

Depth of Field can be a beautiful effect, adding both aesthetic interest to an image, and serving a narrative purpose in drawing the viewer's attention to the centre of attention. But getting DoF right using Blenders compositing nodes can be tricky, as there are a few things to know about how the defocus node works, and some limitations it has that you need to know about. This post documents my own investigations, and hopefully should be useful for those new to the topic. It also touches on a few things that I haven't worked out how to fix yet, so if there's anyone out there with input I'd love to know your opinions.

**The Basics:**

In real photography, depth of field is the effect whereby objects located away from the camera lenses plane of focus appear blurred. We can all read wikipedia ([Depth of Field](http://en.wikipedia.org/wiki/Depth_of_field), [Bokeh](http://en.wikipedia.org/wiki/Bokeh)), so I'll leave a deeper understanding of optics as an exercise for the reader. For the purposes of this post, there are two things we are concerned about: Achieving a result that is comparable with depth of field in real photography, and avoiding artefacts in still renders and animation. With this in mind, here is blenders defocus node:

[![>< ><](/images/old/defocus.gif)](/images/old/defocus.gif)

This node takes two inputs: the image to be blurred (the yellow "image" input), and some way of telling the defocus node how much to blur different parts of that image (the grey value node labelled "Z"). The settings for the defocus nodes are as follows:

  * **Bokeh Type:** Allows the user to set the shape of the aperture used to generate the [bokeh](http://en.wikipedia.org/wiki/Bokeh) effect. This allows you to mimic the effect that the aperture blades of a camera would have on the shape of the bokeh blur. The "angle" allows you to rotate the shape used.
  * **Gamma correction:** Gamma corrects the image before blurring it, generally leave off if you have colour management turned on in your render settings, though it can give a nice effect sometimes of brightening the bokeh effect, which might be desirable.
  * **f-stop:** With "Use Z-Buffer" enabled, this sets the amount of blur applied. Each halving of the default values will double the amount of blur.
  * **BThreshhold:** Corrects artifacts around in-focus objects on a far-away (or non-existent) background. In general this can be left at one. Also note the tips later on always having a physical background where possible.
  * **Preview:** For getting quick (but noisy) results to see how the size of the blur effect looks, turn this on. You'll almost always want it switched of for final renders though. Handy when working with a large image and you're still messing with compositor nodes. Samples is fairly self explanatory.
  * **Use Z-Buffer:** Turn this on to use the cameras depth of field settings for the defocus. Remember to plug the z-pass from the render node directly into the defocus node. Turn it off to use any kind of mask or set the amount of blur manually using a value input.
  * **Z-Scale:** With "Use Z-Buffer" turned off this multiplies the amount of blur caused by the Z input. If set to 1, a value of 1.0 from the input will give a blur radius of 1px. Turn up for more blurring.



Depending on how we want to achieve our depth of field effect, there are three different sources we can use for the latter input.

* **Z-Buffer Method:** This is the more straightforward method, in which we plug the z-buffer output from our render node straight into the Z input of the defocus node. This will then use the cameras Depth of Field settings (you can set it either to a used defined value, or to follow a specific object in the scene) to automatically generate the depth of field effect. This approach has several advantages: 
  * It's simple.
  * It allows the focal distance to be easily set and animated (for example to keep a moving object in focus).

But it also poses some problems:

  * The amount foreground and background blur are not independently controllable.
  * Artifacts occur around foreground objects, where they border objects that are in focus, resulting in sharp edges on otherwise blurry objects. Note the sharp edges and artifacting on the out-of focus foreground area in the bottom left of the animated gif below.

[![>< ><](/images/old/defocus_m11.gif)](/images/old/defocus_m11.gif)

[![>< ><](/images/old/gif_dof_basic.gif)](/images/old/gif_dof_basic.gif)

The former issue is easy to solve, the latter one more difficult, but both require splitting apart the foreground and background blur and using a custom value input for the "Z" input of the defocus node. I'll refer to this as a "mask" based method, as essentially what we will be creating is a mask input for the defocus node showing which parts we want blurred, and which should be in focus.

  * **Mask Method:** In this method, we split the foreground and background blur and apply the defocus affect for each separately. First, we blur the background:

[![>< ><](/images/old/defocus_m2a.gif)](/images/old/defocus_m2a.gif)

The "map to" node takes the z-buffer and turns it into a mask we can use for the defocus. Using the offset, we can set a distance from the camera (using negative value), ane with the size setting we can control the rate of falloff. Here is the result of the map to node below:

![>< ><](/images/old/m1.jpg)



And here is it's effect when used as the input for the blur node (don't stare at this one waiting for it to animate... it wont).
![>< ><](/images/old/r1.jpg)

](/images/old/r1.jpg)



Then we blur the foreground, using a more complex node setup that also fixes the artifacts around foreground objects.
[![>< ><](/images/old/defocus_m2b.gif)](/images/old/defocus_m2b.gif)

The map to node works the same as before, isolating the foreground parts of the image (note that this time the scale value is negative, making the background black and the foreground white). Then a ColourRamp node is used to flatten the values of the depth pass down from "float" values to something between 0 and 1. This is so that the blur applied later works correctly, but it does have the side effect that the foreground gets blurred a bit more evenly than the background. But given that the range involved is smaller anyway, you can kinda get away with this. You can always compensate with a higher size value on the defocus node if you need. The mask then gets dilated and blurred (so that some pixels around the edges of foreground objects are also defocussed, fixing the artifacts discussed above). The resulting mask looks like this (I've traced the outline of the mask before the dilate/blur to show what has been added):

![>< ><](/images/old/m2a.jpg)



This node is then used as the "Z" input for the second defocus node, which does the foreground blur on top of the already bacground-blurred image. The result: 

![>< ><](/images/old/gif_dof_compound.gif)](/images/old/gif_dof_compound.gif)

As you can see the result doesn't have the artifacts present in the more basic setup. However there are still some issues to think about: 
  * This method might not cope well with larger amounts of foreground blur due to the dilate/blur nodes.
  * This is more difficult to animate than the basic method as the map to nodes now control what areas are in focus, instead of the handy camera properties. However if you still need to animate the DoF distance, these values can of course be keyed or even driven with constraints to provide similar functionality.
  * This will render slower, as two (computationally intensive) defocus nodes have to be composited for each frame.


The third method for doing DOF blur is simpler to build, but takes a little longer to set up and render. It's also not applicable in scenes where the transition between foreground and background are more continuous in nature. This is because we split the image into foreground, in-focus midground, and background layers and render and apply the defocus separately. On the bright side this works great for many standard kinds of shots. For this example the scene I've been using above isn't so appropriate, so I'll switch to something else:

[![>< ><](/images/old/gif_dof_layered.gif)](/images/old/gif_dof_layered.gif)

  * **Layer Method:** As with the mask method before, we start by blurring the background in the same way. But this time our foreground can be conveniently split into another layer entirely. Because of this we can quite easily do the foreground blur separately and just add it over the top. This way we can apply a uniform defocus to the foreground layer (no z input, just set the value), and not even have to worry about artefacts at the boundaries of objects.

[![>< ><](/images/old/defocus_m3.gif)](/images/old/defocus_m3.gif)

Background (not aliased, anti-aliasing occurs after all other nodes with FSAA on):

![>< ><](/images/old/r3a.jpg)

Foreground:

![>< ><](/images/old/r3.jpg)





Anyway, those are my thoughts on doing depth of field in blender. Some final tips:

  * **Turn on FSAA!** This is really important for getting nice DoF, as applying the defocus node to antialiased images can result in all sorts of fringing and artifacts. Alternatively turn off Anti-Aliasing completely, render at double size and scale down.
  * Wherever possible have some kind of physical background to your whole image, rather than relying on the default sky background, as the extreme differences in Z-distance are frequent causes of artefacts from the defocus node.
  * You can also use the regular blur node for depth of field using the mask or layer methods described above. These nodes are generally faster, but don't give such nice bokeh effects or offer as many settings to play with.


Some further limitations:

  * As discussed, there are some issues with artifacting when doing basic DoF, and to some extent you may always be fighting these.
  * Bokeh in real physical cameras is a much more complex beast than the defocus node really allows for, and is affected and distorted by all manner of things. It interacts with lots of other aspects of a shot, such as vignetting and lens distortion, some of which you can fake with the compositor, others which may be more difficult or even impossible to apply as a post-processing effect. One reason for this is that real depth of field would actually require sampling points on surfaces that are occluded by geometry as the camera sees things, so it's never going to match the real thing.



Further reading:

  * [Defocus node wiki documentation](http://www.blender.org/development/release-logs/blender-243/composite-defocus/) (blender 2.49, but all the settings are still the same).
  * [Depth of field on Wikipedia](http://en.wikipedia.org/wiki/Depth_of_field)
  * [Bokeh on Wikipedia](http://en.wikipedia.org/wiki/Bokeh)
