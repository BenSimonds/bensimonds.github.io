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



# Comments


Salvador (Feb 25, 2011)
> hello Ben
> 
> I was looking at this post and noticed that none of the new featureas you mention appear in my blender 2.56b. I'm using the linux version. Are you using Windows or mac? Or maybe is a build?
> 
> Also I wanted to know if you have rss to follow your blog.
> 
> thanks and regards.

Ben Simonds (Feb 26, 2011)
> I'm currently using rev 34575, on linux. I think the new features should be in most recent builds.

Jayraj (Feb 03, 2011)
> Hey Ben, 
> I like the curly hair. :)
> the dev video Ivo is talking about is over her i think.
> 
> http://jahkaparticles.blogspot.com/
> 
> Keep up the good work.
> thanks.

Martin Lubich (Feb 02, 2011)
> Interesting tests here Ben.
> 
> Did you also try some animation and softbody simulation with these setups ?
> 
> Its good to see that the hair system is getting some updates. It wont help me in my project but its good to know if this feature is worked and improved on.

Tweets that mention Hair testing in Blender 2.56 « BenSimonds.com -- Topsy.com (Feb 02, 2011)
> [...] This post was mentioned on Twitter by Julien Guigner and Leto Atrell, Ton Roosendaal. Ton Roosendaal said: Hair testing in #blender: http://wp.me/ps72g-eV hey @BenSimonds now get it animated with physics sim! :) [...]

Ivo (Feb 02, 2011)
> I really like the curly hair. Also saw the dev-video about it. Very very good stuff.

bensimonds (Feb 02, 2011)
> Aha. I haven't seen any dev video yet. Got a link?

Nik (Feb 02, 2011)
> Nice, i also noticed now that the interpolation of child particles is much better than it used to be! Very much appreciated!
> 
> I would love to see the hair system get some more attention on the rendering side of things. It's very hard to do a good looking setup out of the box, and you have to be very careful with the lighting setup. 
> 
> Btw, is the hair interpenetrating in these renders? The upper-right part of the upper-right picture looks a bit funky.

Hair in Blender « BenSimonds.com &laquo; ThruDreamsgate&#039;s Blog (Feb 17, 2011)
> [...] in case you missed it first time around, in a previous post he covered some of the new settings in the particle [...]

Hair in Blender &laquo; BenSimonds.com (Feb 17, 2011)
> [...] separating areas of hair within the same particle system. You can get some more details on them here in a previous post I wrote). Particularly for animation if you&#8217;re doing some kind of [...]

JH (Mar 17, 2011)
> One question- has anyone got the new hair system working with hair dynamics on 2.5?  The hair seems to fall through the skull- no collision.
> 
> I've looked all over the net assuming maybe I was just making an error (tried latest svn builds, making a separate deflector mesh, enabling collisions, etc) but most of the postings seemed to indicate fixing this issue with dynamics were omitted for now.
> 
> But now here is this video Ben made... what am I missing?  This is an older version maybe?

Ben Simonds (Mar 17, 2011)
> It works in 2.5, the video I posted was using a recent 2.56 build. I'm not sure what your issue could be.

Nik (Mar 17, 2011)
> Hair going though everything means you probably didn't assign enough weight to the hair in Particle Mode. The Weight property for the hair determines how stiff it will be and where.

FelipeDR (Jul 05, 2011)
> Hello Ben.
> I wonder how do you get the collision of particles hair in Blender 2.5
> Sorry fot my english.

Ben Simonds (Jul 05, 2011)
> You need to turn on collision for the collider objects in the physics panel.

Frej Karlsson (Nov 09, 2011)
> hi i as many others here, find that the hair will not collide correctly, i was wondering if you could post pictures of your settings on physics, collision etz, been trying to find guides/help on this for over a month now, real irritating as its the only thing missing for my full human model :/ your help would be appreciated.

APM DESIGNS (Feb 05, 2013)
> The "Particle Mode" for hair is very impressive. Being able to cut, comb, add hair etc  is really impressive.

ヘアー／ファー (Hair / Fur) [Blender] &#8211; Site-Builder.wiki (Mar 13, 2020)
> [&#8230;] Hair testing in Blender 2.56 | BenSimonds.com [&#8230;]
