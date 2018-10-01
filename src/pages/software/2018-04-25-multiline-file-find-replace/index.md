---
layout: post
category: "Software"
date: 2018-04-25
tags:
- linux
- regex
title: Multi-line file find and replace
excerpt: "How many times did you google how to do this? Look no more :) Leaving this here as much for anyone as for future self :)"
---

Working with source files, you might occasionally find yourself needing to perform a good, old find-and-replace on all the files in your source code. If you're like me, you're likely too lazy to do it manually on each file. Often, the IDE you're working in will have this feature built-in, however, sometimes the feature is limited to a single line match, which doesn't always cut it. Additionally, if you're like me, each time you actually figure out how to do it, you forget almost the next day. Was it sed or awk that I used?

This short post is meant for those of you in need of a simple working command-line solution (and my future self).

In this example, I have multiple `*.md` files in the `src/` folder, which have an unwanted line lookin like this:

```
path: /2014/12/21/debugging-gradle-source-code-in-intellij/
```

The common part is the `path:` and the objective is to remove this line altogether from all the files. It can be achieved by the following command:

```bash
find src -name "*.md" -exec perl -i -pe 's/^path:.*\n//' {} \;
```

Let's unpack the above command:

`find src/ -name "*.md"` - find all the `*.md` files in the `src/` folder\
`-exec` - for each file, execute the following command\
`perl` - Perl command line interpreter\
`-i ''` - replace files in place, skip the back-up file\
`-pe` - makes perl execute the regex against each line in given file\
`'s/^path:.*\n//'` - the actual regex - removes lines starting with `path:`

Happy replacing!