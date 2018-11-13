---
layout: post
category: "Software"
date: 2018-10-02T00:00:00Z
tags:
    - contract
    - testing
    - containers
    - docker
    - microservices
draft: true
title: Containerized contract tests
excerpt: "Consumer driven contracts are becoming more important in micro service architectures, however their adoption is not rising. One reason for this is a high barrier in form of technical and cultural complexity of the process. Here is how containerization can help with this."
cover:
    image: freestocks-org-487543-unsplash.jpg
    text: "Photo by freestocks.org on Unsplash"
---

# Contract what now?

In the space of distributed applications, one module often depends on a number of other modules. This is especially true in modern SOA architectures, like the micro-services architecture, where the graph visualizing these relationships can be quite complex. Often those modules will be under active development, potentially by different teams, which presents a 'moving target' kind of complexity.

In these cases it is necessary to establish a mechnism allowing coordination of changes to modules. In small organizations with the total number of components being small, keeping healthy, frequent communication between teams can be sufficient. Bigger organizations, with higher number of services however, need to resort to more robust practices. One of them is a technique called **Consumer-Driven Contracts**. The explanation of this technique is covered [elsewhere](https://martinfowler.com/articles/consumerDrivenContracts.html) and is not the subject of this post. To understand the ideas outlined here however, I highly recommend familiarizing with the concept beforehand.

