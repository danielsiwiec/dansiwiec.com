---
layout: post
category: "Software"
date: 2016-05-05T00:00:00Z
tags:
- ci
- concourse
title: Setting up a simple pipeline with Concourse CI (redux)
path: /2016/05/05/setting-up-a-simple-pipeline-with-concourse-ci-redux/
---

*This is a refresh of [this](/2015/12/17/setting-up-a-simple-pipeline-with-concourse-ci/) earlier post, now edited for Concourse **v1.2.0** *

# Intro
In this post I'll introduce you to Concourse CI and walk you through a configuration of a simple pipeline. We'll setup concourse from scratch and create a basic pipeline for running unit tests.

# What is it?
[Concourse CI](http://concourse.ci) is a relatively new CI offering. The product's homepage does a good job of [explaining](http://concourse.ci/concourse-vs.html) the key features differentiating it from a plethora of other CI solutions, but here's my short list, which attracted my attention:

### Pipeline as Code™
No more pointy-clicky setups anymore. No more issues with versioning the CI configurations. Instead of developing tools to extract the CI configuration into a file that can later be imported or versioned, Concourse takes a completely opposite approach - it generates the pipeline from the configuration files in the first place. I call this approach Pipeline As Code™ and I've always been its avid supporter. It's great to see it being enforced by the platform. One great benefit that stems from it is a stateless nature of the CI server.
This item has also been [recently listed](https://www.thoughtworks.com/radar/techniques/programming-in-your-ci-cd-tool) on the ThoughtWorks technology radar.

### Phoenix build agents
No more snowflake build agents. No more debugging issues caused by dependencies cached by previous builds. More on phoenix servers [here](http://martinfowler.com/bliki/PhoenixServer.html)


### CLI and API first, UI later
We, developers, love APIs. They allow for task automation and controlling things directly from the terminal, without touching the mouse :)
The north star guiding the Concourse development team is to provide complete functionality via the CLI. Big shout out for this approach!

### Personal builds made easy
A relatively new concept, personal builds, allow you to run an instance of the pipeline without committing the code to the central repository. This avoids classic push-fail-push-fail-push-pass scenarios caused by discrepancies between dev's local environment and the CI. I'll show how Concourse supports this method later on.

# Getting started

## Prerequisites

- git
- vagrant & virtualbox
- 4GB of RAM to spend

## Let's go

First, clone my demo repo [here](https://github.com/danielsiwiec/concourse-demo) and do
{{< highlight bash >}}
  vagrant up
{{< / highlight >}}
You know you're on the right path, when you see this at [http://192.168.100.4:8080/](http://192.168.100.4:8080/)

![no-pipelines](/img/blog/concourse-simple-redux/no-pipelines.png)


Second, download the CLI tool, **fly** via the link on the screen above, make it executable (```chmod +x fly```) and put it in a place that's on the PATH (e.g. ```/usr/bin/```)

Before you're ready to use the CLI with your concourse CI instance, you need to log in
{{< highlight bash >}}
fly -t lite login -c http://192.168.100.4:8080
{{< / highlight >}}

From now on, we're *logged* into our instance and all the future requests will need reference this *session* with **-t lite**.

Now, let's configure the pipeline. Yes, over the CLI - no pointy-clicky operations!
{{< highlight bash >}}
  fly set-pipeline -c pipeline/pipeline.yml -p demo -t lite
{{< / highlight >}}

If everything goes right, you'll see this on the main page:
![pipelines](/img/blog/concourse-simple-redux/pipeline.png)
The UI is very basic, but it's all a man could ever wish for. It does what it should - shows your pipeline's status.

Let's switch over to the terminal and see what else **fly** can do for us:

{{< highlight bash >}}
fly pipelines -t lite

  name  paused
  demo  yes
{{< / highlight >}}

That's pretty self explanatory. What else?

{{< highlight bash >}}
fly get-pipeline --pipeline demo -t lite

  groups: []
  resources:
  - name: sources
  type: git
  source:
    branch: master
    uri: https://github.com/danielsiwiec/concourse-demo.git
  jobs:
  - name: test
  plan:
  - get: sources
    trigger: true
  - task: install
    file: sources/pipeline/install.yml
  - task: test
    file: sources/pipeline/test.yml
{{< / highlight >}}

The pipeline starts in a paused state, so let's turn it on:

{{< highlight bash >}}
fly unpause-pipeline -p demo -t lite

  unpaused 'demo'
{{< / highlight >}}

In a few seconds your screen should change to this, which indicates the pipeline is running:
![running](/img/blog/concourse-simple-redux/pipeline-running.png)

Additionally, there are two **fly** commands that allow us to peak into task's execution:

**watch** displays a log stream for the selected, currently running build:

{{< highlight bash >}}
fly watch -j demo/test -t lite
  Cloning into '/tmp/build/get'...
  7341378 fix install input
  initializing with docker:///node#4.2.3
  running ./pipeline/install.sh
  npm info it worked if it ends with ok
  npm info using npm@2.14.7
  npm info using node@v4.2.3
  ...
  ...
{{< / highlight >}}

**intercept** allows to ssh into a container of a recently finished task and inspect its contents:

{{< highlight bash >}}
fly intercept -j demo/test -s test -t lite
  root@iugmregi666:/tmp/build/a94a8fe5# ls -la
  total 8
  drwxr-xr-x 4 root root 4096 May  6 04:30 .
  drwxr-xr-x 3 root root 4096 May  6 04:30 ..
  drwxr-xr-x 1 root root  128 May  6 04:30 sources
  drwxr-xr-x 1 root root   20 May  6 04:30 test-report
{{< / highlight >}}

# Notes

## Passing artifacts

Currently (v1.2.0) defining inputs and outputs is a little bizarre, especially if the output you want to pass downstream is not neatly packaged in a single build folder, as is the case in the **npm** ecosystem. Namely, after running ```npm install```, besides your source, test and other folders, you end up with a **node_modules** folder which holds your external dependencies.
Concurse CI doesn't currently support this case out of the box, so here's two suggestions you can follow.

1. Cherry picking
At the end of your task, stash all your bits in a separate output folder, which you then expose through the **outputs** property of your task. For example, if your first task performs *npm install* and your next one runs the tests, move node_modules, your source and test folders, package.json and anything else you need into an output folder, which you reference in the **outputs** of your task's definition and the **inputs** of the next task.

***Pros:*** A flexible approach, that allows you to split your pipeline in tasks of any granularity

***Cons:*** Now you have a list of *things* you cherry-pick to maintain

2. Fatter tasks
The alternative to the above approach is to decrease the granularity of your tasks. Let me explain using the npm example. Most of the frontend npm projects will roughly follow the same pattern: npm install, npm test, npm package. The last step is when you minify and concatenate all your .js files plus external dependencies into one *ugly* bundle.js, that gets deployed. Instead of splitting those steps across multiple tasks, you can do all of them in one, until there's a single, clean artifact to pass down.

***Pros:*** Simple implementation

***Cons:*** Tasks are less granular, so if one fails, it's hard to say **what** exactly failed without looking at the log

## Personal builds

As I mentioned before, this is a very handy utility, that concourse, thanks to it's architecture based on inputs and outputs supports really well. To picture it, let's assume that we want to execute the test task, without committing the code to the central repository. It might be helpful especially in debugging scenarios, when our local environment is in some way different from the CI one and yields different results. This is how it's done:

{{< highlight bash >}}
fly execute -c pipeline/test.yml -i sources=. -o test-report=output -t lite
  executing build 22
  initializing with docker:///node#4.2.3
  running ./sources/pipeline/test.sh
  ...
  succeeded
{{< / highlight >}}

The **-i** flag specifies the inputs for the task, as defined in the task yaml (**test.yml** in this case). With **-o** you specify output folders.

Side note: Currently, only running individual tasks is supported. To run a part of the pipeline, you'll have to manually combine the output of one task (using **-o** flag) with the input of the next one.
