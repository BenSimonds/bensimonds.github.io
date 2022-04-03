---
title: Setting Up Dual Monitors with a Wacom Tablet on Ubuntu 11.04
date: '2011-05-25'
tags:
- bash
- dual-monitors
- technical
- tutorials
- ubuntu
- wacom
author: Ben Simonds
markdown:
  gfm: false
alias: blog/posts/2011-05-25-setting-up-dual-monitors-with-a-wacom-tablet-on-ubuntu-11-04

---

None




# Comments


Jamez (May 26, 2011)
> Nice tute Ben. Useful for a newbie to Ubuntu like myself. Do you have any idea how to swap the default right/middle buttons on the pen as I prefer the opposite?
> 
> cheers...

Ben Simonds (May 26, 2011)
> Yeah sure:
> 
> <code>xsetwacom --get "Wacom Intuos3 9x12 stylus" Button 3</code>
> 
> Will tell you what say button three is mapped to for your stylus. The buttons 1, 2, 3 correspond to mouse clicks left, middle, right, so to switch buttons two and three just do:
> 
> <code>xsetwacom --set "Wacom Intuos3 9x12 stylus" Button 3 2
> xsetwacom --set "Wacom Intuos3 9x12 stylus" Button 2 3</code>
> 
> Obviousy swap the device name for your stylus.

Steven Lovegrove (Jul 30, 2011)
> Thanks for your useful post! For those with an nvidia card handling their dual desktop with nvidia-settings installed, to save working out the transformation matrix each time, I use awk to pass the output of:
> 
> nvidia-settings -q FrontendResolution
> 
> # Whole desktop
> xinput set-prop "Wacom BambooFun 4x5 stylus" --type=float "Coordinate Transformation Matrix" 1 0 0 0 1 0 0 0 1
> 
> # Screen 1
> xinput set-prop "Wacom BambooFun 4x5 stylus" --type=float "Coordinate Transformation Matrix" `nvidia-settings -q FrontendResolution | awk '/Attribute.*:/{print $7}' | awk 'BEGIN{FS="[,.\n]"; RS=""}{$6=$1/($1+$4); $2 $4 $5; print $6" 0 0 0 1 0 0 0 1" }'`
> 
> # Screen 2
> xinput set-prop "Wacom BambooFun 4x5 stylus" --type=float "Coordinate Transformation Matrix" `nvidia-settings -q FrontendResolution | awk '/Attribute.*:/{print $7}' | awk 'BEGIN{FS="[,.\n]"; RS=""}{print $4/($1+$4)" 0 "$1/($1+$4)" 0 1 0 0 0 1" }'`

Luis Gerardo (Jun 29, 2011)
> oooh, i have years trying to do this, thanks a lot

Michael (Aug 05, 2011)
> Thank you for this post!
> 
> I discovered the option "MapToOutput" of xsetwacom.
> First I used the command "xrandr" to get the names of my monitors (when both are plugged).
> Then I use the names in the xsetwacom command like this :
> 
> #! /bin/sh
> xsetwacom set "Wacom Intuos3 9x12 eraser" MapToOutput VGA1
> xsetwacom set "Wacom Intuos3 9x12 stylus" MapToOutput VGA1
> 
> Then I map this script to the ubuntu key, like you explain.

Philip G (Aug 26, 2011)
> Thanks Ben and co, this sorted me out a treat.
> A limitation of the original post is issuing multiple xsetwacom commands so that the eraser can also be mapped.
> 
> My setup = Ubuntu 11.04 6x8 Intuos3 two 1280x1024 displays.
> 
> I created 4 files as follows in the users home directory:-
> wacom-left containing:-
> #!/bin/sh
> xinput set-prop "Wacom Intuos3 6x8 stylus" --type=float "Coordinate Transformation Matrix" 0.5 0 0 0 1 0 0 0 1
> xinput set-prop "Wacom Intuos3 6x8 eraser" --type=float "Coordinate Transformation Matrix" 0.5 0 0 0 1 0 0 0 1
> 
> wacom-right containing:-
> #!/bin/sh
> xinput set-prop "Wacom Intuos3 6x8 stylus" --type=float "Coordinate Transformation Matrix" 0.5 0 0.5 0 1 0 0 0 1
> xinput set-prop "Wacom Intuos3 6x8 eraser" --type=float "Coordinate Transformation Matrix" 0.5 0 0.5 0 1 0 0 0 1
> 
> wacom-both containing:-
> #!/bin/sh
> xinput set-prop "Wacom Intuos3 6x8 stylus" --type=float "Coordinate Transformation Matrix" 1 0 0 0 1 0 0 0 1
> xinput set-prop "Wacom Intuos3 6x8 eraser" --type=float "Coordinate Transformation Matrix" 1 0 0 0 1 0 0 0 1
> 
> I then added the left, both, and right to Shifts of: Print Scr, Scroll Lock, and Pause like in the original post.
> 
> N.B. I needed to put in the full path of the command so if user was fred then for command I had to put in:-
> /home/fred/wacom-left
> 
> To auto associate these keyboard shortcuts with wacom pad buttons as in original post I created another file in the users home dir:-
> wacom-buttons containing:-
> #!/bin/sh
> xsetwacom --set "Wacom Intuos3 6x8 pad" Button 1 "key Shift Pause"
> xsetwacom --set "Wacom Intuos3 6x8 pad" Button 3 "key Shift Print"
> xsetwacom --set "Wacom Intuos3 6x8 pad" Button 2 "key Shift Scroll_Lock"
> 
> I then made all the wacom command files executable:-
> chmod u+x ~/wacom-*
> 
> Finally added in startup applications wacom-buttons, again taking care to put in the whole path for the wacom-buttons file or use the browse button; ~ didn't work for me.
> 
> Thanks again everyone, very helpful.
> 
> @Steven
> This looked like a great and clever fix but alas for me using twinview nvidia-settings -q FrontendResolution returns no info.
> 
> @Michael
> re the great option of MapToOutput was not available to me, see:-
> http://ubuntuforums.org/showthread.php?t=1656089
> Only in recent git of xf86-input-wacom is this working for proprietary nvidia drivers.

ian (Dec 04, 2011)
> THANK YOU!!!!

Rob (Apr 03, 2013)
> Thanks a lot!

Ben in Seattle (Jun 15, 2015)
> <pre><code>
> xinput --list --name-only | egrep -i 'wacom|tablet' \
>     | while read dev;
>       do
> 	  id=$(xinput --list --id-only "$dev")
> 
> 	  if [[ "$output" != "desktop" ]]; then
> 	      echo xinput --map-to-output $id $output
> 	      xinput --map-to-output $id $output
> 	  else
> 	      # Xsetwacom allows map-to-output desktop, but xinput does not.
> 	      # So, for now, we will do an ugly workaround. :P
> 	      prop=$(xinput --list-props $id \
> 			    | grep -o "Coordinate Transformation Matrix.*:" \
> 			    | egrep -o '[[:digit:]]*')
> 	      [ "$prop" ] &amp;&amp; xinput --set-prop $id $prop  0 0 0  0 0 0  0 0 0
> 	  fi
>       done
> </code></pre>

christopher barry (Dec 08, 2014)
> here's what I wrote for the Huion tablet, and it should work similarly for any tablet.
> http://pastebin.com/QE8NCkP0
> you just edit the script with the names of your adapter ports, and put in the tablet name. I wrote it for my 3 monitor setup.

Ben in Seattle (Jun 15, 2015)
> Nice script, Christopher Barry. I made a similar one that I find a little bit easier to use. It's a little simpler and there is no need to modify the script to get it to work with your particular tablet or screens. When run with no arguments, it resets your tablet to cover all desktops. 
> 
> [On the other hand, my script doesn't have clever functions like your evar which evaluates the contents of a variable as another variable name.]
> 
> <pre><code>
> #!/bin/bash
> # BW 2015
> 
> # mapwacom: Given an xrandr output screen name, e.g., "DVI-I-1",
> # restrict any wacom tablets (or any other device with the word
> # "tablet" in its name) to that one screen. If no output screen is
> # given, all tablets will be reset to the default, covering all
> # screens on the desktop.
> 
> # Output names can be specified in lowercase and truncated.
> 
> # Examples:
> 
> #   $ mapwacom foo
> #     Error: foo not valid. Please pick a connected output instead.
> #     DVI-I-1 connected
> #     HDMI-1 disconnected
> #     VGA-1 connected
> 
> #   $ mapwacom VGA-1
> #     xinput --map-to-output 13 VGA-1
> #     xinput --map-to-output 14 VGA-1
> #     xinput --map-to-output 15 VGA-1
> 
> #   $ mapwacom vga (same as above)
> 
> #   $ mapwacom v   (also same as above)
> 
> #   $ mapwacom d
> #     xinput --map-to-output 13 DVI-I-1
> #     xinput --map-to-output 14 DVI-I-1
> #     xinput --map-to-output 15 DVI-I-1
> 
> #   $ mapwacom
> #     Resetting all Wacom devices to cover entire desktop
> 
> 
> 
> showoutputs ()
> {
>     echo "Error: $output not valid. Please pick a connected output instead."
>     xrandr | grep -o '^.*connected'
>     exit 1
> }
> 
> 
> if [ -z "$1" ]; then
>     echo "Resetting all Wacom devices to cover entire desktop"
>     output="desktop"
> else
>     output="$1"
>     connected=$(xrandr | grep -i -- "^$output.* connected") || showoutputs
>     set $connected
>     output="$1"
> fi
> </code></pre>

Shubol (Jun 26, 2016)
> Great, it works fine for me. But How I can save this settings? This do not work after restart.
