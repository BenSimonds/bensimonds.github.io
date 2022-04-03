---
title: Blender 2.5 Sculpting
date: '2010-07-29'
tags:
- '2.5'
- blender
- brushes
- quick projects
- sculpting
- soc
- summer of code
- tutorials
author: Ben Simonds
alias: blog/posts/2010-07-29-blender-2-5-sculpting

---

With the recent google summer of code project by Jason Wilkins to improve the sculpt tools, there have been some massive improvements to blenders capabilities for organic and even hard surface sculpting. I wanted to share some experiments of mine plus a few tips. 

![><](/images/old/female_sculp1.jpg)


My favourite new tools are by far the fill and scrape tools, that are brilliant for filling in and scraping away forms (as the name suggests). They're amazingly powerful brushes, and great when combined with the clay tool, using it to build up the forms and masses, and then using fill and scrape to refine them into nice smooth shapes. Doing some work for a client recently, I was working on some nice smooth shapes for a vacuum cleaner, and when making modifications to the design the fill and scrape tools were invaluable in allowing me to first make a modification to the design in edit mode, then switch to sculpting and recover the nice smooth curves that the modifications had damaged. They're also good for organic stuff, especially necks and armpits and other such concave areas, where the fill tool is ideal for filling in holes and smoothing shapes without losing the curve of the surface. 

![>< ><](/images/old/pillar.jpg)


The pillar above was sculpted mainly with the fill and scrape tools, with the new plane offset setting used to deepen the stroke, allowing me to carve nice gashes and chunks out of the surface whilst maintaining nice planar forms. Another great addition is the crease tool, which is brilliant for defining sharp edges like the crease of the lips, or wrinkles and folds in skin without having to have your mesh subdivided to insane levels. It works by combining the old draw and pinch tools into a single brush and is great for making forms stand out. The sculpt below kinda takes that to extremes, but it was a fun test of the new tool.

![>< ><](/images/old/creaseman.jpg)


Some other great new tools are the polish brush, which works like a smooth tool combined with flatten, and is brilliant for both getting nice smooth forms even on areas with tricky topology (something that was sometimes difficult with the regular smooth brush) and at higher strengths it creates nice flat surfaces with sharp, defined edges, which is great for hard surface models.

![>< ><](/images/old/render4.png)


There are still a few rough edges to the new tools when compared to a more mature sculpting app like zbrush, anchored brushes are still painfully slow at times, and a proper matcap view mode with cavity shading would be a brilliant feature to have, but by and large the new tools are pretty brilliant, and rapidly catching up with the big league sculpting apps like zbrush and mudbox.





# Comments


Vincent (Jan 21, 2011)
> Have you try sculptris?

bensimonds (Jan 23, 2011)
> I have, it used to run nicely under wine and I had fun using it, it seems like a great program for more sketchy sculpts where you aren't sure of the forms you want yet. I like having subdivision levels for most sculpting though. It makes for much more non-destructive sculpting.

RH2 (Jul 30, 2010)
> The pillar looks great.

Clean3d (Jul 30, 2010)
> Nice work! This makes me want to try our some sculpting as well.

2.53 Beta Released &laquo; bms blog (Jul 10, 2011)
> [...] 2_ Blender 2.5 Sculpting by_ben [...]

Blender 2.53 Beta Released &laquo; bms blog (Jul 10, 2011)
> [...] 2_ Blender 2.5 Sculpting by_ben [...]

Dr K Ashok Kumar (Aug 22, 2011)
> Its great..! I tried sculpting...but i am not able to import brushes using the User preferences, as the brush option is not available in the import panel. May i know how to solve this problem...please?  I have the latest version of blender installed (Blender 2.59.0 r39307).

Ben Simonds (Aug 22, 2011)
> You append brushes like you would any other kind of data from another blend file, via file &gt; append and selecting the blend file with your brushes in and selecting them from there.
