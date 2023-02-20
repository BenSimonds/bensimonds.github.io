---
title: Book Questions Answered
date: '2014-09-22'
tags:
- bevel
- blender master class
- block
- book
- hand
- modeling
- tutorials
author: Ben Simonds
alias: blog/posts/2014-09-22-book-questions-answered
thumbnail_old: /images/old/hand1.jpg
---

I get the occasional question from people following along with the book about how to tackle specific things. In particular the two questions below seem to trip people up. I thought I'd answer them here so that anyone else who is having trouble can look them up. 

#### Q: How do I bevel the blocks for the Jungle temple?

The blocks for the jungle temple project are supposed to have bevelled corners, like this:

[![Block1 ><](/images/old/block1.jpg?w=300)](/images/old/block1.jpg)


These are supposed to be achieved with a bevel modifier, but recently the behaviour of the modifier has changed slightly, and the method given in the book gives different results than it used to. As such I'll outline a new method here: 

  1. Start with your cube, subdivided

[![Block2 ><](/images/old/block2.jpg?w=300)](/images/old/block2.jpg)


  2. You only want to bevel the corners. Handily, these are the only vertices that have three faces connected to them, rather than four. This means you can select one corner vertex, and use **Select Similar** ( _Shift-G_ ) to select the rest

[![Block3 ><](/images/old/block3.jpg?w=300)](/images/old/block3.jpg)


  3. Add the corner vertices to a vertex group

![Block4 ><](/images/old/block4.jpg)




  4. Then add a bevel modifier, set to vertex only, with the limit method set to vertex group. To get two levels of bevelling, I then repeat this modifier

![Block5 ><](/images/old/block5.jpg)


  5. The finished block will look like this

[![Block6 ><](/images/old/block6.jpg?w=300)](/images/old/block6.jpg)





#### Q: How do I model the base mesh for the hand on the bat creature?

This is a relatively complex bit of modelling, and I think if you're new to blender you might want some extra steps. So in aid of making it simpler to understand I've made this quick video. https://www.youtube.com/watch?v=ICQaevdh8Tc Here's the steps shown in the book. Along with the video it should hopefully be a bit easier to follow now.

[![Hand1 ><](/images/old/hand1.jpg?w=470)](/images/old/hand1.jpg)



#### Further questions?

The two questions above are I think the two bits of the book that trip people up the most, but if you have a burning question or you're stuck on something let me know!





# Comments


cochesaurus (Feb 02, 2015)
> A short video on how to model the foot ;) I think it was like the hand but I don't know how to get a 3 side face in the middle of the foot, in the book picture looks like this helps to make an edge loop in the toe

Jose (Apr 26, 2016)
> A short video on how to model the stone carvings in chapter 5 would be great :)

Ben Simonds (Dec 26, 2014)
> The hockey to merge faces/edges/verts is alt-M. Thanks!

Jose Navas (Dec 26, 2014)
> Hi Ben, in chapter 4, Blocking In, when modeling the bat creature, you mention, that for fixing some topology at the pelvis by selecting
> the two new edges and merging them... how do you select or merge edges in Blender, any hotkeys? thanks
> P.S. by the way I enjoyed the airplane and air fight tutorial on the 3D Artist magazine published some months ago :)

Ammon Parker (Jan 31, 2015)
> Hey Ben, in chapter 4 when you talk about bloacking in the vines for the Jungle Temple. I couldn't figure out how you made your vines a circle. I could only get a incomplete circle. Would you please tell me how to do it right. Thank you!

Lukas (May 11, 2015)
> Hello there, first of all, a huge thanks for making Blender Master Class! I am new to Blender and I found this book as a great source of tons of useful information.
> Here is my question, or more like a request: I was able to model out the base mesh for Bat creature without any serious complications, but now i am at the sculpting part and I am just completely lost :D My sculpting just doesnt look any near to yours, maybe I am just lame or stupid, but could you maybe make just some short example video of scultping a certain part, like abdomens or chest? I was able to get thru the "Volumes" and "Landmarks" stages, but I am just not certain how to make those final steps.. Thanks for any kind of a reply :D
