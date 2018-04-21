---
layout: post
category: "Software"
date: 2015-12-02T00:00:00Z
tags:
- ci
- snap-ci
title: Setting up a second pipeline in snap ci
url: /2015/12/02/second-pipeline-in-snap-ci/
---

# Problem statement

[Snap CI](http://snap-ci.com) is a simple, hosted CI server. It's power mostly lies in its simplicity, as basic pipeline setup takes no more than 10 minutes. You log into snap with your GitHub account and instantly create a pipeline by selecting one of your GitHub repositories.

Simple pipelines in snap are sufficient for small projects, but as you scale up, your needs grow as well. One example is setting up an alternative pipeline. It might either be a scheduled job to run extensive UI tests or a nightly [canary build](https://www.thoughtworks.com/radar/techniques/canary-builds).

This is where you hit snap's limits. Usually, a need like this might be an early indication that your project outgrows snap's simple model and you'll want to switch over to a more robust platform like GoCD or Concourse, but there is a way to squeeze out more juice out of snap in this particular case.

# Walkthrough

This short tutorial will demonstrate how to set up a second pipeline on snap ci using a simple hack.

## Create an empty remote branch

First, we create a new, empty branch. Don't worry, you will not need to synchronize it with master. It just unlocks some snap features.

{{< highlight bash >}}
# create an orphan branch with a single dummy file
git checkout --orphan empty
rm -rf *
touch .dummy
git add .
git commit -m "Add some file to make the branch"
# push the new 'empty' branch to the origin
git push origin empty
{{< / highlight >}}

## Create a pipeline for that branch

A second branch allows you to set up a new pipeline for it in snap.

On your project page go to Configuration -> Clones and fill out the form as follows:

![Clone project](/img/blog/second-snap/clone.png)

Of course you don't want to synchronize this branch with master just so that you can have another pipelinem, so here's where we apply some hackery.

## Make the new pipeline run off master

You can modify the new pipeline, but by default it will be a clone of the original one. To make it run off the master branch, as the first step in the stage script we checkout the master branch:

![Checkout master](/img/blog/second-snap/master.png)

Now, you're free to edit this pipeline to whatever you want, without affecting the original master pipeline.

Happy building!
