---
layout: post
category: "Software"
date: 2016-01-08T00:00:00Z
tags:
- wget
- offline
title: Saving websites for offline use with wget
path: /2016/01/08/saving-websites-for-offline-use/
---

Welcome back in 2016! :) While doing some traveling around Christmas and New Year's, you might often find yourself in need of some web content, that's not available in downloadable format. After doing some research and only finding a couple archaic tools from the 90's, I came across a much preferable alternative. Here's a short post to kick off the year on how to do it with **wget**.

As the manual describes it, wget is a *non-interactive network downloader*. Often times we use it to download individual files, but wget also offers a recursive mode, which makes it follow link in the HTML document.

In my case, I was working on a pet project for my Garmin watch and wanted the Garmin Connect IQ SDK available to me on a transatlantic flight, in case wifi doesn't work. This could easily be accomplished with this:

```bash
wget -r http://developer.garmin.com/downloads/connect-iq/monkey-c/doc/index.html
```

The default depth of the recursion is 5, so in some cases you might want to bump it down with **-l**, to prevent a chain-reaction-like download.

See *man wget* for more detail.
