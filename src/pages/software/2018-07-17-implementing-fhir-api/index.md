---
layout: post
category: "Software"
date: 2018-07-17
tags:
- java
- healthcare
- fhir
- api
- rest
title: Implementing a FHIR healthcare API
excerpt: "After decades of complex and unstable healthcare standards for data exchange, there's finally a break in the clouds. Learn about my experiences from implementing FHIR - a new HL7 standard and challenges I've encountered"
---

I've spent the last 10 months working with a major healthcare company in the US, helping rewrite their API platform, to conform with a new healthcare standard - FHIR. Here's some of the observations I've made over the course of this time, regarding this standard and it's implementation.

# What's fhir?
FHIR stands for *Fast Healthcare Interoperability Resources*. It is a data exchange standard developed by [HL7](https://www.hl7.org/) - an international organization founded in 1987, dedicated to developing standards for electronic health information sharing.

If you ever worked in the healthcare space, chances are high you've heard about HL7 before. Maybe you've experienced or have heard how difficult to work with those standards are. The most common complaints were about the proprietary TCP based message protocol or inconsistencies in the way the standard was interpreted and implemented, which inhibited smooth data exchange and required additional translation layers.

FHIR was born in response to those problems, at the same time leveraging decades of learning in the field.

# Scope of the standard
FHIR defines models representing the healthcare domain, relationships between them, along with actions that can be performed on them. This includes basic resources like Patient, Practitioner, Healthcare Service linking to real-world concepts, as well as more advanced 'abstract' resources for diagnostics (Observation, Report) or workflows (Schedule, Appointment, Task).

The standard doesn't mandate HTTP as the protocol, however you can tell it's mostly geared towards it, with each model being a separate REST resource and actions mapped to HTTP verbs. Anyone who's worked with REST in the past will find themselves right at home - for example reading Practitioner with id 1520023 is a `GET /Practitioner/1520023`.

# REST compliance
Assessing the standard by the [REST maturity model](https://martinfowler.com/articles/richardsonMaturityModel.html) defined by Leonard Richardson, it comes in at a strong level 2 (usage of verbs), with hypermedia links finding their place in FHIR, however more in an auxillary form, rather than a true driver for API navigation, HATEOAS style.

The standard is quite prescriptive in it's take on REST APIs, with a [dedicated page](https://www.hl7.org/fhir/http.html) outlining implementation details. The list includes the following concepts:
- resource paths
- usage of HTTP verbs
- HTTP status codes
- search query parameters
- partial updates / patches
- paging
- batch operations
- error format

In my view this is a very good thing - making the standard strict in these areas allows for an abundance of tooling (more on this later) in the Open Source world, transferability of skills and knowledge sharing in the community.

# Tooling

Thanks to a solid standard, there's multiple open source tools available for both implementers and consumers.

## Implementation tools
Here's a couple of tools I found helpful:

### Hapi Fhir (http://hapifhir.io/)
This project provides both - libraries with FHIR data structures, as well as a reference implementation of a FHIR-compliant server.

### Public test FHIR servers
[Here's](http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing) a list of publicly available test FHIR servers. Some of [them](http://fhirtest.uhn.ca/) have a UI, which allows to construct requests in a user-friendly fashion.

## Consumer tools

Hapi (listed in the implementers section) also provides a Java Fhir client - a utility that will make integration with a Fhir server a whiz. There's a client for [JavaScript](https://github.com/FHIR/fhir.js), however due to a loosely typed nature of the language, I didn't find it that useful. There's also one for [C#](https://www.nuget.org/packages/Hl7.Fhir) one.

# Challenges
For a big, established organization (as my client was), adopting a massive standard like FHIR, which covers a very wide scope, the problem often lies in matching your existing domain to the standard's concepts. For many years the domain model your organization developed has been evolving on it's own, either in a guided, conscious way, or more often in a free-fall fashion. Whichever it is, even a best thought-out, internal domain model will differ from a standard you're trying to adopt. Those it may be minor semantic differences, like naming mismatches (e.g. Provider vs Practitioner), which are easy to address, more complex, like a lack of 1 to 1 mapping between internal and standard concepts or more serious, like the standard missing some custom, internal concepts, important to the organization.

Does it mean the standard should not be adopted in these cases? The answer is... it depends, however when performing a pain vs gain calculation, it's worth to keep a few things in mind:
- is the standard popular enough for us to benefit from community support, tooling, hiring experts in the job market, etc?
- how different ARE we from the standard?
- how different do we NEED to be from the standard?
- do we have sufficient domain experts to maintain our own domain model?

Weighting the cost of adoption against all future benefits is difficult, but eventually pays off, given a long enough lifetime of a system.

# Industry adoption and future of Fhir
The HL7 organization is comprised of industry experts and big corporate members, which ensures buy-in from the critical mass of the industry. Apple has [recently](https://www.apple.com/newsroom/2018/01/apple-announces-effortless-solution-bringing-health-records-to-iPhone/) brought in FHIR integration into its Health app, which allows patients of participating hospitals seeing their health records. It's likely we will see a similar implementation from Google at one point.
Additionally, there's a [plethora](http://wiki.hl7.org/index.php?title=Organizations_interested_in_FHIR) or organizations expressing interest in some way of jumping on the Fhir train.

There is no doubt whether FHIR will stay relevant. Only question is - When will YOUR organization embrace it?