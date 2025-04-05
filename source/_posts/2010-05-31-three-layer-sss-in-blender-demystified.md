---
title: Three Layer SSS in Blender Demystified
date: '2010-05-31'
tags:
- blender
- material nodes
- materials
- node editor
- scattering
- shaders
- skin
- sss
- subsurface
- subsurface scattering
- textures
- texturing
- tutorial
- tutorials
author: Ben Simonds
alias: blog/posts/2010-05-31-three-layer-sss-in-blender-demystified

---

![>< ><](/images/old/final.jpg)


Something that gives a lot of people trouble when creating characters is implementing convincing subsurface scattering (SSS). Blender's SSS shader comes with a wealth of options that make it easy to customise how light scatters under a surface, but also makes it tough to hit on what options exactly make for convincing skin. Using a node based approach, one can create a three layer SSS shader that gives good, and reasonably physically correct results, and also makes making adjustments fairly straightforward. in this tutorial I use blender 2.5, but I used almost the exact same setup for my blending life entry in 2.49 and got much the same results (just without such fast ray-tracing, thanks blender devs!).  

## The Basics

A three layer SSS shader emulates skin by splitting the effect of the different layers of skin into different materials:

![>< ><](/images/old/sums.jpg)

These are added together in the material node editor, primarily using screen nodes (UPDATE: or add nodes, see my note at the end) so that the light from each layer is added to that of the layer below, resulting in the final composite material. Click for full size:

![Click for full size. ><](/images/old/nodesetup.jpg)


## Important SSS Settings

![>< ><](/images/old/ssssettings.jpg)


* _IOR:_ Index of refraction - this is the same as the IOR for raytraced reflection and refraction, and reflects the IOR of the medium. As people are about 60% water, and the IOR of water is 1.3, this is a suitable value to use. 
* _Scale:_ This is the big one. This is really important to get right as it will determine how far light scatters through the skin, and is the difference between looking like wax and getting nice skin. A scale of 1.0 means that one blender unit equals one millimeter - this is obviously way too large for most scenes. The average head is around 20 to 25cm tall, which would mean that if you scaled your head to exactly one blender unit high, that a value of 0.004 would give correct results. In general you may want to try a bit of tweaking to get the right results. Adjust accordingly for the size of your model according to this formula: size in blender units/real world size in millimeters = scale value. 
* _RGB radius:_ This allows you to set the relative scattering amounts for red green and blue light, in proportion to the scale value. This is important for skin as different colours of light scatter by different amounts under the skin. As a good rule of thumb, red light scatters the most, green light half as much as red, and blue light half as much again. So values of 1.0, 0.5 and 0.25 for red green and blue respectively should give good results. 
* _Colour:_ Colour influence. This controls how much the RGB colour picker in the SSS setttings affects the scattering, as a rule I generally set the colour to a dark grey to tone down the effect, and the colour value to 0. This is because we want the colour of the scattered light to be determined by our textures, not a generic colour all over the model. Not that even with the colour slider set to zero the, the colour you choose in the picker above will still affect the scattering. 
|* _Texture:_ This is another important one. It's more of a personal preference than the others, as this setting determines how much your textures are blurred by the scattering, higher values will blur the texture more. I prefer to leave this set to zero, as I like my textures to look crisp and I feel that this washes out the detail, particularly in the lower layers like the subdermal, but feel free to experiment. 
* _Scattering Weight:_ These determine the relative amounts of scattering from the front and back of the model. Because we are splitting up our three layer shader to isolate these effects, for the subdermal and epidermal material set front to 1.0 and back to 0.0. and for the back scatter material set back to 1.0 and front to 0.0. For further explanation of these settings, check the blender [documentation](http://www.blender.org/development/release-logs/blender-244/subsurface-scattering/). 

## Subdermal
You will note, that there are in fact more than three nodes. The three layers refer to the three different material nodes that use subsurface scattering. The first - the subdermal layer - simulates the light that penetrates to the deep layers of the skin, and spreads out the furthest. This light gets mostly absorbed by the skin, and only the deep red/orange colours of the blood and tissues are re-emitted. This is the most important layer for giving the material those rich saturated shadows that we see in natural skin. This is also the layer with the most important textures - as the subtle patterns of veins and capillaries, fatty tissues and bony areas beneath the skin are what give it much of it's realism.

![>< ><](/images/old/subdermal.jpg)

Settings: This layer is the most translucent, so I give it a slightly higher scale value to increase the scattering distance. In theory this isn't quite correct as the scale should be the same for all the layers. However in practice it is easier just to adjust the scale value, though you can also tweak the RGB scattering radii separately. Apart from that this layer is very simple. The subdermal texure is applied by means of a texture node mapped to the colour channel of the material node, using th UV output of the geometry node to correctly map the texture. No bump map is needed in my opinion as this layer is technically below the surface of the skin anyway, but if you are using a normal map to add mid-level detail such as creases and wrinkles, then that can be applied to this material.

![>< ><](/images/old/subdermal_settings1.jpg)

## Epidermal
This layer simulates the scatttering in the thinner epidermal layers of skin. The light that gets reflected from this layer has a more blueish tinge. The thickness of this layer varies widely - in areas like the eyelids and lips it is much thinner and so more of the subdermal layer shows through. This is reflected in the texture by colouring these areas more darkly. Because this is added to the subdermal layer by means of a screen node, darker areas on the texture mean that less is added on top of the sub dermal layer, allowing the redder subdermal colours to show through more.

![>< ><](/images/old/epidermal.jpg)

Settings: Another fairly simple material, the epidermal colour texture is mapped via a texture node as before. The scale value is set slightly lower, as light scatters less within this layer. This time as the epidermal layer is a surface layer, you may want to apply a bump map.

![>< ><](/images/old/epidermal_settings.jpg)

## Back Scatter
In areas such as the ears where the skin protrudes from the face (and other areas on the body like the gaps between the fingers), light may shine through the skin from the far side, giving it a reddish glow. In order to be able to tweak this effect separately, we isolate it from the other SSS materials by turning their back scatter values down to zero, and instead use a separate back scatter material node to control this aspect of the skin individually. This material does not really require a texture, as the colour is determined largely by the thickness of the skin the light has to shine through. This is a more subtle part of the material, and indeed may not be visible at all in many well lit environments. It tends to be most obvious when the subject is lit from behind. 

![>< ><](/images/old/backscatter1.jpg)

Settings: This is a really simple material. no textures, just a basic SSS shader with only back scattering. Unlike the other materials, here we use set the colour setting in the SSS panel to one. Set the scale value quite large, as this layer is for light scattering all the way through the skin (Again: I know this isn't physically correct, but it a nice easy way to tweak the result). 

![>< ><](/images/old/backscatter_settings.jpg)


## Diffuse
This material consists of the simple, diffuse reflected light from the skin, rather than that which is absorbed within the skin and re-emitted (so no SSS is required for this material). If you were to imagine a plaster of paris mask of the person, this is all the light you would see reflected (apart from specular reflections, which we will come to in a minute). This layer can be used to tweak the colours of the skin, to add pigmentation or makeup, and to "fix" any areas you don't like. Unlike the other layers you can experiment with different mix modes in the node editor to get different effects - you could keep it to a simple screen mode to just add a bit of diffuse light, or set the mode to mix to allow you to add darker colours as well. 

![>< ><](/images/old/diffuse.jpg)

Settings: This is just a super-simple Lambert diffuse shader, no specular, no SSS. Incidentally, this makes it an ideal material just for checking out how your lighting looks without having to wait ages for a full SSS render, just plug the output from this material node directly into the output node in the material node editor to see how your model looks without textures and shaders applied. This can be really useful when trying to troubleshoot renders that don't look right.

![>< ><](/images/old/diffusesettings1.jpg)

## Specular:

This layer is for the shiny reflections (both specular and mirror reflections, an artificial distinction in reality). The diffuse colour for this material is matte black, with reflection set to zero, as we only want specular and mirror reflections from this material. The shinyness of the skin varies over the face, with more oily areas such as the forehead, brows, and the bridge of the nose, and wet areas like the lips and around the eyelids reflecting more. We can control this by using a specular map - darker areas on the map reflect less, and the bright areas such as the lips and nose will give nice shiny reflections.

![>< ><](/images/old/specular.jpg)

This texture is mapped to the specular intensity and ray mirror (if you are using ray tracing) channels, set the blend mode to multiply to allow you to to control the maximum specularity using the materials settings, and the relative specularity of the different areas of the skin with the texture. In my node setup, I act﻿ually blend two specular materials together, one with a high hardness (around 90) and no ray mirror for the small "hot" highlights, and one with a low hardness (down around 30) and mirror reflections to give a more general spread out shine to the skin. The same specular texture is applied to each and they are added together with a screen node.

![>< ><](/images/old/spec_settings.jpg)

## Other textures:
The only other texture required is the bump map, which I mention above should be applied to the epidermal, diffuse and specular materials to give the surface some detail. Also if you have a normal map texture (for example baked from a high res sculpt, or if you simply prefer normal maps to bump mapping) then this should definitely be applied to the surface layers (diffuse, epidermal, specular), and potentially to the subdermal layer too depending on what level of detail is present in it.

![>< ><](/images/old/bumpnor.jpg)


## Acknowledgements:
A lot of what I know about SSS I learned from Maqs and Pixelvore on the blender artists forums. In particular Maqs' SSS shader tests are brilliant, and whilst a lot of the links are broken now, his [thread](http://blenderartists.org/forum/showthread.php?t=145904&page=9) is an excellent source of information. 

## Questions?
If you have any more questions, leave them in the comments and I'll do my best to answer. 
 
## Add vs. Screen Nodes:
[Francois Tarlier](http://www.francois-tarlier.com/blog/) points out that if you are working with blenders colour management turned on, then you should use add mode to mix the materials rather than screen. This is because screen is sort of a cheat for working with un-gamma corrected textures. I originally made this shader using 2.49 for my blending life entry, and as 2.49 doesn't have a nice way of gamma correcting textures (and I'm too lazy to do it in GIMP) I found screen worked better. With 2.5s new colour management I agree with Francois that add mode is more correct. Here is a bit of a comparison for those interested: [](/images/old/final_comparison.jpg

![>< ><](/images/old/final_comparison1.jpg)


On the left we have a colour management turned off, but a gamma correction of 0.45 (1/2.2) applied in the compositor in post, and screen nodes used to combine the materials. On the right we have add nodes use, and colour management turned on. I think the latter looks a bit better. It's a bit of a false test though - I usually end up doing a fair bit of adjustment in the compositor in post anyways (I even did a quick brightness and contrast adjustment to both of these in the GIMP, though the exact same correction was applied to both) to get a render looking how I want. Neither looks like I would want straight out of the box. **Blendfile:** If you want a blend file to get you started, a pared down version of the shader used for this tutorial is avaliable at [blendswap.com](http://www.blendswap.com/3D-models/materials/bens-three-layer-sss/). However, be aware that this is just the basic shader, and proper textures are a must for good results.

