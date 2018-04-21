---
layout: post
category: "Software"
date: 2016-04-01T00:00:00Z
links:
- name: github
  path: https://github.com/danielsiwiec/taggingTests
tags:
- testing
- javascript
- mocha
- jasmine
- protractor
- karma
title: Tagging tests in JavaScript
url: /2016/04/01/tagging-tests-in-JavaScript/
---

In this post I'll showcase test tagging techniques for a few major JavaScript test frameworks and I'll give some examples for why and when this approach is useful.

This approach is different from narrowing the execution to a single test case or suite using functions like **fit**, **iit** or **it.onyl** or their **describe** counterparts, in that it doesn't require code change and can be applied in runtime, depending on the use case.

# What is a tag?

Tag is a special marker on the test that adds a it to a virtual group. In javascript frameworks it is achieved via some keyword, which can later by used in a regular expression match by the test framework. Here's an example:

{{< highlight javascript >}}
it('should travel back in time #back', () => {
  expect(travelBack({now: 2016}, 16)).toEqual({now: 2000})
})
{{< / highlight >}}

The **#back** plays the role of the tag.

# Why tag?

There's a couple of reasons you might want to tag your tests. First one is **pre-commit** tests. In this case, you tag a representative group of tests with a tag like #precommit. Before code commit, you then run only the tagged tests. This approach is especially useful for long running UI tests, rather than unit tests, which usually execute fast enough not to filter them.

A variation of this approach can be used in the CI pipeline, in case the project has a very high number of long UI tests, maybe due to testing browsers compatibility. The team may then decide to run the whole, extensive set of tests on a nightly basis and restrict the regular pipeline to a smaller set.

The second use case for tagging is to scope tests to a particular application area, like #login or #checkout. This is useful for target regression testing, prior to committing code.

The third application for tagging is non-invasive smoke testing. Tagging a group of tests with #noninvasive allows for a safe post-deployment smoke test, even in a production environment.

# Tagging mechanisms

Below I present tag implementation for a couple popular test frameworks. For complete working examples, see [this repo](https://github.com/danielsiwiec/taggingTests).

## Jasmine
Jasmine has a concept of a *specFilter*. By default, it is switched off, but if the **filter** parameter is passed, jasmine will perform a regular expression test (*RegExp.test*) to select the test cases to run.

Here's an example:

{{< highlight javascript >}}
it('should travel forward #future', () => {
  expect(travelForward({now: 2016}, 15)).toEqual({now: 2031})
})

it('should travel back in time', () => {
  expect(travelBack({now: 2016}, 16)).toEqual({now: 2000})
})
{{< / highlight >}}

With tests defined this way, we can now pass the filter parameter as follows:

{{< highlight bash >}}
jasmine --filter=#future
{{< / highlight >}}

This will only run the test cases containing the **#future** tag.

### karma-jasmine

Typically, you would run your tests with a karma runner, which abstracts the framework underneath. Karma exposes framework specific options through **client.args** property. Jasmin's specFilter functionality is available as grep flag. Here's what it looks like in the **karma.config.js**:

{{< highlight javascript >}}
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    client: {
      args: ['--grep', '#future']
    }
  })
}
{{< / highlight >}}

If you want to change the filter on per-run basis (e.g. by suites - pre-commit, integration, end-to-end), then the above solution will not satisfy you. Luckily, karma allows you to set properties on the **config** variable via command-line arguments as follows:

{{< highlight bash >}}
karma start --grep '#future'
{{< / highlight >}}

Which can than be used in karma.conf.js:
{{< highlight javascript >}}
client: {
  args: ['--grep', config.grep]
}
{{< / highlight >}}

## protractor

Using tags with protractor is very simple. There are two options, which are equivalent. You can either pass the filter via CLI arguments:

{{< highlight bash >}}
protractor --grep='#integration'
{{< / highlight >}}

or in **protractor.conf.js**:

{{< highlight javascript >}}
exports.config = {
  ...,
  jasmineNodeOpts: {
    grep: '#integartion'
  }
};
{{< / highlight >}}

## mocha

Tagging tests in mocha is the simplest of all outlined scenarios here. Simply do:

{{< highlight bash >}}
mocha --grep '#integration'
{{< / highlight >}}

### karma-mocha

Applying tags mocha tags with a Karma runner is analogous to the karma-jasmine setup:

{{< highlight javascript >}}
client: {
  mocha: {
    grep: config.grep
  }
}
{{< / highlight >}}

and the execution is identical:

{{< highlight bash >}}
karma start --grep '#future'
{{< / highlight >}}
