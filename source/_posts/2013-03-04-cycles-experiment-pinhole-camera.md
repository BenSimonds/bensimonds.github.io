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



