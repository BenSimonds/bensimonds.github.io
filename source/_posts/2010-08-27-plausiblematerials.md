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
alias: blog/posts/2010-08-27-plausiblematerials

---

![>< ><](/images/old/cornell2s.png)

Something that is really handy to bear in mind when creating a material, is how it would interact with light in the real world. Even if you aren't interested in creating photo realistic renders, it's likely that you still want to be able to create materials like wood, metal, glass etc, and a vital part of knowing how to do this is knowing how real world materials interact with light. Thankfully this is simply a matter of knowing some basic physics, and being able to apply this knowledge to blenders material editor. The following are a few rules from the real world about how light works, and how this applies to CG.

**Diffuse vs Specular Reflection** When light hits any flat surface it reflects back at the same angle: 

[![>< ><](/images/old/reflection101.jpg?w=300)](/images/old/reflection101.jpg)

This is called specular reflection, and gives rise to the focussed, bright reflections we see on shiny surfaces (as well as mirror reflection, as I will discuss in a bit). On a microscopic scale though, most surfaces are actually very rough, causing the light to be scattered off at all angles:

[![>< ><](/images/old/reflection102.jpg?w=300)](/images/old/reflection102.jpg)

This is called diffuse reflection. The light gets spread out by the surface and goes off in all directions, giving it a flat, matte look. Many materials exhibit varying levels of both these kinds of reflection, giving rise to a broad, diffuse illumination of the surface, along with a smaller, brighter specular highlight, like so:

[![>< ><](/images/old/maths0.png?w=300)](/images/old/maths0.png)


In other words, something like a standard blender material. Varying the amounts of these kinds of reflection allows one to mimic a wide variety of material types relatively easily, increasing the specularity for shiny objects like plastic and metal, or decreasing it for matte objects like paper or coarse stone. However, to keep materials physically accurate, there are constraints on how much these parameters can be varied.

**Conservation of Energy** **Edit:** I've edited this bit quite heavily, as Matt Ebb made some great points in the comments. 

Objects look brighter or darker because of the amount of light they reflect. The light they don't reflect either as a diffuse or specular reflection is absorbed by the surface as heat, and so the total amount of energy hitting the surface is conserved. Blenders internal renderer, being a non-physically correct renderer does not conserve energy, but you can still bear the concept in mind whilst creating materials. In general the specular and diffuse components of a material shader should not both be set to the maximum, as this would suggest that the material was reflecting 100% of the light it received as diffuse light, and then another 100% as specular reflection! Clearly impossible. Instead, if your material reflects a lot of diffuse light, it should probably have a lower specular value, if it is very shiny and has a high specular intensity, then it's diffuse reflection should probably be low.



Left: A sphere with a high diffuse intensity, and low specular intensity. Right: High specular intensity, low diffuse. Middle: Maximum diffuse AND specular intensity. Note how it looks blown out and too bright for the scene.

![>< ><](/images/old/maths8.png)

In the example above, the specular and diffuse components of the middle sphere are both set right at the maximum, and as a result the material looks too bright. This might not be too noticeable in a simple scene, but in a more complex project things can soon start to look off if you create materials without any regard for keeping them physically plausible. 

### Specular vs mirror reflections

So we have established that diffuse and specular reflections are part of a single whole, which cannot be more (at least in reality) than the total amount of incident light. However, what about mirror reflections? Well, in reality, there is no difference between specular and mirror reflections, and in physics (as well as many physically correct renderers) the terms are used interchangeably (see the wikipedia article on [specular reflection](http://en.wikipedia.org/wiki/Specular_reflection) for example). However, when taking about specular reflections in terms of blenders materials, we are talking about an _approximation_ of the way that objects reflect light, that takes into account only the light coming directly from the light source. __ In many situations, and for many materials, the only light strong enough to create a glossy specular reflection is that which is coming directly from the light source itself, and so this approximation works well for mimicking a basic shiny surface (as in the examples above). But a highly polished, mirror like surface can reflect the light coming from everything in its surroundings, and so we need to enable ray traced mirror reflections to enable this. To keep our material looking correct then, we need to realise that specular and mirror reflections are two sides of the same coin, specular reflections coming from the light itself, and mirror reflections coming from light reflecting off the surroundings.


On this sphere, the surroundings are reflected by ray-traced mirror reflections, whilst the reflection of the lamp (on the upper right of the sphere) comes as before from the specular shader.
[![>< ><](/images/old/maths91.png?w=300)](/images/old/maths9.png)

### Hardness

Hardness for specular highlights determines how focussed and "hot" the specular highlight is. This tells us visually how smooth and polished the surface is. Polished chrome for example has very tight, hot, highlights (very high hardness). Dull brass might have more spread out highlights (lower hardness). Bear in mind that because the hardness of the surface is indicative of its smoothness, a surface with very high hardness should also have stronger specularity (and less diffuse reflection) in general, whereas a rougher surface should have lower specularity (and more diffuse reflection). Also if your surface is smooth enough to have clear ray-traced mirror reflections, it probably should have a very high hardness too.



Two spheres, one with a low hardness and lower specularity, the other with a high hardness, higher specularity and mirror reflection enabled.

![>< ><](/images/old/maths6.png)


## Specular Colour

The colour of specular and mirror reflections is dependent heavily on how they are generated, for conductive materials, i.e. metal, specular reflections take on the colour of the material. However non-conductive (dielectric) surfaces like plastic, skin, leaves or polished wood, the specular reflections do not take on the colour of the material. Here are a couple of examples:

For the polished wooden sphere on the left, the underlying colour of the material has no effect on the colour of the specular/mirror reflections. The metallic sphere on the right has more richly coloured reflections, as the diffuse texture was also used to affect the cmir and cspec channels.

![>< ><](/images/old/maths7.png)

## Of course...

These are only guidelines, at the end of the day all that matters is that your renders look how you want them too. Keeping an idea of how a material would work in real life can help you achieve that though, and you can only break the rules to get the effect you want if you know what they are in the first place.

## Further reading:

I've learned rather a lot as a result of corrections and questions people have sent me since I posted this, I've tried to edit the post to reflect this, but you can also check out some of my sources at the following locations:

[Neil Blevins CG Education - Metals and Reflections](http://www.neilblevins.com/cg_education/aniso_highlights/aniso_highlights.htm)

[Blender Documentation - Specular Reflection](http://www.blender.org/documentation/htmlI/x4251.html)

[Blender.org forum - Blinn Specular](http://www.blender.org/forum/viewtopic.php?t=1017)
