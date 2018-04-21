---
layout: post
category: "Software"
date: 2015-03-06T00:00:00Z
links:
- name: github
  path: https://github.com/danielsiwiec/gh-deploy
- name: npmjs
  url: https://www.npmjs.com/package/gh-deploy
tags:
- github
- npm
- node
- coffeescript
title: 'gh-deploy: One-liner GitHub page spin-up'
url: /2015/03/06/generate-Github-Pages/
---

Sometimes, you just need to host a simple, static HTML page on the web. GitHub makes
it much easier, with the introduction of the [GitHub Pages](https://pages.github.com/) service. There's still a couple steps required to get started with GitHub pages.
Introducing **gh-deploy**. This module leverages this service and automates the whole setup.


# Prerequisites

* github account
* npm


# Steps

* Install the gh-deploy module
{{< highlight bash >}}
npm install -g gh-deploy
{{< / highlight >}}
* Run it

![Run it](runit.png)

* Follow the wizard steps

![Wizard](wizard.png)

* Wait for the page to be created

![Finish](finish.png)

# Results

* The page deployed and accessible

![Hello world](hello.png)

* GitHub repo created with a stub index file:

![Wizard](github.png)

# Demos

Checkout the demos on YouTube:

Part I - Hello World (19 seconds)</a> (a little outdated - there are no input arguments anymore - the wizard asks about them)

<iframe width="420" height="315" src="https://www.youtube.com/embed/vJlg-0y2fTY" frameborder="0" allowfullscreen></iframe>

Part II - Deploy Todo MVC (36 seconds)

<iframe width="420" height="315" src="https://www.youtube.com/embed/5stwAqtgWTg" frameborder="0" allowfullscreen></iframe>
