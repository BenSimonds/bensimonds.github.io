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
alias: blog/posts/2013-11-07-controlling-hdri-lighting-with-nodes

---

I've seen a couple of posts recently on getting more control over HDR based lighting setups, specifically in terms of getting crisper shadows. In particular [Reyante Martinez](http://reynantem.blogspot.co.uk/2013/07/proper-hdr-lighting-remix.html) and [Greg Zaal](http://adaptivesamples.com/2013/07/24/cif-2-hdr-lighting/) each posted some great setups that used the colour of an HDRI map as the input to the strength node of a background shader. I thought I'd add my own experiments to the mix. Here's a basic world setup for cycles. Just a HDR map plugged into a background node. No other lights in the scene.

[![HDRI_1_Basic ><](/images/old/hdri_1_basic1.png?w=950)](/images/old/hdri_1_basic1.png)

 Here's a setup based on one that Greg posted in his original article. It gives stronger shadows by plugging the HDRI map into both the colour and intensity inputs of the background node.

[![HDRI_1_ISquared ><](/images/old/hdri_1_isquared.png?w=950)](/images/old/hdri_1_isquared.png)

 Of course there are many ways to achieve this sort of effect, and so the answer becomes which is the most effective, and which gives you the most control. The setup above gives you _some_ control over the shadows, but by plugging the map into the strength input it becomes more difficult to affect the overall strength of the environment lighting (incidentally, Greg posted some great improvements to the above setup in his original article). What I really want to do is to be able to control the contrast of the lighting without affecting it's colour, and whilst still maintaing control over it's overall brightness. I tried a few setups with this aim in mind. This was my first one:

[![HDRI_1_Power ><](/images/old/hdri_1_power.png?w=950)](/images/old/hdri_1_power.png)

 This setup was my first attempt, and I was mainly concerned with making sure my math checked out so that I could get my head around future setups. Here I normalised the input to the colour node of the background shader. This gave the colour input for the background node a uniform intensity. I then extracted the value from the HDRI map and processed this separately, then used this as the input for the strength node of the background shader. By putting this input through a power (math) node first (or any other manipulation you prefer) I could control the strength and contrast of the lighting (raising it's intensity to a higher power results in more contrast). Notably, this setup resulted in a lot more noise. I think this is because my setup messes up the Multiple Importance Sampling for the world (which I had turned on for all my renders). This convinced me that I should try and modify the input to the _colour_ socket of the background node, rather than the strength, which should be kept to a uniform value, in order to avoid unnecessary noise. This setup also results in some crazy backgrounds, and glossy reflections that don't make sense. To fix these issues I made use of the light paths node and a few mix nodes to blend in the unaltered HDRI map where appropriate, namely for glossy, transmission and camera rays. I also switched to using a Brightness/Contrast node to affect the lighting strength. The result is the following setup:

[![HDRI_1_Advanced1 ><](/images/old/hdri_1_advanced1.png?w=950)](/images/old/hdri_1_advanced1.png)

 The node group of which contains the following nodes:

[![Nodes ><](/images/old/nodes.png?w=950)](/images/old/nodes.png)

 This node group provides a lot of flexibility whilst remaining easy to work with. You can control how much your environment affects your lightings contrast and overall brightness and adjust how this affects other aspects of your render like glossy reflections, transmission rays and the background as viewed by the camera. Here's a few examples: Different contrast adjustments:

![Contrast ><](/images/old/contrast.png)



 Adjusting the look of Glossy Reflections:

![GlossyMix ><](/images/old/glossymix.png)


 The same effect shown above for Glossy reflections can also be controlled for transmission rays. So far it seems to work pretty well. If you give it a go I'd enjoy hearing your thoughts on it and how it worked for you. [You can download it here](https://dl.dropboxusercontent.com/u/180363/Hosting/HDRI_Lighting%20Control_V1.blend). Note: The HDR map I used is not included. You can download it from [BlendedSkies.com](http://blendedskies.com/MediaDetails/tabid/89/ProductID/18/Default.aspx), which is a great resource for HDR panoramas as well as other stuff like pre-tracked footage and backplates for compositing renders onto.


