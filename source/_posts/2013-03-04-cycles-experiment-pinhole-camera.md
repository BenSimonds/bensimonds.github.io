---
title: 'Cycles Experiment: Pinhole Camera'
date: '2013-03-04'
tags:
- blender
- camera obscura
- cycles
- experiment
- pinhole camera
- quick projects
author: Ben Simonds
alias: blog/posts/2013-03-04-cycles-experiment-pinhole-camera

---

![obscura3 ><](/images/old/obscura3.png)

 Not much to look at is it? But it was an interesting experiment. The idea was to push cycle's physical realism to the absurd extreme of building a [pinhole camera](http://en.wikipedia.org/wiki/Pinhole_camera) in blender. A pinhole camera has no lens or aperture, instead the light just passes through a small hole in the front of the camera, and forms an inverted image on the camera's back wall (this is why the image above appears upside-down). The construction of a pinhole camera is very simple - it's a box with a hole in one side, so I figured that because Blender now has a physically accurate ray-tracer in the form of Cycles, it was probably possible to build one that worked in blender. Here's how mine looked:

![PinhileCamSetup ><](/images/old/pinhilecamsetup.png?w=872)](/images/old/pinhilecamsetup.png)


The "real" camera - i.e. a Camera object for rendering, is situated inside the pinhole camera, facing the back wall. The scene needed to be lit extremely brightly, in order for enough light to find it's way through the tiny hole in the camera, to illuminate the back wall. The two lamps have intensities of 100,000 of the key light and 20,000 for the fill light. The cycles preview outside the camera looked something like this:

![Screen Shot 2013-03-04 at 10.40.27 ><](/images/old/screen-shot-2013-03-04-at-10-40-27.png)



As you can see from the final render, the results are very noisy. Even more so when you consider that the small, noisy image you see is the result of 100,000 samples. I set the number of bounces to bounces for rendering to 3 (i.e. one bounce direct lighting, one for a small amount of indirect lighting, plus one extra bounce because we are viewing everything on the diffuse surface of the inside of the camera). It was actually really quick to render, as it was only a small image, and a relatively simple one at that ignoring the rather strange setup. It took about an hour, the only post processing I did was to brighten the image a bit. Whilst the final result isn't that impressive, you can clearly make out suzanne and the cube and cone. You can also see that the image is slightly blurry. With pinhole cameras there is no depth of field; instead the focus of the whole image is determined by the size of the pinhole - the smaller the hole the sharper the image. Of course the smaller you make the pinhole, the less light gets in, and so the dimmer the image becomes. This also means that for our virtual pinhole camera we get more noise if we try to bump the image up to the same brightness, so there is a tradeoff between noise and sharpness that we have to take into account. Anyway, it's hardly a useful way to go about creating images, but it is an interesting experiment, and a great demonstration of what cycles can do. You can download the blend file to have a go with it yourself [from blendswap](http://www.blendswap.com/blends/view/66915) (CC-Zero).





# Comments


Cycles Experiment: Pinhole Camera | BlenderNation (Mar 04, 2013)
> [...] Cycles Experiment: Pinhole Camera [...]

Francois Tarlier (Mar 04, 2013)
> This is really interesting. 
> with physical making so much  sense, I would wonder where the exposure time, and the film ISO could fit in. I know there is a film exposure parameter, yet I'm not quite sure how it works and so far if you can find some kind a match with ISO, you would still need an aperture speed settings. I don't know if this is possible. 
> 
> F.

Simon C (Mar 14, 2013)
> I've had a go at adapting this by increasing the aperture of the box and fitting a simple single element glass lens to the front thus making a simple box camera. The results were as one would expect. Next going to try re-creating my Symmar-s lens!

jfaurbo (Mar 04, 2013)
> Would be interested in trying to create a laser light. Creating the mirrors, the light, and then then pinhole... could be another interesting project

Craig Hellman (Mar 05, 2013)
> This is fantastic, I loved pinhole cameras when they were taking pictures of model railroads.
>   They looked so real. This is a really great experiment. Pushing Blender beyond the "box" ( of normal ).

Dave (Mar 05, 2013)
> Maybe try it in Lux and Yafaray - might be interesting

Wasa (Mar 05, 2013)
> You should be able to adjust exposure instead of relying on really bright lighting.
> It's also more physically accurate since pinhole cameras take much much longer exposure time in comparison to a standard camera.

David Hiestand (Mar 05, 2013)
> Very interesting experiment.  Did any hint of a diffraction pattern occur?

Francois Tarlier (Mar 05, 2013)
> yeah my point exactly ! 
> Having so real life unit as aperture speed and ISO would make things easier. Also to try to match a real shoot for compositing.

David Hiestand (Mar 05, 2013)
> Hmmm.  Now that I've thought about it, there shouldn't be any diffraction pattern.  A ray is ray not a wave.

John Kearvell (Mar 05, 2013)
> Of all the cycles experiments I've seen, this is hands down the best and most fun!  Oddly one of my kids brought a pin hole camera they made a school yesterday
> 
> Bravo.

Wasa (Mar 06, 2013)
> If I recall correctly, light is a wave.:
> Else:
>     I'm a dummy.

darenw (Jul 06, 2013)
> Yes, very impressive.  I'm amazed at what Cycles can do in terms of physical optics.  I had a go at this experiment, and also tried a large aperture with a lens (modified sphere with Glass shader).  I had to crank up the lights to absurd values, and set samples to something like 1000 - but my CPU overheated!

Pinhole Camera Trick in Blender | Motion Graphics and Compositing Craftsman Blaine Morehead (Sep 27, 2013)
> [&#8230;] Recently, 3D artist Ben Simonds recreated the pinhole camera, or &#8220;camera obscura&#8221; experiment completely in Blender. The results of this little test may not look all that interesting, but the physics it demonstrates are reality-based. Definitely check out his results here. [&#8230;]

Does Cycles work with wave optics? | XL-UAT (Mar 06, 2015)
> [&#8230;] you are interested in optics experiment with cycles, take a look at the pinhole camera and shaped [&#8230;]
