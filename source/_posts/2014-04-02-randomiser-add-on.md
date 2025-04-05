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

 



