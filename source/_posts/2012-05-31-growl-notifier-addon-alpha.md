---
title: Growl Notifier Addon (Alpha)
date: '2012-05-31'
tags:
- addd on
- addon
- blender
- growl
- notifications
- python
- python
- script
- software
author: Ben Simonds
alias: blog/posts/2012-05-31-growl-notifier-addon-alpha

---

I've been experimenting with [Growl](http://growl.info/) lately, which is a great notifications system for osx with a whole load of useful controls, including notification by email, as well as a python api for doing notifications. Afters seeing Jason Van Gumster's [render music script](http://wiki.blender.org/index.php/Extensions:2.6/Py/Scripts/Render/Render_Music), I thought it would be a good project to try and combine the two. The result is a Growl notifier addon for blender that gives you notifications about rendering, which is really useful to have if you're setting off an animation to render over night and you want be kept up to date with how it's doing, or even if you're just web browsing whilst you wait for a quick render and want to be notified when it's done. [![](/images/old/bgrowl.jpg)](/images/old/bgrowl.jpg) **Features:**

  * Sends notifications when blender finishes rendering a frame, image, or a whole animation.
  * Notifications can be sent to your desktop, email, or iOS device (via Prowl), according to what notification style you choose.
  * Notification message lists filename of blendfile, number of frames rendered, and location of rendered frames.

**Installation:** In order to use the addon, you'll need Growl installed (it's avaliable from the app store, for about £1.50), as well as the gntp python library (which needs to be placed in blenders python directory if you're using a build with bundled python). You can get the gntp library here: <http://pypi.python.org/pypi/gntplib#downloads> Then unzip the gntplib directory to /Applications/Blender/blender.app/Contents/MacOS/2.63/python/lib/python3.2/ Then you can download and install the addon: <http://dl.dropbox.com/u/180363/GrowlPlugin/growl_notifier.zip> (just use install add-on from blenders user preferences, and point it to the zip). **Usage:** [![](/images/old/screen-shot-2012-05-31-at-14-44-34.png)](/images/old/screen-shot-2012-05-31-at-14-44-34.png) The script places a few options in the render panel, allowing you to choose what you want to be notified about. The notification style option simply allows you to choose from two different notification types, which I've named Desktop and Email for convenience, as that's what I use them for, but you can set them to notify them any way you like using Growl's preferences. 

[![](/images/old/screen-shot-2012-05-31-at-14-47-17.png)](/images/old/screen-shot-2012-05-31-at-14-47-17.png)

You should now be getting render notifications! Anyway, if anyone wants to play with it I'd love to get some feedback on it, so please download it and have a go. This is my first time putting together an addod, so if there area any bugs in the script or if I've done something incorrectly let me know and I'll try and put it right.





# Comments


francoisgfx (Jun 02, 2012)
> Nice one Ben ! 
> This is how you can simply use prowl w/o growl :
> http://prowl.weks.net/publicapi/add?apikey=APIKEY&amp;application=APPNAME &amp;event=EVENTNAME"&amp;description=YOURDESCRIPTION&amp;priority=2

hperigo (Jun 04, 2012)
> cool one =)
> this is probably not so related, but anyway.. it can give some ideas...
> 
> last year for my final project at collage I did a a script that watches a folder for any .txt called “RenderList”, if this file is found the script lunches blender to render the files written in the txt file. The cool thing is that you can use Dropbox to upload a .blend file and if the output folder is also shared in DropBox you can see the rendering almost in "realtime". It was a pretty good life saver since I was working at home (bad PC) and rendering at work  (good PC) in the night!
> 
> check it out:
> http://blenderartists.org/forum/showthread.php?233215-A-very-simple-render-server-with-DropBox&amp;p=1963316&amp;highlight=#post1963316
> 
> 
> bye!

Mate (Oct 15, 2016)
> Great stuff, thanks!
