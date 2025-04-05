---
title: 'Blender Python for Beginners: Some Useful For Loops.'
date: '2012-04-03'
tags:
- blender
- bpy
- for loop
- python
- python
- snippets
- tutorials
author: Ben Simonds
alias: blog/posts/2012-04-03-blender-python-for-beginners-some-useful-for-loops

---

I started learning python a bit more seriously late last year, and since then it's saved my bacon more times than I can count. It's a terrific tool both inside and outside of blender, for automating tedious batch processes and adding little functions to blender that you just wish were there sometimes. Whilst learning python and the bpy API more fully will take some (well spent) time, you can get to know blenders python API very easily thanks to the Autocomplete function (Ctrl-Space) which will present you with a list of available options when exploring the api from blenders python console. One use of the python console that is very quick to get the hang of is using for loops to the properties of multiple objects at the same time. To get a list of all the selected objects, you can use **bpy.context.selected_objects**. Then you can run through the list with a for loop, which will do the same thing to each entry in the list. For example the following sets all of the selected objects display level to wireframe: 
    
    
    for x in bpy.context.selected_objects:
        x.draw_type = 'WIRE'

An example that might be useful if you're working on a complex render setup might be to batch assign object indices to a selection: 
    
    
    for x in bpy.context.selected_objects:
        x.pass_index = 1

Another useful example is setting the display level for all your objects subsuf modifiers to zero. This greatly speeds up your viewport performance when working with a complex scene, and whilst blender lets you do this using the simplification tools in the scene tab, you can't (to my knowledge) do it just for objects in the 3D Viewport (the simplify options affect both the viewport and rendertime). This time, we to use **try** to allow blender to ignore objects that don't have subsurf modifiers that need changing: 
    
    
    for x in bpy.context.selected_objects:
        try:
            x.modifiers['Subsurf'].levels = 0
        except KeyError:
            print("No subsurf on this object")

A handy one when working with blenders camera tracking tools (or something else that generates lot of empties) is to use a for loop to change the draw type and size for a whole bunch of empties. It's handy for shrinking them down to keep them out of the way: 
    
    
    for x in bpy.context.selected_objects:
        try:
            x.empty_draw_type = 'CUBE'
            x.empty_draw_size = 0.1
        except KeyError:
            print("This one isn't an empty.")

You can find more options that you can change this way by exploring the api with autocomplete, or if you have a specific property in mind that you want to change you can simply right click it in blenders UI and select **Copy Data Path** to copy the last part of the data path to the clipboard. You can either save these little snippets as scripts or simply type them in when you need them - they're pretty short. If you're saving them as a script remember to add the line "import bpy" at the beginning of the script (you don't need to do this in the console). Anyway, I just wanted to share something in python that might be pretty easy for beginners to grasp, and that I've found really useful. Let me know in the comments if you have any good ones of your own!



