---
title: A few rigging related python snippets.
date: '2011-07-18'
tags:
- technical
- tutorials
author: Ben Simonds
alias: blog/posts/2011-07-18-a-few-rigging-related-python-snippets

---

I've been working on some character rigs recently, and trying to learn and use more python to speed up the process and improve my rigs. One of my favourite uses that I've come across so far is using a "for" loop to do batch operations on bones, which is super handy when building complex rigs, as you can do batch renaming and changing of options on a whole bunch of bones at once rather than having to do things one-bone-at-a-time by hand. I thought I'd share some of my favourite python snippets that have come in handy so far. When in edit mode, select the bones you want to change and put the following in a new text block, comment out any operations you dont want to perform, and hit alt-P to run the script: 
    
    
    import bpy
    bones_list = bpy.data.armatures['RIG NAME'].bones
    bones_selected = bpy.context.selected_bones
    #Some tools for renaming bones and removing trailing numbers once you've renamed them. Handy when duplicating parts of your deform rig to create your control rigs. Switch bones_selected for bones_list to perform an operation on every bone in your rig.
    for item in bones_selected: 
        item.name = item.name.replace("DEF-","CON-")   
        item.name = item.name.replace(".001","") 
        item.name = item.name.replace(".002","")
    
    # Some tools for changing bone properties. use_deform turns off the bones "deform" option, always do this for bones you don't want to directly deform your mesh (control/helper bones) . show_wire makes bone shapes visible in solid view mode, even if they only have edges.
    
    for item in bones_selected:
        item.use_deform = False 
        item.show_wire = True
    
    # Here are a couple of useful ones to try in pose mode. rotation_mode lets you set whether your bones use Euler or quarternion rotations, and custom_shape lets you set the bone shape used for all the bones you have selected. 
    
    bones_selected_pose = bpy.context.selected_pose_bones
    for item in bones_selected_pose:
         item.rotation_mode = 'XYZ'
         item.custom_shape = bpy.data.objects['NAME OF BONE SHAPE OBJECT']





# Comments


Milad Thaha (Jul 18, 2011)
> Gawd, I wish I knew python- this looks handy.

Ben Simonds (Jul 18, 2011)
> Super handy. I just started learning recently and it's such a timesaver. Try the non-programmers guide to python (http://en.wikibooks.org/wiki/Non-Programmer%27s_Tutorial_for_Python_3) for a good intro if you're interested in learning. It's good to get your head around just regular python a little before jumping into bpy.

mikebelanger (@mikebelanger) (Aug 25, 2011)
> Great tips!  Its nice to make simple tools in rigging too.   Full-featured, end-to-end rigging has its drawbacks.
