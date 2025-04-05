---
title: Multi Quicktime Add-On
date: '2013-10-14'
tags:
- automation
- blender
- python
- qt_tools
- quicktime
- scripting
- uncategorized
- video
author: Ben Simonds
alias: blog/posts/2013-10-14-multi-quicktime-add-on

---

I've been working on a new script at Gecko for a side-project of ours in for which we need to generate a lot of video files at different sizes and in different codecs. Because we were processing the frames for these videos in blender we wanted a solution that could just take those rendered frames and produce all of the videos we needed. Enter a nifty command line tool called [qt_tools](http://omino.com/sw/qt_tools/) and some python scripting!

[![MQT_Demo ><](/images/old/mqt_demo.jpg?w=950)](/images/old/mqt_demo.jpg)



The script I came up with lets you specify a list of different output files that you want to create, and define settings for each using different settings files. Then you can either manually set off an export of each of these videos from your rendered frames, or have the export automatically happen after you finish rendering your animation. And because qt_tools has access to all of the codecs and soforth that quicktime does, you have a lot of flexibility in what kinds of video you can make (more than blender has natively as far as quicktime is concerned anyway).

You can also use the script just to create a single file. This is great for when you want to render out a playblast or a low quality render, and get a quicktime I can quickly send to a client, but I don't want to render straight to quicktime in case I get a dropped-frame, or I already have some of the animation rendered. I've even included an Auto open option to automatically open the resulting file in Quicktime Player 7 once finished.

#### Instructions:

**Important:** The script requires you have [qt_tools](http://omino.com/sw/qt_tools/) installed for it to work in its current state (see To Do list), which means you'll need to be on a Mac too. 1\. [Download](https://dl.dropboxusercontent.com/u/180363/Hosting/Multiquicktime.py), Install, and Enable the addon. 2\. Look in the Render Tab of the Properties Editor, under Multi-Quicktime. 3\. Click "Add Multi Quicktime Output" to create at least one output file. 4\. Configure a new settings file or browse for an existing one if you've created one before. Clicking on the configure button will bring up the same settings dialog that Quicktime uses natively. Set other properties as desired:

[![MQT_Settings ><](/images/old/mqt_settings1.jpg?w=950)](/images/old/mqt_settings1.jpg)


5\. Either manually generate your quicktime outputs with "Generate Outputs fro Frames", or enable "Auto Generate After Render" and render your animation. 

#### To Do:

The script is currently very Mac OS centric, and in particular it is very tailored to my personal setup. 

  * I use Djv for playing back frames, but it doesn't open quicktime files, so the auto open feature defualts to using Quicktime Player 7.
  * qt_tools could easily be replaced by FFMPEG or another command line video tool if this was what you preferred (though you would then have to do more work defining codec options in the script I think).

So far we're still testing the script but I'm pretty happy with how it's working. If you do try it out please let me know of any bugs/usability issues.




