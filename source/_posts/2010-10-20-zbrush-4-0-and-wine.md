---
title: ZBrush 4.0 and Wine
date: '2010-10-20'
tags:
- linux
- software
- ubuntu
- wine
- zbrush
- zbrush 4.0
author: Ben Simonds
markdown:
  gfm: false
alias: blog/posts/2010-10-20-zbrush-4-0-and-wine

---

None




# Comments


dirtyhugg (May 21, 2011)
> Well I do need help!
> 
> I have a different problem..
> 
> When I open Zbrush at first I got the same error but the problem is that I can't use It couse a erro Window appears:
> 
> WIN TAB SERVICES NOT AVALIABLE
> 
> I close It but It appears again
> 
> 
> some idea?

horoto (Jan 21, 2011)
> Same problem I have when i got in Win XP sp1.Its look likes if you run Zbrush in win xP sp1 then you must install to xp sp2. and the problem dissappear. I think is the windows explorer in Sp2 has an Upgrade version..
> So, in your case..
> You must have the latest wine...

Loolarge (Oct 21, 2010)
> This is great to hear, i was thinking of buying and running zbrush under wine too. I hope you won't find any more bugs then!

iKlsR (Oct 21, 2010)
> great... you must be relieved... the only success i have had with wine is a windows based game...

drumel (Jul 09, 2011)
> Hi guys,
> for the WIN TAB problem, you can solve it by adding :
> 
> WINEDLLOVERRIDES="wintab32=n"
> 
> between "env" and "WINEPREFIX..." in your command line ;)

Larry (Jun 01, 2011)
> WinTab error is a royal pain. Basically the emulator believes that there is a tablet plugged in (even if there isn't), but hangs because the lack of a driver. Unfortunately it freezes the application. Current advice is to unplug all peripheries in case wine is reading one of them as a tablet and try again. If that doesn't work then in windows it would be go to device manager and delete the phantom tablet device from there. Sadly, that's not an option in wine. Even windows users have this problem, although it seems to be a rare one. Although in extreme cases a reinstall of windows needs to be done. I have had the message where I have been able to just turn it off and continue, but I have also had it when it has frozen the app. Am going for another install as I would rather eat a kangaroos **** than throw my laptop back into the quagmire called windows.

Ben Simonds (May 21, 2011)
> Hmm, I've not had that problem myself. Win Tab Services  sounds like tablet input for wine or something, but I'm not sure. Maybe try and make sure your tablet is all set up and working first. Also do report it to the wineHQ bug tracker, as it may be something they can fix.

Ben Simonds (Sep 29, 2011)
> I had that problem, too. I had installed originally on wine 1.2, but upgraded to wine 1.3 for something else and zb stopped working so I switched back to 1.2. Though I've now upgraded to 1.3 again and did a fresh install and I'm having no problems.

Brett McCoy (Sep 26, 2011)
> Hey I wanted to let you know that ZBrush 4R2 mostly works under Wine also, although there are a few oddities, like dialog boxes seem to pop under the main window and lock up the display until you press escape. Other than that. so far, it's pretty much as you describe here.

Ben Simonds (Sep 26, 2011)
> Yes I had the same experience too. The things with the dialogue box only happened the once to me though, hasn't been a problem since. Just got to make sure zbrush isn't taking up your whole screen I think.

Brett McCoy (Sep 26, 2011)
> Oh I should mention I am using Wine 1.2.3. I tried Wine 1.3 and ZBrush never fully loaded and I had to "Force Quit" the application.

Francisco Nqatsi (May 10, 2012)
> Hey guys, just for the record I installed ZBrush 4R2 on Ubuntu 12.04 using wine 1.4, and I didn't experienced none of the problems listed here! It only take some time to load, but besides that, everything works like a charm! Maybe it got easier to run this application under Wine!

Ben Simonds (Feb 21, 2014)
> I'm afraid I'm not too up to date with the issue any more - I'm not currently running a Linux system. I suggest you try looking over at WineHQ.

Juan Carlos (Feb 20, 2014)
> Hi Drumel, 
> I have the win tab problem runing zbrush 4r4 in Ubuntu 13.10,  you can splein better how can I do wat you say hear. I don,t no were is the command line.
> Thanks before hand.
> Sorry for my ingles, I am from Spain
> Juan Carlos
