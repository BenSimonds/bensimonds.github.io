---
title: 'Book Review: Blender 2.5 Character Animation Cookbook by Virgilio Vasconcelos'
date: '2011-07-18'
tags:
- animation
- animation cookbook
- blender
- blender 2.5
- book review
- resources
- rigging
- virgilio vasconcelos
author: Ben Simonds
alias: blog/posts/2011-07-18-book-review-blender-2-5-character-animation-cookbook-by-virgilio-vasconcelos

---



<iframe title="vimeo-player" src="https://player.vimeo.com/video/25286653" width="640" height="360" frameborder="0" allowfullscreen></iframe>

 

I got Virgilio Vasconcelos' new book, _[Blender 2.5 Animation Cookbook](http://virgiliovasconcelos.com/blender-animation-cookbook/) _in the post from PACKT publishing the other day, and they asked me to write a review. I've been doing a bit of rigging of my own lately, so it came along at a useful time for me; I've already picked up a couple of useful tips. It seems like a good guide to rigging so far, with info on most common rigging tasks, and I think enough information for beginners to get their heads around the topic.

Whilst the title suggests that the book centres on Animation, the book is really split about 50/50 between rigging and animation, which means as long as you can model it covers pretty much all you need to get animating, even if you don't want to use a ready made rig like Mancandy or Pantin. The rigging portion takes you through rigging all the common aspects of rigging a biped, and whilst I'd differ on how to implement one or two aspects of some of the rigs, I'm by no means a champion rigger. It never hurts to know more than one method either. The book covers both creating and weight painting a deform rig, and then creating separate control rigs for different control methods (i.e. IK/FK), and keeps the two nice and separate (as they should be!). I think the lack of much discussion on using python for rigging is a bit of an oversight, given how useful knowing even a little bit of python can be when building a rig. Also a few of the controls that Virgilio outlines, like the isolation controls for the head and shoulders, only switch between on and off, and it isn't difficult to make controls that smoothly interpolate between the two (go see [Nathans mammoth rigging tutorials on CMI VFX for how to do that](http://www.cmivfx.com/)). Overall though the coverage is pretty solid though, and the book takes you through all the common hang ups, like creating a foot roll rig, stretchy and bendy limbs, rigging eyes, facial rigging with lattices and shapekeys, and creating interfaces for options like IK/FK switching, limb isolation and changing parent spaces. The book is particularly focussed on cartoony rigging, but it's all applicable to more realistic rigs too.

On the animation side (which I know less about) the book teaches the layered technique, and has a nice progression through creating key poses, then extremes, breakdowns, and finally refining timing and tweaking curves in the graph editor. After demonstrating the basics the book moves on to a few common animation tasks, like having a character interact with props, creating walk cycles and animating speech. There's also plenty of discussion of the principles of animation, which really is more important than the technical side. Anticipation, moving holds, squash and stretch, and symmetry are all talked about, and there are also some great tips on rendering silhouettes and mirrored previews of your animation to help spot your mistakes. There's also a little discussion at the very end of the book on using grease pencil to plan and refine your animations. As I'm not much of an animator I can't speak to any shortcomings the book might have but the book has a nice breadth, and I like the deference it pays to traditional animation too.

All the source .blend files for the book are available through [Virgilio's website](http://virgiliovasconcelos.com/blender-animation-cookbook/), which are a great resource when trying to pick apart how a rig works so you can implement something in your own projects. If you're interested in buying the book, I'd suggest you go and check them out. Also available is the main character rig "Otto", used in the book. All in all the book should be a nice reference for anyone looking to start with rigging and animation. It's an easy book to flip through and find the topic you're stuck on, and whilst I disagreed with a couple of solutions, the book has an answer for most problems that might stump newbie blender-heads.





# Comments


Jordan (Oct 22, 2011)
> The only thing I wish the book did was walk you through the process of actually creating a workable and usable animation scene. Definitely, ahead of the game when teaching animation!
> 
> Ben, what solutions did you disagree with? And what would your fixes be?
