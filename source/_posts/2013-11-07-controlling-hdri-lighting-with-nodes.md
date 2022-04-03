---
title: Controlling HDRI Lighting with Nodes
date: '2013-11-07'
tags:
- blender
- cycles
- hdr
- hdri
- lighting
- nodes
- resources
- shading
- tutorials
- world settings
author: Ben Simonds
markdown:
  gfm: false
alias: blog/posts/2013-11-07-controlling-hdri-lighting-with-nodes

---

None




# Comments


vitos1k (Nov 07, 2013)
> But doesn't it uses only 1 channel for  non color data(BW intensity) ? Where as for Color Data it uses 3 channels for RGB

Ben Simonds (Nov 07, 2013)
> I'm pretty sure that the colour/non-colour data option isn't to important for HDR images, as they're linear to begin with, and will be treated as such either way. It's more relevant when using images with lower bit depths that you might not want to be assumed to be in sRGB colour space, such as masks or normal maps.

Gumballs! | David Zerba (Nov 24, 2013)
> [&#8230;] used an HDR image made by Greg Zaal for the lighting, with a node setup created by Ben Simonds. With Ben&#8217;s node setup, the lighting was way more accurate and had a lot more [&#8230;]

Reynante M. Martinez (Nov 08, 2013)
> Amazing! Thanks for sharing this, Ben.  I linked this article to my original post as an update, I hope you don't mind. :)
> 
> -Reyn

Ike (Nov 13, 2013)
> Now all we need is a way to render a shadow pass from this lighting setup so it can be composited on live plates. Unfortunately Cycles currently can't seem to render a separate shadow pass for HDR lighting.

Ben Simonds (Nov 07, 2013)
> Nope. Colour/Non-Colour is an assumption about colour space, not how many channels an input has. Otherwise you'd see no colour in any of the renders here!

vitos1k (Nov 07, 2013)
> i was always wondering why everybody use "non-color data" for the color socket? why just don't use a node with set to "Color data" for color input, and "Non-color data" for the strength. Also as i found all these contrast difference is due to .hdr which is linear and is threated as linear for values, but does it dispalyed properly(for sRGB) when rendring?
> probably we just need to add Gamma adjustment node, and tweak 'look' of the texture. and adjust it's strength and contrast to get sharp shadows, while still have correct (not darkend) glossy reflections and background gamma. That's just my thoughts, no tests yet

Steven (Nov 11, 2013)
> So my question would be that, how did you realized what has to be done to achieve this node setup, and how  can i learn this?

David Zerba (Dec 03, 2013)
> Hey Ben, I've nominated you for the Dragon's Loyalty Award since you blog is really helpful and inspiring to me, I've learned a lot from it. You can see it here :http://davidzerba.wordpress.com/2013/12/02/dragons-loyalty-award/

Fred Flinstone (Mar 05, 2014)
> Seems like you are burning the blues of the image.
> Why not just crush the blacks and raise the highlights of the rendered image if it's contrast we're after?

Harleynut97 (Jan 17, 2015)
> Hey Ben, Someone recommended this technique, and I realize this was originally posted almost a year ago, but let me ask 2 questions
> 
> 1) When I downloaded your blend file the file name said V1 in it.  But yet you are discussing V2.  Is the file you have available to download V2 or V1?
> 
> 2) I opened this up in Blender version 2.72b official.  When I looked at your render settings both clamp direct and clamp indirect was set at 100.  I seems strange that the clamping would be at this extremely high level.  Could you confirm what it should be based on newer versions of Blender 2.72, 2.73
> 
> Thanks for sharing this technique.

mcolinp (Apr 29, 2018)
> The dropbox link is no longer working. Any chance I can download a copy of your sample blend file/node setup?
> 
> I am doing research in anticipation of 2,8 and Eevee. I would like to find a way to use these effects for interactive 3D wegl output. verge3D from soft8soft.com is my current tool of choice; though I have been patiently waiting for the release of 2.8 Eevee to be able to take advantage of the better materials and environment features.
