---
title: Lighting tips from the Masters
date: '2010-06-03'
tags:
- area lamps
- back light
- blender
- blender 3d
- cinematography
- fill light
- hollywood lighting
- key light
- lighting
- lights
- portrait
- portrait lighting
- rembrandt lighting
- rim light
- spot lamps
- three point
- three point lighting
- tutorials
author: Ben Simonds
alias: blog/posts/2010-06-03-lighting-tips-from-the-masters

---

![>< ><](/images/old/bouguereau_william_autoportrait_presente_a_m-_sage_1886-large.jpg)

What do I know about lighting after all? After my previous post on setting up a three layer SSS shader, a few people asked for tips on how to light their characters to best show them off. As it happens, this something I'm rather interested in, and I've had a blog post on the subject brewing for a while, so I've finally found the motivation to finally write it up. I didn't want to spend too much time talking about specific settings for this tutorial, so instead you can download this [blendfile](http://www.blendswap.com/3D-models/lighting-rigs/simple-three-point-light-setup/) from BlendSwap.com for some ideas on the specifics of how to set up your scene.  Lighting in portraits is key to how you want your character to be seen. The exact same character with the same pose and expression can be seen in completely different ways depending on how they are lit. They can be made to appear anything from dark and sinister to calm and serene simply by changing the lighting of your scene. On a more subtle level different kinds of lighting will can drastically improve the look of your models, and transform them from drab and uninteresting to dynamic and captivating. I don't get it right every time, so when I'm looking for inspiration for lighting I usually turn to those who know better. From the great painters and photographers, to Hollywood Films, to modern day CG artists, each can offer insights into what makes for interesting lighting.

## Three Point Lighting:

Before delving into some deeper issues, let's look at what is considered the "standard" lighting setup for a lot of portraiture and cinematography. Three point lighting is the use of three different lights to achieve a pleasant, natural look that is adaptable to a wide variety of circumstances, and gives good results with most subjects when set up correctly.


![>< ><](/images/old/2x.jpg)


Conrad Veidt as Major Strasser in Casablanca 

You should be able to see that the main source of light in the image above is coming from slightly above and to the side of the shot. This is called the "key" light. This provides illumination to most of the face, but were we to only have that one light in the scene, the remainder of the face would be in shadow. For the whole face to be seen we add a second, slightly softer "fill" light from the other side, at roughly eye level. This gives an even illumination to the shadowed parts of the face. A third "back" light (also called a "rim" light) light, positioned behind the subject, is used to highlight the edges of the subject and lift it out of the background. 

![>< ><](/images/old/threepointsetup.jpg)

A basic three point lighting setup. 

This kind of lighting is easy to do in blender, and is best done using either spot lights or area lights, as these give a good amount of control over the direction and placement of the light, and also have some of the best tools for adjusting the softness of the shadows. Spot lights are preferable for animation, as using buffered shadows allows objects in the scene to cast shadows over each other without resorting to ray-tracing (which would increase render time significantly). Area lights give much nicer soft shadows, but at the cost of much longer render times. 

![>< ><](/images/old/spotvarea.jpg)

Spot Lamps with buffered shadows vs. Area Lamps with ray traced Shadows. 

Rendertimes in Blender 2.5 (with raytraced AO for both) - Spot Lights: 28 seconds. Area Lights: 2 mins 59 seconds.

## Hollywood!
Three point lighting is a familiar feature of any film, CG animation or photographers studio today. Originally though, it became popular in the golden era of Hollywood, when film makers wanted to make sure that their sets and actors were evenly illuminated so that movie-goers could see all the money they spent on their productions. Because early colour film didn't capture contrast between light and dark very well, Directors often used bright key and fill lights that gave very even illumination the actors on screen. Think back to those early technicolor films for examples: 

![>< ><](/images/old/seven_year_itch-079.jpg)

Marilyn Munroe in The Seven Year Itch 

This kind of lighting doesn't have any particularly dramatic qualities, but it does an excellent job of showing everything that is going on in shot. It also shows off texture well (look at the wooden siding in the picture above for example), and looks very natural. Getting this kind of lighting using a three point setup in blender is as simple as setting the fill and key lights to reasonably high intensities and long fall off distances, without much difference in brightness between the two. The back light used in this kind of lighting is reasonably subtle and diffuse, so set the intensity of your back light reasonably low and use fairly soft shadows. 

![>< ><](/images/old/threepoint3.png)

High-key Lighting 

## Rembrandt

Let's jump back in time for a second to the the seventeenth century. In Holland at the time, a revolution was occurring in how artists treated light. By this point in time much of the physics of light was understood and was being applied to the art of painting, but the Dutch masters - in particular Rembrandt - started a revolution in the use of light for the exposition of drama and storytelling in their scenes. By thowing light on the elements in the scene they wanted to draw attention to, and throwing elements that were less important into shadow painters could control how people interpreted the scene. This more dynamic style of lighting was also popular in portraiture, particularly because as well as adding plenty of dramatic flair to the image, it also breathed life into the forms of the subject, highligting those that face the light and veiling those that turn away in shadow. This created a lot more visual interest when compared with the more diffuse, flat lighting of a lot of Renaissance art.

![>< ><](/images/old/the_nightwatch_by_rembrandt.jpg)

The Night Watch by Rembrandt. 

One of his most well known paintings, and a famous example of the use of light to highlight the dramatic elements of the composition. Returning to Hollywood, this kind of lighting rose to prominence first in German Expressionist Cinema and then in the Film Noir era as directors sought to portray their actors in more dynamic ways. It has been popular ever since.

![>< ><](/images/old/tgf_111.jpg)

Marlon Brando in The Godfather. 

Note the triangle of light under the eye on the shadowed side of the face. This is referred to a as Rembrandt lighting, as it was a common motif in Rembrandts works. Gordon Willis, the cinematographer on The Godfather, specifically cites Rembrandt amongst his influences for the film. In cinematography this is referred to as low key lighting, and can be achieved through our standard three point light set up once again. This time, our key light is much brighter than the fill light (turn the "energy" setting up on the key light), and should have much more pronounced shadows as a result, we can also decrease the size of the lamp (the "size" setting for area lamps, or "soft size" for spot lamps) to make give our shadows much clearer outlines. 

![>< ><](/images/old/threepoint4.png)

Low-key Lighting 

This kind of lighting is ideal for showing off character models, as it higlights the forms and makes them appear much more three dimensional, compared to flatter, high-key lighting. However, by playing up the forms and increasing the contrast, it may make your textures less prominent - something you may want to consider if you spent hours slaving away over a multi-layer SSS shader with detailed textures! **Rim Light** Up to this point I have largely neglected the third light in our three point setup. Unlike the other two it's primary purpose is not to provide illumination to any large area of the subject. Indeed, being positioned behind the subject this would be impossible. Instead this light is used to pick out the outlines of the the subject and thus separate it from the background. Rim lights can be very useful in darker scenes where the subject might otherwise fade into the background (of course this may well be the effect you desire, in which case carry on). Rim light is also quite dramatic, and works well in both high and low key lighting.

![>< ><](/images/old/fight_club_0005.jpg)

Brad Pitt as Tyler Durden in Fight Club

Much of the film was set in dark, gritty environments, and the use of back lights helped the characters "pop" out of the backgrounds, without requiring bright frontal lighting. I find getting rim lights to give the effect I want in blender is often the most tricky aspect of lighting characters, as searching for the right balance between illuminating the outline, and not spreading out too far over the subject, requires a fair amount of trial and error for the placement of the lamp. Additionally, because the we only see the effects of rim lights at angles that are just glancing off the surface, rim lights must be quite bright in comparison to the main key and fill lights in order to stand out (usually several times brighter, though again this requires experimentation). 

![>< ><](/images/old/threepoint61.png)

Lit mainly from behind with a large, bright, area lamp, with the shadow samples turned up to 16

Depending on the kind of illumination you want, rim lights may not require raytraced/buffered shadows at all, instead relying only on the angle the light hits the surface. As such the effect of rim lights can also be faked using material nodes. 

![>< ><](/images/old/threepoint7.png)

A similar look can be achieved with out a back light

This time a ramp is shader used to give the same effect instead. This is much faster, but doesn't give quite the same quality. 

**Colour**

Colour theory is of course an entire subject in itself. I shall mention it only briefly here in so far as to say that opposition between the two main lights (fill and key) can create some really nice effects. Opposing colours of course are those on either side of a colour wheel:

![>< ><](/images/old/goethefarbkreis.jpg)

In general opposing colours look good when paired with one another. 

Another consideration when thinking about colour choices is how they interact with the subject. Skin is a sort of pinkish-orange colour, and so warm tones like reds and oranges complement it well, the opposing colour to these tones are bluey-green tones, and these also work well, particularly as fill or rim lights. You will note for most of this tutorial I have opted for a key light with slightly orange tint, and fill and rim lights with a blue colour. 

![>< ><](/images/old/threepoint11.jpg)

Complementary Colours often work well for the fill and key lights, though not all combinations work well when lighting skin tones. The green light on the right would give the skin a very unhealthy look. 

## Light Direction and Character

Within any lighting setup, the predominant direction the character is lit from communicates a lot about the character. We are used to seeing people lit by natural light, and so we often find that characters lit from strange angles appear more visually arresting, and often unsettling. Achieving this in blender is a simple matter of positioning the key light to provide light from the desired direction, and having the fill light take an opposing position to provide illumination of the shadowed areas. 

![>< ><](/images/old/threepoint15.jpg)

Lighting from above makes characters look dignified and noble, from below makes them look sinister and menacing. 

Lighting from behind gives a mysterious outline. Many famous pieces of devotional art use lighting from above to denote divinity, as it simultaneously makes the subject appear more dominant in the scene and at the same time gives the impression of being seen from below - imagine being a small child in a room full of grown-ups and looking up at their faces lit from above by the lights on the ceiling. More diffuse light is used to communicate a more serene and peacefull atmosphere. The master of this style (well, arguably the master of light in general) in traditional art was William Bourguerau:

![>< ><](/images/old/le_crepuscule-huge.jpg)

Le Crepuscule, by William Adolphe Bouguerau

The light in this painting is very diffuse, but you can still make out the predominant source of light in the upper left, though fill light in this case comes from all around. This kind of lighting would be best achieved through some kind of GI setup. Renderers like vray or lux render can do this kind of thing easily, but it can also be done in blender internal by getting rid of the fill and back lights, instead environment lighting to provide illumination for the shadows. A full discussion of how to set this up would be a tutorial of its own, so apart from the settings below I will leave you to experiment with this yourself. 

![>< ><](/images/old/threepoint16.png)

In this render, the subject is lit with only one key light, using environment lighting instead of fill and back lights to provide illumination of the shadowed areas. This results in very smooth lighting. 

## Tips:

Anyway. I hope this tutorial has been interesting and useful, and I leave you with a few general tips on lighting with spot and area lamps. 

  1. Area lamps provide much stronger illumination than the other types of lamp with the default settings. Turn down the distance setting on the lamp to reduce its brightness before adjusting it's energy, set it to a somewhat less than the distance between the lamp and the subject itself as a good starting point - use the line from the lamp in the viewport as a guide.
  2. Area lamps also take a long time to get nice raytraced shadows, particularly with high enough settings to avoid significant noise. For this reason they aren't particularly suited to animation. That said with the speed improvements to raytracing in blender 2.5, they are becoming more of a viable option.
  3. If your spot lamp shadows appear pixelated there are a number of options. Increase the sample buffer size (try doubling it each time until you get nicer results) and set the filter type to gauss for smoother results. For better soft shadows you will also need to increase the number of samples taken.
  4. If you are going to add ambient occlusion to your three point setup, set it to multiply. Otherwise you'll just have another light source to deal with when trying to adjust your lighting. Additionally, ambient occlusion is not the same thing as global illumination, and shouldn't really be used as a substitute, as the name suggests (occlusion means blocking something, in this case light) AO should be used to remove light from the scene, not add it.
  5. When setting up your lighting, try creating a matte material (just a plain diffuse colour, for example a dull clay colour with no specular reflections) and setting it as the override material in the layers panel of the render setttings editor. This will allow you to look at the lighting in isolation from the other elements of the scene, which is a great way to troubleshoot lighting setups that aren't quite working.

## Blendfile:
If you missed it at the beginning, you can download it [here](http://www.blendswap.com/3D-models/lighting-rigs/simple-three-point-light-setup/). 
