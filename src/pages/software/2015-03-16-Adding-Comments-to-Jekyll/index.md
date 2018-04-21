---
layout: post
category: "Software"
date: 2015-03-16T00:00:00Z
tags:
- jekyll
- blog
- disqus
title: Adding comments capability to your Jekyll blog with Disqus
url: /2015/03/16/Adding-Comments-to-Jekyll/
---

Adding comments to your Jekyll blog is very easy with Disqus support. There are 3 simple
steps:

# Register your page on Disqus
Go to [Disqus](https://disqus.com/admin/create/) and follow the registration steps

# Embed in your site
Copy the [universal code](https://disqus.com/admin/universalcode/) and paste it in **_layouts/posts.html** where you want the comments section to show

Fill out the two variables in the script ```url``` and ```identifier```

**url** - your canonical website URL:

{{< highlight javascript >}} this.page.url = '{{ site.url }}{{ page.url }}'; {{< / highlight >}}

**identifier** - use the title of the page:

{{< highlight javascript >}}this.page.identifier = '{{ page.title }}';{{< / highlight >}}

# *Optional* Making comments optional

* Surround the Disqus script with
{{< highlight liquid >}}{% if page.comments %}{{< / highlight >}}
and
{{< highlight liquid >}}{% endif %}{{< / highlight >}}

* Create a default property in **_config.yml**:
{{< highlight text >}}
defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      comments: true
{{< / highlight >}}

This will enable comments on your posts by default. If you wish to disable comments for a particular post
just add ```comments: false``` in the [Front Matter](http://jekyllrb.com/docs/frontmatter/)


Done.
