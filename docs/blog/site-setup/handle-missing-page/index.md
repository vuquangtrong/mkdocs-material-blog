---
title: Hanlde Page Not Found (404) error
description: When user requests to a non-existing page, 404 error will be returned. We can reponse to users a customized page to notify about the error, and we also can show some search result of what they are looking for.
date: 2021-05-03
banner: 404.png
tags:
    - javascript
---



## The 404 page

Whenever a page is not found in a website, the error `404` is return to the requested users. I need to create this special page to display a short message and guide user to search in this blog.

The [404 page](/404) should be created in the `overrides` folder as it will replace the default 404 pages of Material theme.

[TRY THIS 404 Page](/404){.md-button}
{style="text-align:center"}

#### Layout and content

Its layout is based on the `main.html`, and the content is a message displayed in the center of the page. The `disqus` comment section is removed. The sidebar should not be visible to display message clearly.

#### Search suggestion

I assume that the path of URL contains keywords of what users are looking for. Therefore, after getting the requested URL from `window.location.pathname`, I will try to open a search form filled with those keywords.

JavaScript is helpful here. The sequence of handling is as below:

1. Show 404 message and wait for 5 seconds
2. Open search form
   1. Get URL path name, and spit it into keywords
   2. For each keyword, fill it into input form
   3. Fire events (value changed, element focused) to trigger search engine

!!! info "Delay using Asynchronous function"

    Looking up result may take some time to return, therefore, [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is used to wait for the data.

#### Source code

``` html title="overrides\404.html"
---8<--- "overrides\404.html"
```

