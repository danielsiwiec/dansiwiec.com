---
layout: post
category: "Software"
date: 2014-12-22T00:00:00Z
tags:
- cucmber
- maven
- gradle
title: cucumber.options with gradle
url: /2014/12/22/cucumberoptions-with-gradle/
---

So, to make Gradle work like the maven:

{{< highlight bash >}}mvn test -Dcucumber.options="..."{{< / highlight >}}

you have to do some extra magic. When Gradle forks a new process dedicated for tests it doesn't automatically forward the original system properties. In order to achieve this, the following needs to be added:

{{< highlight groovy >}}
test {systemProperties = System.properties}
{{< / highlight >}}

Now you can use just do:

{{< highlight bash >}}
gradle -Dcucumber.options="..." test
{{< / highlight >}}

and the options will be applied properly.

If you have multiple test tasks, you can also do it in one stab:

{{< highlight groovy >}}
tasks.withType(Test) {systemProperties = System.properties}
{{< / highlight >}}

For a full working example check out my [fork](https://github.com/danielsiwiec/cucumber-java-skeleton) of cucumber-java-skeleton, adding gradle support.
