---
title: Hair testing in Blender 2.56
date: '2011-02-02'
tags:
- '2.56'
- blender
- hair
- particles
- parting
- quick projects
author: Ben Simonds
alias: blog/posts/2011-02-02-hair-testing-in-blender-2-56

---

The most recent release of blender has some really nice new tools and options for getting nice hair. I've been playing around with creating hair particle systems, particularly trying to get nice long hair.

![>< ><](/images/old/hairtests.jpg)

Some of my favourite new features are: 

  * Child particles for long hair. This option seems to give much nicer results for long hair, with more of a layered look compared to the fuzzy, kinda random look with this option turned off

![>< ><](/images/old/httut1.jpg)


  * New parting controls. With the new settings it's really quick to make a parting within a single particle system, Just turn up the parting setting and comb your hair system to give the parting. Instead of filling in the gap with fuzzy interpolated children, the child particles are forced to pick a side, maintaining the parting. In practice I think it's still easier to use two separate particle systems for more control, but this is a great addition nonetheless.

![>< ><](/images/old/httut2.jpg)


  * Re-arranged roughness controls. There's no real difference in how they work, but the labelling makes much more sense now.

Edit: And because a couple of people asked, I did a quick dynamics test: 

<iframe width="640" height="360" src="https://www.youtube.com/embed/0KwyYH40paQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Double Edit: Jayraj in the comments pointed me to a great dev video explaining the new particle settings. You can find the accompanying blog post on Jahka's (the developer) site [here](http://jahkaparticles.blogspot.com/). 

<iframe width="640" height="360" src="https://www.youtube.com/embed/k8FLJik6-Lw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
