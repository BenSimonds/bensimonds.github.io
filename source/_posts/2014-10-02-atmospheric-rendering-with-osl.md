---
title: Atmospheric Rendering with OSL
date: '2014-10-02'
tags:
- atmosphere
- nishita
- osl
- planets
- procedural
- quick projects
- scattering
- shader
- shading
- skies
- sky
- textures
- volumetric
author: Ben Simonds
markdown:
  gfm: false
alias: blog/posts/2014-10-02-atmospheric-rendering-with-osl

---

None




# Comments


Joe (Aug 07, 2018)
> How do you get the planet to appear anywhere else on the screen except the very bottom? Its a tad inconvenient.

KazanNInja (Nov 15, 2015)
> Can you post a node setup with the earth?
> 
> Thanks

Deane Saunders-Stowe (@DSaundersStowe) (May 11, 2016)
> Stunning output, and exactly what I've been hunting months for!

Alex (Aug 19, 2015)
> Hi Ben,
> 
> When I put external file to script node and click reload i get:
> error: No shader function defined in console.
> I use Blender 2.75a. What can be wrong?
> 
> Best regards.
> Alex

Alex (Aug 19, 2015)
> Ok!. It seems to work great when text pasted.
> Is it possible to somehow "convert" it to bitmap to speed it up with static shots? It's now really slow compared to internal blender sky.

Ben Simonds (Aug 19, 2015)
> You could put an equine angular camera in the scene and render out a HDR. Then use that as your environment map.

Ben Simonds (Jul 09, 2015)
> Like I say, the scene has *zero* geometry. It's all a world shader including the planet.

vibersoul (Dec 22, 2014)
> How to connect the inputs? this is what i'm trying to do to get earth atmosphere:
> http://digilander.libero.it/cauldron/screen.jpg

Ben Simonds (Dec 22, 2014)
> You font need a mesh for this shader - it works when plugged into the background node. 

vibersoul (Dec 22, 2014)
> yes i've tried already..but the effect to me appears behind the planet..not the same as your screenshots! should i add another layer? and also how to make it coincide with planet position and sun direction? thank you!

Ben Simonds (Dec 22, 2014)
> So for my scene i also rendered the planet's surface as a background shader. No geometry in the scene. I can send you an example file later if you're interested.

Ryan (May 06, 2015)
> I'm wondering if there are any tips for making the horizon look convincing with this. Should I do a large sphere for the ground or just hide the horizon with hills?

Andreas (Nov 21, 2014)
> Hi Ben, 
> 
> i really like this shader! Is it anyway possible to tell us how we can use this to render a real planet (Texture etc) or better if it's possible to combine the shader with this one: https://github.com/sambler/osl-shaders/tree/master/combine-multiple/FBImagePlanet ?
> 
> best regards 
> Andreas

Omi (Aug 26, 2015)
> Hey Alex, would you mind describing how you got it to work? I tried connecting Sky to World Output: Surface but I don't see anything.
> 
> Thanks,
> Omi

Omi (Aug 26, 2015)
> Hi Ben,
> 
> For newbies like me, would you mind tell me how to use the OSL script in blender? I have it pasted as an internal script under World &gt; Surface. It shows three outputs, but how do they connect to World Output in the node editor?
> 
> Thanks,
> Omi

Dean (Apr 23, 2015)
> Could you post or send me a screenshot of your node setup or an example file for one of your planet renderings?
> 
> Many thanks!

LiChen (Apr 07, 2017)
> Thank you very much!! The sky looks amazing!
> I searched hours but really couldn't find anything about how to set up this node like that sunset gif...I'll be very appreciate it if you can post a node screenshot:D

c4dtoa4life (Feb 07, 2019)
> How would you set this up with Arnold Render?

sallu (Aug 22, 2019)
> Can someone please upload a blend file using this OSL shader?
> Thanks.
