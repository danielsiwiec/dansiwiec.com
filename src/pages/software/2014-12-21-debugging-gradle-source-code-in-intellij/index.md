---
layout: post
category: "Software"
date: 2014-12-21T00:00:00Z
tags:
- gradle
- intellij
- debugging
title: Debugging Gradle source code in IntelliJ
path: /2014/12/21/debugging-gradle-source-code-in-intellij/
---

If you find yourself needing to debug Gradle source code, here's a few simple steps you need to follow. There are some great posts online that explain how to attach a remote debugger, like [this one](http://blog.gaku.net/gradle-debugging/).

In this post I show an alternative solution which runs Gradle inside the IDE.

* Clone Gradle repository:
```bash
git clone git@github.com:gradle/gradle.git
```

* Checkout a specific release:
```bash
git tag -l
git checkout tags/REL_2.2.1
```

* Generate IntelliJ files:
```bash
cd gradle
./gradlew idea
```

* Import Gradle project into IntelliJ:

![import](import.png)

* Edit **Gradle** Run Configuration to point to the project you want to run gradle on:

![config](config.png)

The **-b** option allows you to pass a path to the build.gradle

* Set your breakpoints

* Hit Debug and wait for your breakpoint:

![debug](debug.png)