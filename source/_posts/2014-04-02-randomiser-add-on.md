---
title: 'Randomiser Add-On:'
date: '2014-04-02'
tags:
- add-on
- blender
- python
- python
- resources
- script
- technical
- text
- text-block
author: Ben Simonds
alias: blog/posts/2014-04-02-randomiser-add-on

---


<iframe width="640" height="360" src="https://www.youtube.com/embed/FzJg93ksWYKws" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


This is an add on that I've been working on occasionally for a while now. It started with my first attempts at learning python by creating a simple script to help me do cascading text, Matrix style. From there I used a modified version of the script on a job doing some animated numbers and text. I've dug it out for another job recently and thought it worthwhile tidying it up and making it into an add-on rather than a stand alone script. Randomiser is an add on that is mainly useful for manipulating text data (although I've implemented a couple of features for object data as well). It's similar in some respects to [Bassam Kurdali's typewriter add-on](http://urchn.org/post/typewriter-blender-addon), but has a few differences. Randomiser can manipulate text data in a variety of ways. If you supply it with the name of a text block, it can: 

  * Produce an animated typewriter effect, with an optional leading character (like the cursor in a word processing or terminal app).
  * Display a ticker-tape readout from the supplied text, scrolling through and repeating when it reaches the end of the text.
  * Display individual lines or characters from the supplied text.

Randomiser can also use some pre-defined text sources for simpler effects. For example if can sample from binary digits (0 or 1), decimal digits (0 through 9), and alphanumeric characters. It can also simply print a number based on a "time" parameter (useful for doing count-ups and count-downs). Additionally, Randomiser has a Noise option, which lets you add random "noise" characters to the text (as seen in the demo video). This is great for doing randomly changing numbers for example, as well as some other interesting effects. The noise can be drawn from different sources just as with the main text, and you control the placement of the noise either by letting the add-on place it randomly, or by defining indices for noisy characters manually. You can specify negative indices too (this will be familiar to python users), allowing you to define noise positions relative to the end of the list, rather than the beginning. This works nicely with the typewriter effect (a trick I used in the video) to make the leading end of the text look random, but then settle into the correct characters. Objects wise, the script lets you specify a group, and will then cycle an object's data through the members of that group (they should all be of the same type). It's still in the early stages, so the add-on might be a little fragile. If you try it yourself and you come across any bugs please let me know. 

#### [Forum Thread on BlenderArtists](http://blenderartists.org/forum/showthread.php?332569-Add-On-Randomiser-Add-On-for-Animating-Text-Data)

### Download:

#### https://github.com/BenSimonds/Randomiser

### Tutorial:

https://www.youtube.com/watch?v=ys7Rh76jUN8 Apologies for the background noise... 

### Installation:

  * Simply download the script and install it to your add-ons folder in the usual way (either manually or via the user preferences menu in Blender).



### Usage:

#### Mesh Objects:

  * Select object and enable randomise from the **Object** tab of the properties editor.
  * Specify a Group to sample object data from.
  * Update Method can either be set to Frequency, which updates the object data every set number of frames, or manual, which updates every time the "Time" property changes. The manual method is probably the more natural way for blender users, where you simply add keys to drive the change. The Frequency option is just there due to my hatred of adding keyframes where I could specify a couple of offset/speed parameters instead.



#### Text Objects:

  * Select Text Object and enable randomise from the **Object Data** tab of the properties editor (text properties).
  * The Update Method options work the same as before.
  * Specify a Generate Method.
  * Based on this you will have different options for the source, choose either one of the procedural options, or for the text block options, specify the name of the text block you want to use in the Text Datablock property.



#### Adding Noise to Text:

  * Specify a Noise Method, Mask or Random.
  * For Mask, provide a comma delimited list of indices (positions) in the string to replace with noise.
  * For Random, specify a threshold for the proportion of indices to be replaced with noise.
  * Specify a source for the noise. This can be either a text block or one of the procedural options as before.
  * Other options such as Update Noise Independently let you specify how the noise positions are selected and how they are updated. The Ignore Whitespace option prevents indices being replaced if the character is a space or new line.



#### Tips:

  * If Randomiser can't find the text source it's looking for it will display an error message (or characters from it) as the text output. This is a cue to check the console for more information about the error and to check your settings.
  * The Typewriter and Ticker effects (and others) use a Text Datablock as the source for the text to display. This means a text block in the Text Editor, **not** another Text Object in the 3D Viewport.
  * When using noise consider using a monospace font - this keeps the characters the same width when replaced and stops the text "jiggling" too much.



### Change Log:

I was very happy to see how much interest people had in the script! People also provided me with plenty of bug reports to fix! Thanks very much for your interest in the script, and for providing feedback. I will do my best to keep it well maintained. 

#### Revisions:

[22-04-14] Added a Clock readout method for randomising text. Can display either in hh:mm:ss or hh:mm format.

[09-04-14] Added a "Seed" property. Objects/Text Blocks with different seed properties will generate different object data/text. Also added some operators for working with seeds.

[09-04-14] Fixed some bugs with Pick Random generate method, added an "Avoid Repeats" option that prevents the same choice coming up twice at the expense of making generation less random.

[07-04-14] Some minor UI Tweaks, bug fixes for enabling/disabling add-on.

[07-04-14] Fixed Attribute Error when working with linked/appended objects that don't have Randomiser settings yet.

[07-04-14] Added some better error messages and feedback for when the script needs more user input/can't find the data it wants.

[07-04-14] Fixed the Locale Error issue ("locale.Error: unsupported locale settings") when enabling add-on. Was an issue with the "Locale" python module the script uses for formatting numbers correctly as strings. Replaced module with a simpler and more reliable method.

 





# Comments


Benoit (Apr 07, 2014)
> Hello Ben,
> Thanks for this great addon :D, but i have some troubles with it:
> When loading in blender 2.70 with factory settings, it works like a charm.
> My default blend file, has some other scenes already linked in it, and then your addon does not work anymore.
> I have the followin error on the console:
> Traceback (most recent call last):
>   File "/home/roussell/.config/blender/2.70/scripts/addons/Randomiser_addon.py", line 643, in randomise_handler
>     if text.randomiser.use_randomise == True:
> AttributeError: 'Curve' object has no attribute 'randomiser'
> Any hint ?
> Thanks, Benoit

JohnnyDeezWax (Apr 09, 2014)
> Yep, the flickering is gone. How awesome. You are the man.  
> The Updated script also fixed the linking of the *.txt in the text editor to the add-on. Previously, the add-on would only type 'Error' in Scroll Text and Typewriter modes.
> 
> The only bug left is when text is typed directly into the 'Text Datablock' field, like in your first demonstration, the script still outputs 'Error' instead. But, I can live with this. 
> 
> Good job! Thanks for sharing such a useful add-on.

monk (Jun 10, 2014)
> eeeeeh okay, i am good to go, cool cheers,
> u can stop shaking ur head now! yeah i know, trying man 8)

Ben Simonds (Jun 10, 2014)
> No worries. Let me know if you make anything cool with it!

Ben Simonds (Apr 04, 2014)
> I'm not sure. I don't quite know what the process is for that, but if sufficient people are keen I can look into it.

david (Apr 04, 2014)
> If I get time next week I'd like to do a tutorial or demo for this script.  See if it gathers some more interest.

Benoit (Apr 12, 2014)
> Hello Ben,
> That issue happens when there are other text objects in other scenes (and also current scene ?).
> I have fixed it by adding:
> if hasattr(text,'randomiser'):
> on line 643. Here is what the for block looks like:
>     to_randomise = []
>     for text in bpy.data.curves:
>         if hasattr(text,'randomiser'):
>              if text.randomiser.use_randomise == True:
>                 to_randomise.append(text)
> 
> Can you add it in original file ?
> Thanks for that great addon !!
> Benoit.

Sept (Apr 05, 2014)
> Hi Ben,
> I am having some trouble installing the addon in Blender 2.7 final release; on enabling the addon I get a locale error (locale.Error: unsupported locale settings). I tried in 2.69 with the same error. Can you help?
> 
> Thanks in advance.
> Sept

pananag (Apr 05, 2014)
> Not working... I get an error "message locale.Error: unsupported locale setting" . Line 672 in Randomiser_addon.py is causing this. Line 672 is
> locale.setlocale(locate.LC_ALL,'en_GB')

Randomiser Add-on | BlenderNation (Apr 05, 2014)
> [&#8230;] Randomiser Add-on [&#8230;]

pananag (Apr 05, 2014)
> I replaced 'en_GB' with 'english' and now the addon can be activated. But now whenever I activate the Randomiser option in the Text Object Data panel I get an ERROR text instead of the text in the text object...

Eddy Sag (Apr 05, 2014)
> the are something wrong APPEAR MESSAGE  LOCAL ERROR : UNSSOPORTER LOCALE SETTING

ammusionist (Oct 19, 2014)
> HI Ben,
> I’ve been using this to help my son with a text animatic project he’s doing for school and I have a couple of small issues using Typewriter mode (No leader)
> 
> If there is an offset, the text will often appear well before the offset frame, then disappear and start over when the offset is reached. I can combat this by keyframing the frame rate to 0.1 one frame before the offset and 1.0 at the offset frame. Still would be nice if I didn’t have to do this though!
> 
> Second – Apostrophes in the text appear to be stripped out. Is this deliberate, or just something due to Pythons handling of text?
> 
> Thanks.

david (Apr 22, 2014)
> Clock is excellent addition to this generator. Any chance of a current frame source for timeline time? #frame  And is tjere a way to get vse proxy timecode if generated? Hmm perhaps it would be easier to use a strips current frame value?
> Outside of the box thinking,  is there any way to generate text as a node for composotor like masks are? Save rendering a 3d view.

Benoit (Apr 15, 2014)
> Hello Ben,
> i found another issue:
> let's say you are creating a new scene (scene.001) with a "randomized text animated between frame 1 and 100".
> Then in the sequencer of the main scene, you add a new strip from scene.001. 
> When you move that strip 1000 frame later, animation cannot be seen anymore.
> It is like frames number are harcoded, and do not use frame numbers from scene.001.
> I can produce a screencast, if this is not clear.
> Thanks,
> Benoit.

Ben Simonds (Apr 04, 2014)
> That's be great David! Let me know if you run into any issues.

Ben Simonds (Apr 03, 2014)
> Thanks Reyn! Let me know if you try it out!

Ben Simonds (May 06, 2014)
> Thanks David. What do you mean by "current frame source" ? The frequency update method uses the current frame to drive updates already.

david (Apr 04, 2014)
> Ben thank you for a great little addon. Its a perfect addition for motion graphics people.  Any chance of getting it into a trunk release?

Vilem Novak (Apr 05, 2014)
> hah fun. I did something similar 2 weeks ago. Seems this functionality was really needed.
>  http://blenderartists.org/forum/showthread.php?330821-updated-Typewriter-script&amp;highlight=typewriter

Ben Simonds (Apr 15, 2014)
> Aha. Thanks for that. I will look into it.

Ben Simonds (Apr 14, 2014)
> Hi Benoit, thanks for your comments. The latest version of the script from GitHub should already have this fixed.

monk (Jun 10, 2014)
> yeah good to know people r using it except me! new to blender,
> does it work with blender 2.70? downloaded the scripts unzipd, used the video to follow on instruction for add-ons; tried both files using user preference nothing, tried to throwing them in add-on directory still blender cannot find the files,
> - is it me or cannot wor with Blender 2.7 - stuck big time, cheers

Benoit (Apr 17, 2014)
> Well. i made some more testing, and here are my results.
> The goal is to be able (in a single file) to have a scene (scene.001) with an randomized text, and a Master scene where you place your strip scene.001 where you want.
> 
> So:
> - for typewriter effect, it does not work if you use frequency update, but it does work with manual update and keyframes: That's the good news :D
> - for counting, if you want a counter that goes from 1 to 100. it does not work with keyframes, which is more surprising.
> 
> So for me this is all good for typewriter effect, but still looking for a way to achieve the counting.
> 
> By the way, do you think we could have one more type like counting, but for hours,minutes,secs, or simply add a base/modulo variables ?
> 
> Thanks :D

reynantem (Apr 03, 2014)
> This is awesome, Ben!
> 
> I almost deleted the newsletter I received since it went straight to my Spam folder.
> 
> I'm glad I didn't. ;)
> 
> Thanks for sharing!
> 
> -Reyn

Ben Simonds (Apr 05, 2014)
> Hi Pananang - this should only happen if the script cant find the text source you've specified. Check the console - it should provide you with some guidance. If not please send me a copy of the error message the console gives.

JohnnyDeezWax (Apr 05, 2014)
> I get the 'ERROR' text too when I use Typewriter or Scrolling Text. I am really grateful for this add-on, the Counter and random objects are two functions I will definitely be using. Thanks!

pananag (Apr 05, 2014)
> Console says: Key given but text block not found! Method: Grow - No textblock given as soure. Check your settings.
> 
> I've entered the name of the Text object (Text) in the Text Datablock textbox, but I still get this error message...

JohnnyDeezWax (Apr 05, 2014)
> Also, I notice that the Frames per Update on Pick Random (text) is not working. For example, I entered 20 Frames per Update and instead of showing me a random character for 20 frames, it shows 2 characters flickering 1 frame each, for 20 frames. Then after 20 frames two new characters flicker in the same way. The flicker pairs are neighboring characters, that is 'C' and 'D' will be flickering together, or 'Y' and 'Z', or 'P' and 'Q'. 
> Hope this helps for debuging.

Gregory (Apr 07, 2014)
> Hi Ben! It's realy the good addon,now only need manteining it.;)))
> Exist other similar projectes,I think you seach them.
> (Unite together into one).
> Good luck!!
> P.S.It's "Randomiser TEXT add-on" (Randomiser is very the abstract word.

David Mcsween (@3pointedit) (May 28, 2014)
> Ben I used your addon, for the green matrix text effect, in this TV news story from Australia. I hope it isn't geoblocked http://www.abc.net.au/7.30/content/2014/s4003061.htm

Ben Simonds (Apr 05, 2014)
> To those getting locale issues. This is due to the locale python module that is used for formatting numbers into strings with commas (i.e. "100,000" not "100000"). I've updated the download link with a version of the script that skips this feature for now, until I can track down the problem and update the script properly.

Ben Simonds (May 28, 2014)
> Cool! Thanks for the heads up, glad to see people are using it.

Ben Simonds (Apr 09, 2014)
> This one took me a while! I couldn't replicate it at first. It should be fixed in the latest version on git though.

Ben Simonds (Apr 17, 2014)
> Hi Benoit. I've been working on randomiser today - I made some changes to how it works out what text should be, and it should work better with the VSE. The time option is a great idea. I'll look at adding this in future!

Ben Simonds (Apr 22, 2014)
> Added a Clock readout to the latest version of Randomiser on GitHub.

Benoit (Apr 22, 2014)
> Just tried it :D
> you rock !!

stephen (Jun 02, 2015)
> Actually, ignore that, there does seem to be something wrong...
> 
> It's a project that I started before installing the plugin, so not sure if that's the reason.
> 
> I've opened Blender from the terminal so I can see any Python errors that are popping up and I get this when the text should be updating (changing frames etc):
> 
> Traceback (most recent call last):
>   File "/Users/stephen/Library/Application Support/Blender/2.74/scripts/addons/Randomiser_addon.py", line 643, in randomise_handler
>     if text.randomiser.use_randomise == True:
> AttributeError: 'Curve' object has no attribute 'randomiser'
> 
> It's definitely a text object and not a curve...

Ben Simonds (Jun 22, 2015)
> Hi Stephen. I downloaded this and had a look. Seems to work right off the bat for me. Here's a gif of the output: /images/old/broadc.gif (cropped), let me know if that's what you would expect.

stephen (Jun 22, 2015)
> Ok, this is really weird. I downloaded the file that I just uploaded to test again (I deleted the one I uploaded) and it wasn't working again. I quit Blender so that I could start it from the Terminal and get output from the script and do a screen recording, then it started working... This is really frustrating, arg.
> 
> I'll do a bit of testing myself to see if I can figure out what's going on and give you an update of what I find. From looking at the errors, Blender thinks that the text is a curve object that has no attribute 'randomiser'...

stephen (May 31, 2015)
> Doesn't seem to be working at all in a recent version of Blender (2.74). Turning the 'Randomise' checkbox on does absolutely nothing for text (yes, it's the checkbox in the font menu rather than the object menu).
> 
> Can't see any errors popping up or any red lines in the info window...

stephen (May 31, 2015)
> Doesn't seem to be working in 2.74. No errors. Have checked the box in the text menu, but the text isn't changing in the viewport...

stephen (Jun 22, 2015)
> Having the same "AttributeError: 'Curve'" problem again...
> 
> I've uploaded the file, can be downloaded here:
> 
> http://www.spintheyarn.co.uk/projects/blender-randomiser/randomiser-error.blend
> 
> This is basically a project that I'm working on for a client, so there were more scenes, but I've stripped them out for this upload (thought this info might be useful in tracking down the bug).
> 
> Would be good to know if this file works ok with your setup?

Ben Simonds (Oct 20, 2014)
> Thanks for your comment, it's great to have feedback on the add-on. I've added these issues to the tracker on Github and I'm going to try and get to them soon!

Ben Simonds (Oct 20, 2014)
> I've had a go with those bugs you pointed out. I think the first one should be fixed now. However I can't replicate your problem with apostrophes being stripped out. They seem to be displayed fine to me. Perhaps check if it's an issue with your font (maybe it doesn't have one) or maybe just try the latest version and see if that fixes it. If it persists get in touch and send me a blend file!

stephen (Jun 01, 2015)
> Seems to have been a bit of user error. I installed the addon and tried to use it in an existing project on some text I'd created before installing, the addon didn't do anything. Should have saved preferences, saved the project and restarted Blender. Suppose it's a little thing that could be fixed, but seems to be working fine after a restart :)

Ben Simonds (Jun 01, 2015)
> Hi Stephen, I seem to be doing okay on version 2.74 with the latest version of randomiser. Could you let me know more about the problem you're having? Here's a demo file that I've tested with 2.74: https://dl.dropboxusercontent.com/u/180363/test.blend
