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
markdown:
  gfm: false
alias: blog/posts/2011-06-01-depth-of-field-in-blender

---

None




# Comments


Martin Lubich (Jun 07, 2011)
> That's a very concise and complete coverage of the DoF in blender. The addition with the distortion is a very nice one too :)
> 
> Instead of going through the coloramp to get a clean [0..1] range I found it sometimes useful to setup a clipping with the minimum and maximum nodes. With this you do not change the falloff behaviour of your mask.
> 
> When doing the compositing in a different step from the actual render ( via multilayer exr files e.g. via a separate compositing blend file ) you have to make sure to import the camera animation from the original shot to your compositing file. This has to be done, because the camera focus information is not stored within the multilayer exr files.
> 
> Another disadvantage is that you cannot use FSAA when working with this workflow ...

Reynante Martinez (Jun 02, 2011)
> Thanks for sharing, Ben.  Seldom do you find helpful articles that talk about DoF in Blender.  This is indeed a savior to many. ;)
> 
> -Reyn

Depth of Field in Blender « BenSimonds.com &laquo; ThruDreamsgate&#039;s Blog (Jun 01, 2011)
> [...] Depth of Field in Blender « BenSimonds.com. [...]

daniel glenn (Jun 02, 2011)
> Thanks a lot, very nice article for DOF..sweet

Aditia A. Pratama (Jun 06, 2011)
> yeeay, pretty cool article Ben !!! so helpful, especially to split with BG and FG masking in node editor...it's brand new method for me !
> 
> thanks

oliver Villar (Jun 05, 2011)
> Hey, Ben!! This DoF tutorial is really awesome, and that tricks you comment make it work a lot better!!! I'll announce it at blendtuts.com ;)
> 
> Thanks for sharing! :D

Adhicipta R. Wirawa (Jun 05, 2011)
> Thanks a lot Ben ^_^ This article is very helpfull!

Riton (Jun 07, 2011)
> Nice Article Ben ! 
> 
> A quick tip to have a nice Z-map is, instead of connecting the Z output to a "map-value", you can connect it to the "normalize" node, which will automatically create a Z map which go from black to white.
> 
> Cheers,

does anyone know how to make these awesome honeycomb models? (Jun 07, 2011)
> does anyone know how to make these awesome honeycomb models?

Ben Simonds (Jun 07, 2011)
> Add a circle with 6 verts, extrude into a cylinder, duplicate with an array modifier. I just wanted a quick scene to demonstrate the effect.

Jeff (Jun 07, 2011)
> thank you, i was wondering about correct usage of masks, it seems this is one of the ways a mask comes in handy

Pascal (Jun 08, 2011)
> Do you have any hints on how to create / where to get such beautiful simplified human characters?

Jan Bures (Jun 08, 2011)
> Thank you for nice expamples. Nodes are awesome.

Ben Simonds (Jun 08, 2011)
> The one in the examples was one I made just with some really basic geometry and rigged with riggify. There was another one floating around with a creative commons licence, but I'm not sure it's up to date with blender 2.57.

Pascal (Jun 16, 2011)
> Thanks for your response Ben.
> Please let me just in the case you see it again sometime, I'm sure I could learn a lot from looking at how these are made.
> Did you use the "Add UV Sphere" for the spheres or is there a prefered method in edit mode?
> Greetings, Pascal

Depth of Field in Blender at BlenderNation (Jun 07, 2011)
> [...] how to fix yet, so if there’s anyone out there with input I’d love to know your opinions.LinkDepth of Field in Blender   GA_googleFillSlot(&quot;BN_Content_468x60_below_post&quot;);   Related NewsNo related postsRelated posts [...]

Profundidad de campo en Blender (Jun 14, 2011)
> [...] Ben Simonds ha publicado en su sitio web un tutorial acerca de generación  de Profundidad de Campo (DOF, por sus siglas en inglés) en Blender. El documento comienza por explicar el concepto teórico del DOF, para pasar a lo práctico, a ver como los parámetros a utilizar dentro del software open source mencionado. Pueden consultar en el siguiente enlace. [...]

Ben Simonds (Jun 17, 2011)
> The manikin rig wasn't made with spheres, but with subdivided cubes.

40+ Highly Useful but Rarely Collected Blender's Tutorials | Dzineblog360 (Dec 04, 2011)
> [...] Depth of Field in Blender [...]

tbarbe (@tbarbe) (May 05, 2012)
> Great article Ben!
> 
> 
> I'm researching bokeh and blur effects - specifically I'm trying to match the bokeh and blur/distortion of an anamorphic lens.  anamorphics cause the background blur and bokeh to get squashed vs the foreground in focus parts...
> 
> I was thinking of ways to accomplish this - like perhaps feeding Z depth to some blurring along with a displacement node to squeeze the background layers along some axis
> 
> Would you have any advices on doing this?

Ben Simonds (May 06, 2012)
> Interesting question. Anamophic bokeh has a distinctive look. I gather the reason behind it is that whist an anamorphic lens gives a 2x squeeze for stuff in the focal plane, beyond this the squeeze is greater, so background bokeh looks squashed as a result. Replicating this in a comp setup could be somewhat difficult depending on your scene. If you can split up the background and foreground into separate passes, then it's relatively simple to apply the squeeze to the background before blurring, and then unsqueeze (though not 100%, and you may have to apply some scaling to then fill the frame again. For a full scene it might be more complex.
> 
> On the other hand, if you can render with a more physically accurate renderer, then you might be able to create the bokeh effect you want physically, see these links for examples: http://lesterbanks.com/2011/08/using-custom-bokeh-effects-in-blender-cycles/ and http://www.diyphotography.net/can-you-make-computerized-shaped-bokeh
> 
> Hope that helps!

tbarbe (@tbarbe) (May 06, 2012)
> Awesome reply Ben... and awesome tutorial as well.  Thanks for your kind replies!  I will dig into the physical based lighting examples...
> 
> I've experimented with Cycles creating different shaped bokeh with cutouts in front of the camera...and Ive looked at splitting layers and then using displacement node or something to adjust the scale of the background parts... i guess if I test with the lens and get a feel for what the originating source will do to items in the distance - I can better match up what I make in 3D to the footage!  
> 
> I know this has been done before somewhere... it's just a bit more rare lately as anamorphics have gotten less use in mainstream cinema and their cost it prohibitive to lower budget shoots...Ive got a hacked projector anamorphic that produces ok results but the blur and style are going to give me a problem if Im going to have any 3d elements or effects in the scene.... I have to learn how to "blend" those items so they look realistic!
> 
> :)  thanks again!

tbarbe (@tbarbe) (May 07, 2012)
> Hey Ben!  Check this out.... look in the comments:
> 
> http://www.dalaifelinto.com/?p=389#comment-780

Useful Blender Tutorials | Jorge Bouza (Apr 29, 2015)
> [&#8230;] Depth of Field in Blender (not Cycles) [&#8230;]

suzhou lingering garden (Jan 30, 2016)
> Suzhou gardenms or the venice of the east as it is also known is a peaceful 
> place to visit when your in Jiangsu Province, China.
> 
> You can easily arrive there from Shanghai or Nanjing two big cities that are close by.
> You can take the highspeed g-train, d-train,t-train or k-train. Its is also 
> possible to arrive by bus if you are coming from a more remote 
> place that doesnt have a train line. There are many gardens 
> in Suzhou and we offer amazing local tours of this Unesco World Heritage Site with 
> friendly local guides who have been well trained to give you the best possible experience.
> Afterwards we will take you to the local restaurant with good quality fresh food that you will 
> find amazing.
