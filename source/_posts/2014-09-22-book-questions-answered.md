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


