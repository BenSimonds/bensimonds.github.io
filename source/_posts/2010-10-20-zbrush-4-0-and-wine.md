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
alias: blog/posts/2010-10-20-zbrush-4-0-and-wine

---

![>< ><](/images/old/screenshot-6.png)


I got ZBrush 4.0 today, and as I no longer even bother keeping a windows install on my machine, I was a little worried about how well it would work on my ubuntu 10.10 install using wine. Whilst Wine HQ had [listings](http://appdb.winehq.org/objectManager.php?sClass=version&iId=8023&iTestingId=12117) for zbrush 3.5, I was not able to find details of anyone successfully running zbrush 4.0 on wine.

Undeterred, I made sure I was using an up to date version of wine (1.2.1 stable) and ran the installer. The installer worked perfectly! First step complete.

On running the program however I got the following error message:

![>< ><](/images/old/error.jpg)


However, this did not prevent Zbrush from loading up and has so far not caused any problems - it seems that it can be ignored. Once loaded up, web registration worked fine (though I couldn't copy paste the key, I had to type it manually), but following this I got another error message, and zbrush quit. The error message stated that:

> Unable to open/Create a file C:\PROGRAM FILES\PIXOLOGIC\ZBRUSH 4.0\ZStartup\Tempfiles/search.mem...

Browsing wine's C: drive to the above location I noted that the \Tempfiles folder was missing. However simply creating the directory (no need to worry about search.mem) and re-launching zbrush seemed to fix this, and since then zbrush has been working great (though I still get the first error message on stasrtup). So far I've tested saving and loading, zshpere sketching, sculpting, shadowbox, import and export, quick sketch, and polypainting and I haven't had any trouble. The only other problem I've come across so far is that attempting to minimise zbrush causes it to become unresponsive (though I can still quit normally, and even save the open document, but unfortunately not the current ztool). I find shifting it off to another workspace is enough of a reminder to stop me doing this though, so it's not a major issue.

I'm still going through all the features and testing things out/remembering what all the buttons do (it's been a while since I last used zbrush). I'll update this post if I come across any issues. I've also added my test data to [wineHQ](http://appdb.winehq.org/objectManager.php?sClass=version&iId=21702). Edit: Lightbox does not appear to correctly detect image files or sculpting alphas as far as I can tell, though it will recognise zbrush tools and documents, and matcap materials.




