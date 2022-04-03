---
title: 3D Anaglyph Experimentation
date: '2010-06-21'
tags:
- 3d
- anaglyph
- blender
- compositing
- quick projects
- red blue anaglyph
- red cyan
- tutorials
author: Ben Simonds
alias: blog/posts/2010-06-21-3d-anaglyph-experimentation

---

![>< ><](/images/old/clint3d.jpg)


I got a pair of 3D anaglyph glasses off amazon the other day, and had a go at creating anaglyph 3D images. The method is actually extremely simple - all you need is a right eye and a left eye image (place two cameras slightly apart but pointed at the same point in the scene, and render both), which are combined to make a single anaglyph. This is easily done using the combine/separate RGBA nodes in blender's node editor. You just take the red channel from the left image and the blue and green channels from the right image, and combine them to get the result. Like so:

![>< ><](/images/old/3d.png)

This gives pretty good results. One thing to note though is that the red channel of an image contains less texture information, and so desaturating the left eye image slightly before separating the channels can give better results. You can see in the node set-up above I have used a HSV node to do this. The method also works for animation - just import a sequence or movie file for each eye (yup, you'll have to render twice) instead of a still image. 

Animated gif:

![>< ><](/images/old/gunspin.gif)


# Comments


Angel Angelov (Jun 25, 2010)
> That's a great tip for combining the two images.
> I created a pretty cool off-axis camera rig that avoids vertical parallax, I will be posting that soon. With this the anaglyph thing will be complete :)

bensimonds (Jun 28, 2010)
> Sounds cool. Leave a comment when it's done!

Treva (Jul 19, 2010)
> World of thanks to you for this!  I've been wanting to do a 3D version of the movie that I've been creating these past few years.
> 
> I fetched one of the 3D glasses that we've kept around the house to see if they would work with the image you placed here.  It did.  Now, I wish that you were able to offer us a short video sample.

Treva (Jul 19, 2010)
> My bad :|
> I referred to the image of the male bust.  I just noticed the gun and animated gif reference.  I loaded the gif and watched the the 3D glasses.  I could still see the red and blue.
> 
> Isn't there supposed to be some sort of shift in the yellow channel?  Perhaps, a slight one?  Also, as I recall from viewing the classic 3D movies many years ago when I took my glasses off the scenes appeared blurry.  I think, 3 cameras were used back in the day.  Maybe, if we try using a 3 camera technique we might find a way to get more of the 3D effect?  Perhaps, soften (Blur?) the red and blue channels?
> 
> Just a thought.  Anyhow, I still appreciate the info in your post.  It has inspired me to experiment.  If you get the jump on me to experiment with what I've suggested, please post your results.

Angel Angelov (Jul 19, 2010)
> Here it is: http://www.ageek.tk/a/StereoRig :)

bensimonds (Jul 19, 2010)
> I'm afraid to say I think you've got the wrong end of the stick there. For one, there is no such thing as a yellow channel, and secondly only two cameras are necessary, as humans only have two eyes - one camera for each. As far as the blur - this occurs because you are looking at two images from different viewpoints combined together, no actual blurring of either image is being done, this would only degrade their quality. 
> 
> One thing that can improve the effect is careful mixing of the red channel with a greyscale copy of the other channels to improve the contrast of that layer before combining the two images to make an anaglyph.

Angel Angelov (Jul 19, 2010)
> You've probably got low quality glasses? Here the gun has a terrific stereo effect and no red/blue ghosts are visible. Are you sure you're using left-red right-cyan glasses and not flipped or red/green ones?

bensimonds (Jul 20, 2010)
> Nice work. You have some great results there.
