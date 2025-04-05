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

I've been trying to learn a bit about writing OSL shaders the past couple of days, and I'm finding it pretty interesting. So far I've just learned a bit about what osl can do and how to put together a basic shader. Here's one of my first attempts - a procedural dirt shader based on the trace function. It's pretty much just an ambient occlusion pass that you can use as a mask for other materials, but what's nice about it is that it's completely dynamic: no baking, no vertex paint etc. Here's what it looks like:

![ProceduralDirt ><](/images/old/proceduraldirt.jpg?w=606)


And here's the shader code: 
    
    
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
    

Edit: Here's a screenshot of the node setup.

[![Screen Shot 2014-01-07 at 19.01.34 ><](/images/old/screen-shot-2014-01-07-at-19-01-34.png?w=950)](/images/old/screen-shot-2014-01-07-at-19-01-34.png)




