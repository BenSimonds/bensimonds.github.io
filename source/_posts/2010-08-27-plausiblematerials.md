---
title: Physics and Creating Plausible Materials.
date: '2010-08-27'
tags:
- blender
- blender 2.5
- diffuse
- light
- material
- materials
- reflection
- rendering
- shaders
- specularity
- textures
- tutorials
author: Ben Simonds
markdown:
  gfm: false
alias: blog/posts/2010-08-27-plausiblematerials

---

None




# Comments


comeinandburn (Nov 27, 2010)
> Thanks this was helpful.  Although Blender's materials aren't physically accurate I'm always amazed at some of the really nice renders that are produced with it.  I guess it's just a matter of being familiar with how it responds.
> 
> great post!

GotemCZ (Nov 06, 2010)
> Thank you for this helpful topic :)

bensimonds (Aug 28, 2010)
> Thanks for your comment Matt. I've tried to edit the post to reflect what you pointed out. I was aware that (obviously) blender internal was non-physical, but I had always assumed that the material settings at least reflected the proportion of light that a material reflected, and thus conserved (or at least appeared to conserve) energy, thanks for setting me straight.

Reyn (Aug 29, 2010)
> That was a mind-opener, Ben.  Thanks for sharing your thoughts on this.  I didn't know that physically speaking the diffuse plus specular is less than or equal to 1.  Thanks a bunch.
> 
> -Reyn

hperigo (Aug 29, 2010)
> thanks for the answer!!
> 
> i got one more question:
> A specular highligth strength (or size?) depends of a fresnel value?

bensimonds (Aug 29, 2010)
> Specular strength *should* depend a Fresnel term, being stronger at lower viewing angles (as mirror reflections are with the Fresnel value turned up).  However with basic Phong and Cook-Torrence specular, they do not. However (to my understanding at least) the blinn specular shader does take viewing angle into account, based on the IOR of the material, and is physical in at least as far as the specular strength varying with the viewing angle is concerned.
> 
> I managed to find a pretty good explanation <a href="http://www.blender.org/forum/viewtopic.php?t=1017" rel="nofollow">here</a> if your'e interested, it's back from when the blinn specular model was first being implemented in blender, scroll down to cessen's second post for a better explanation than I can manage.

hperigo (Aug 31, 2010)
> ummm cool!
> there is a nice tutorial on how to create a blacklight shader in maya:
> http://www.creativecrash.com/maya/tutorials/rendering-lighting/shaders/c/backlight-shader
> 
> it basically is a blinn shader with the eccentricity value plug in to the "facing ratio" of a surface, gives a cool effect.
> 
> bye!

Matt (Aug 28, 2010)
> Unfortunately using blender's renderer to teach these concepts doesn't work very well because blender's renderer is completely non-physical, not just in the sense of realistic GI, but at the fundamental level of how its shading system works. 
> 
> Eg. 
> * Blender's materials don't conserve energy - it's easy to get them reflecting more light than is shining on them. They're not normalised either, so the overall amount of light reflected is dependent on the surface roughness (which it shouldn't!)
> * So therefore, blender's specular intensity sliders don't really mean that much in the context of trying to get it to conserve energy.
> * Having rough 'specular highlights' (which are really just cheap representations of reflections of point light sources from a partially glossy surface) on top of crisp mirrored reflections is impossible, as is the idea of an evenly blended 'diffuse + mirror' or 'diffuse + spec' material. In the real world similar combinations can occur due to layering, but usually they're weighted with a fresnel term. eg. a varnished wooden table can look 'diffuse' when you look straight down on it since you're looking at the rough/diffuse wood itself through the dielectric varnish, but then as you look at glancing angles it looks mirrored since the fresnel term of the varnished layer takes over and more strongly reflects light from the reflection vector. This also ensures conservation of energy since any light reflected by the top varnish layer doesn't continue penetrating through to then be diffusely reflected off the wood layer a second time.
> 
> And so on..
> 
> Anyway, some of the things you raise there can at least help to get a somewhat more realistic result than if people left the materials to the default, but due to the (can I say crap?) way blender's shading system works, some of the conclusions you draw about energy conservation at least are incorrect.

bensimonds (Aug 27, 2010)
> In answer to your questions:
> 
> 1. Not a trick. The position of specular highlights depends on the viewing angle because only those rays that hit the surface at the right angle get reflected towards the eye/camera (unlike diffuse reflection, where rays get reflected at all angles, and so can be seen from any angle).
> 
> 2. The additions I talk about above are really just figurative, I just changed the material settings on the different spheres, one with just diffuse reflections, one with just specular, one with both. However, you could achieve the same thing either with material nodes or in the compositor, just be aware of how you have colour management set up as to what nodes you use, add if you are working in linear colour space, screen if you are working in sRGB.

hperigo (Aug 27, 2010)
> great post man!
> I just have two questions:
> 
> Specular shaders (like phong) are dependent on a camera angle and diffuse shaders are´nt (like lambert shader) is that a trick? or it happens in real life?
> 
> and the reflection pass is added to the diffuse pass? because if you do that in post-production you get some weird results.... (at least i do =D)

Joel (Aug 27, 2010)
> Thanks! This is a big help!

Energy Conservation | (Jan 21, 2015)
> [&#8230;] Left: A sphere with a high diffuse intensity, and low specular intensity. Right: High specular intensity, low diffuse. Middle: Maximum diffuse AND specular intensity. Note how it looks blown out and too bright for the scene (1) [&#8230;]

Julimar Araújo de Freitas (Sep 29, 2014)
> Super!!!

Hamza (Dec 09, 2021)
> Thanks, it helped me a lot for my thesis :3
