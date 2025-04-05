---
title: Atmospheric Rendering with OSL
date: '2014-10-02'
tags:
- atmosphere
- nishita
- osl
- planets
- procedural
- shader
- sky
- volumetric
author: Ben Simonds
alias: blog/posts/2014-10-02-atmospheric-rendering-with-osl
thumbnail_old: /images/old/nishitaskyrender10.jpg
---

[![NishitaSkyRender10 ><](/images/old/nishitaskyrender10.jpg?w=470)](/images/old/nishitaskyrender10.jpg)


My latest experiment into OSL shading is focused on implementing a sky shading model similar to cycles' existing sky textures. Whilst Blender's existing options work pretty well, they only allow you to render the sky as it appears at sea level. I wanted a shader that could simulate the sky at any altitude, even from outside the Earth's atmosphere. After some research I was able to track down an article on [rendering atmospheric scattering](http://www.scratchapixel.com/lessons/3d-advanced-lessons/simulating-the-colors-of-the-sky/atmospheric-scattering/) at ScratchAPixel.com, which does a great job of explaining a model for rendering Earths atmosphere based on a 1993 technical paper by Tomoyuki Nishita. 

I wont bother explaining the maths in too much detail here, as frankly I don't 100% understand it anyway, and the ScratchAPixel article does a far better job than I could. But I wanted to share the results and my osl shader code for anyone who might be interested. The shader works by sampling the path out from the camera, through the atmosphere out into space (or until we hit the earth) and adding together all of the sunlight scattered by the atmosphere (only single scattering is taken into account). Two kinds of scattering of light by the atmosphere are considered. Rayleigh scattering is the scattering of light by small molecules; those smaller than the wavelengths of visible light. Rayleigh scattering affects short wavelengths of light more than long ones and so blue light is scattered more strongly . Mie scattering is the scattering of light by larger particles called aerosols, and is largely independent of wavelength. Rayleigh scattering is what gives the sky its blue colour and sunsets their red colour. Skies are normally blue because you're seeing predominantly the blue light scattered by Rayleigh scattering. A sunset looks red because you're looking towards the sun, and the sunlight at the horizon has to travel further through the atmosphere to reach you, so the blue light has already been scattered out by the time the remaining light reaches you. As you move higher in the Earth's atmosphere it becomes less dense, and so Nishita's model accounts for this by applying an exponential falloff to the amount of scattering as we progress higher in the atmosphere. This means as we go higher, the sky begins to look darker as we see less scattered light, and more of the darkness of space beyond. Anyway, here's my OSL shader code and some renders. [Nishita Atmosphere Shader on GitHub](https://github.com/BenSimonds/NishitaSky) Some different altitudes (at midday):

[![Altitudes ><](/images/old/altitudes.jpg?w=364)](/images/old/altitudes.jpg)


A test with Suzanne:

[![NishitaSkyRender9 ><](/images/old/nishitaskyrender9.jpg?w=470)](/images/old/nishitaskyrender9.jpg)


Some desktop wallpaper res shots.

[![NishitaSkyRender5 ><](/images/old/nishitaskyrender5.jpg?w=470)](/images/old/nishitaskyrender5.jpg)


[![NishitaSkyRender7 ><](/images/old/nishitaskyrender7.jpg?w=470)](/images/old/nishitaskyrender7.jpg)


[![NishitaSkyRender8 ><](/images/old/nishitaskyrender8.jpg?w=470)](/images/old/nishitaskyrender8.jpg)



### Rendering Planets

Following on from getting the sky shader working, I wondered if it would be any good for rendering planets - it could already render an atmosphere of a planet, and it part of the code for the shader already found where on the planet the camera rays hit. From this I could also generate coordinates for rendering a texture on the planet, and with a bit of extra code and some nodes in blender I had a set up that I could render Earth (and other planets) with. It's still very experimental, and it doesn't do anything advanced like rendering clouds, but it's been pretty fun to mess around with. Here's some images. You can find the code for the OSL portion of the shader on github. They're pretty rough, but the neat thing about them I think is that there's **no geometry** in the scene! Just a shader on the background. Some Earth renders (looks a little weird without clouds):

[![PlanetTest1 ><](/images/old/planettest1.jpg?w=470)](/images/old/planettest1.jpg)


[![PlanetTest5 ><](/images/old/planettest5.jpg?w=470)](/images/old/planettest5.jpg)


Mars with some water:

[![PlanetTest7 ><](/images/old/planettest7.jpg?w=470)](/images/old/planettest7.jpg)


And some procedural/grunge texture based planets!

[![PlanetTest2 ><](/images/old/planettest2.jpg?w=470)](/images/old/planettest2.jpg)


[![PlanetTest3 ><](/images/old/planettest3.jpg?w=470)](/images/old/planettest3.jpg)


[![PlanetTest6 ><](/images/old/planettest6.jpg?w=470)](/images/old/planettest6.jpg)


[![PlanetTest8 ><](/images/old/planettest8.jpg?w=470)](/images/old/planettest8.jpg)






