---
title: Excluded post
description: This post will not be rendered
date: 2021-05-07
---

You should not see this post when using the plugin [mkdocs-exclude](https://github.com/apenwarr/mkdocs-exclude), with the below configuration:

``` yaml
- exclude:
    glob:
        - '*/exclude/*'
    regex:
        - '.*\[exclude\].*'
```
