---
title: Open Shading Language Experiment
date: '2014-01-07'
tags:
- blender
- code
- cycles
- dirt shader
- open shader language
- open shading
- osl
- procedural dirt
- quick projects
- shader
author: Ben Simonds
alias: blog/posts/2014-01-07-open-shading-language-experiment

---

I've been trying to learn a bit about writing OSL shaders the past couple of days, and I'm finding it pretty interesting. So far I've just learned a bit about what osl can do and how to put together a basic shader. Here's one of my first attempts - a procedural dirt shader based on the trace function. It's pretty much just an ambient occlusion pass that you can use as a mask for other materials, but what's nice about it is that it's completely dynamic: no baking, no vertex paint etc. Here's what it looks like: [![ProceduralDirt](/images/old/proceduraldirt.jpg?w=606)](/images/old/proceduraldirt.jpg) And here's the shader code: 
    
    
    shader tracetest(
        normal Normal = N,
        float Distance = 10,
        float NoiseFactor = 0.5,
        float NoiseScale = 100,
        output float TraceRandom = 0.0)
    
    {
        normal NewNorm = Normal;
        // Create a randomised normal to trace with.
        vector RandomVec = vector(0,0,0);
        vector NormalVec = transform("common", N);
        RandomVec = NormalVec + (NoiseFactor * noise("perlin", P * NoiseScale));
        RandomVec = normalize(RandomVec);
        int Hit2 = trace(P, RandomVec, "maxdist", Distance);
        if (Hit2) {
            float Dist = 0.0;
            // Get the hit distance:
            int HitTrace = getmessage("trace", "hitdist", Dist);
            // Turn Hit Distance into output:
            float Grad = 1 - Dist/Distance;
            TraceRandom = pow(Grad,2);
            }
    }
    

Edit: Here's a screenshot of the node setup. [![Screen Shot 2014-01-07 at 19.01.34](/images/old/screen-shot-2014-01-07-at-19-01-34.png?w=950)](/images/old/screen-shot-2014-01-07-at-19-01-34.png)





# Comments


playway (Jan 22, 2014)
> Really impresses with all of your work so far Ben. I am thinking of buying a new computer. Can you tell me what are your system specs and what do you recommend?
> 
> Thanx!

Noel (Apr 04, 2014)
> What resources are you using to learn OSL?

Spirou4D (Jan 08, 2014)
> Good! 
> Congratulations.

playway (Jan 23, 2014)
> Ah, I see. Thanx for helping me out! A little professional advice is always helpful:)
> 
> Good luck for your future projects and have a nice day!

Ben Simonds (Jan 23, 2014)
> Hi Playway
> 
> I'm using a 2011 iMac for my work. 8GB Ram, Quad Core processor. The most important hardware specs for blender are RAM (for handling large scenes) and CPU power (for rendering). GPU is obviously usefull as well, particularly if you want to use it for rendering. I'd advise having a quad core machine with at least 8GB of ram but the rest I'm not too up to date on...

Spirou4D (Jan 07, 2014)
> Thks a lot Ben,
> 
> And all my best Greetinsg for this new year 2014.
> Could you add a screenview of the node's setup, please.
> Bye bye
> SPirou4D

Ben Simonds (Jan 07, 2014)
> Added! Thanks SPirou4D

Ben Simonds (Apr 04, 2014)
> Mainly Thomas Dinges' site, OpenShading.com, and the OSL Specification. You can find the latter at https://code.google.com/p/openshadinglanguage/

Roberto Locatelli (Aug 15, 2015)
> So compact script and so impressive result!

Lynchon (Oct 04, 2016)
> Script works perfect, but it takes ages to render. Am i doing something wrong or is just normal when using OSL

Open Shading Language from Scratch (Ubuntu) &#8211; Digital Box (Dec 27, 2018)
> [&#8230;] Open Shading Language experiment [&#8230;]
