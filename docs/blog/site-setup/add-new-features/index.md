---
title: Add Tags, Recent Post and new Features to my Blog site
description: Some must-have features in a blog are Tags and List of recent posts. Tags help to list related posts, and Post List shows recently updated activities. This post decribes a method to add these features based on parsed data.
date: 2021-05-04
banner: tag_cloud.jpg
tags:
    - jinja
    - javascript
---



## Tags page

The tag page is the place to list all tags, and list all pages that have a common tag. A new page will be created at `docs\tags\index.md`. There is a method to use [MkDocs Macros](../mkdocs-plugins/#macros) in Markdown template, but it is quite complicated.

!!! info "Visit the [Tags](../../../tags/) page to see the result."

I use Jinja syntax to create the content of the Tags page, therefore, create a new file at `overrides\tags.html` and use it as the template for the Tags page:

``` yaml title="docs\tags\index.md" hl_lines="4"
---8<--- "docs\tags\index.md"
```

The `tags.html` template to include 2 parts:

-   `tag-cloud.html`: make a tag cloud to see how many pages are associated with a tag
-   `tag-list-pages.html`: for each tag, list all pages having that tag to show similar articles together

``` jinja title="overrides\tags.html"
---8<--- "overrides\tags.html"
```

Tags will have random colors, to easily disguise them to each other. A helper `random_color()` macro that returns a random color looks like:

``` jinja title="overrides\partials\random-colors.html"
{%- macro random_color() -%}
{{- ["DarkRed",
"DarkGoldenrod",
"DarkGreen",
"DarkOliveGreen",
"DarkCyan",
"DarkTurquoise",
"DarkBlue",
"DarkMagenta",
"DarkViolet",
"DarkSlateBlue",
"DarkOrchid",
"DarkSlateGray"] | random -}}
{%- endmacro -%}
```

Then it can be imported and used:

``` jinja
{% from "partials/random-colors.html" import random_color %}

<span style="color:{{ random_color() }};">tag</span>
```


### Tag cloud

The tag cloud shows all tags in different size and color. The bigger a tag is, the more pages mention that tag. Steps to make a tag cloud:

1. Scan all pages and create a list of pairs `(tag, pages[])`.

2. Count the number of pages for each tag then show each tag with different text size and color using `font-size` and `color` attributes.

``` jinja title="overrides\partials\tag-cloud.html"
---8<--- "overrides\partials\tag-cloud.html"
```


### Page list

This section is simple as it just needs to loop through the list of pairs `(tag, pages[])` and create a link to each page. Steps to take that:

1. Scan all pages and create a list of pairs `(tag, pages[])`.

2. Show each tag with the list of pages in a collapsible `<details>` block.

3. Only one tag block is open at a time to easily follow the selected tag. To do this, I added a callback of the `toggle` event on all tag blocks. Whenever a block is opened, this script will close all others.

4. A tag block can be opened via URL with hash being the selected tag.

``` jinja title="overrides\partials\tag-page-list.html"
---8<--- "overrides\partials\tag-page-list.html"
``` 



## Main template

The `main.html` file, extending the `base.html` template, will be used for all markdown pages, and it is the starting point to add custom template.

To override it, add the `main.html` file in the `overrides` folder. Here are things I'm going to do to add more content into a blog post:

1. Extract metadata to get `title`, `description`, `tags`, and other information.

2. Add block to use the [Open Graph protocol](https://ogp.me/) to show the page's information when a user shares a page on a social network.

3. Include modified __Navigation__ section to show __Tag cloud__ in either left or right panel.

4. Include modified __Page Content__ which renders the content with additional sections (cover, table of content, main content, comments.).

``` jinja title="overrides\main.html"
---8<--- "overrides\main.html"
```


#### Navigation

The sidebar will display the __tag cloud__ based in the page's table of content.

``` jinja title="overrides\partials\navigation.html"
---8<--- "overrides\partials\navigation.html"
``` 


#### Page content

The page content will be placed in the main block. If there is no content, a list of children posts will be shown.

``` jinja title="overrides\partials\post-content.html"
---8<--- "overrides\partials\post-content.html"
```

When printing to a PDF file, the first page should show the post title and its short description. This page is called the cover page which will be created only in printing mode.

Create an element with class `cover` in the `post-cover.html` template to wrap the cover section. In print mode, this element should cover the full height (100%) of the first paper and align its content vertically. After the line of tags, the updated date will be shown to easily check the latest version of the document:

``` jinja title="overrides\partials\post-cover.html"
---8<--- "overrides\partials\post-cover.html"
```

When displaying on a screen, the Table of Content is displayed in the right sidebar. In printed pages, there should be a page to display the table of content too. This page is also only visible in printing.

The base Material for MkDocs theme has a partial block for Table of Content section, so I just need to declare it in `post-toc.html` and include it in the `main.html` template, between the cover page and the main content.

``` jinja title="overrides\partials\post-toc.html"
---8<--- "overrides\partials\post-toc.html"
```

!!! hint "Jinja object"

    It is easy to display an object in Jinja template as Jinja is based on Python.

    To show all attributes:

    ``` jinja
    {{ page.__dict__}}
    ```

    To show a specific attribute:

    ``` jinja
    {{ page.parent.children }}
    ```



## The recent blog posts

There should be a page showing the recent posts to help users see what is new and updated. With the [Revision Date](../mkdocs-plugins/#revision-date) plugin, it is able to use two new meta-data fields: `git_revision_date_localized`, and `git_creation_date_localized` if the option `enable_creation_date` is `true`.

Create new `index.md` file inside the `blog` folder. When using the [Section Index](../mkdocs-plugins/#section-index) plugin, this index file will be merged to the Blog section, therefore, when user selects the Blog label, there is a list of recent posts will be shown.

``` yaml title="docs\blog\index.md" hl_lines="4"
---8<--- "docs\blog\index.md"
```

This page will use the `blog.html` template in which it scans all posts and check the creation date to make a list of posts. Each post should be displayed in a container and be formatted to show the title, the description (at most 250 character using the `truncate` filter), the creation date, and its tags.

Here is the code to sort all pages in order of creation date, and then filter all blog posts to save into the array `blog_pages` which will be used to generate content.

``` jinja
{% set blog_pages=[] %}

{% for p in pages|sort(     
    attribute='page.meta.git_revision_date_localized',
    reverse=True
    ) 
%}

    {% set pg = p.page %}

    {# do not list homepage, empty pages, hidden pages #}
    {% set hidden = true if (pg.meta and pg.meta.hide and ('in_recent_list' in pg.meta.hide)) %}
    {% if (not pg.is_homepage) and 
            (not pg.markdown == '') and 
                (not hidden)
    %}
        {{ blog_pages.append(pg) or "" }} {# use "" to not add spaces in content #}
    {% endif %}
{% endfor %}
```


### Groups of pages

When the number of posts goes bigger, the recent post list becomes longer. It's time to brake the long list into pages — the user can click on the page number to see its children posts.

This is called "Pagination". How to implement it?

Jinja template has the [`slice` filter](https://jinja.palletsprojects.com/en/3.0.x/templates/#jinja-filters.slice) to divide a list into sub-lists. Here, I'd like to have maximum of 10 posts on each page.

``` html
{# count the number of pages #}
{% set page_num = (blog_pages|count / 10)|round(method='ceil')|int %}

<div id="page_num" data-value="{{page_num}}"></div>

<div class="pages">
    {% for pg_group in blog_pages|slice(page_num) %}
    <div class="page" id="page{{ loop.index }}">
        {% for pg in pg_group %}
            <div class="post">
                ... create post layout and content ...
            </div>
        {% endfor %}
    </div>
{% endfor %}
</div>
```


### Post-entry

Each post is wrapped inside a `#!html <div class="post">` and its elements are marked with different classes, such as `post-title`, `post-description`, etc. for applying styles later.

``` html
<div class="post">
    <h4 class="post-title">
        <a href="{{ pg.canonical_url }}">{{ pg.title }}</a>
    </h4>
    <div class="post-info">
        <div>
            <p class="post-description">
                {% if pg.meta and pg.meta.description %}
                {{ pg.meta.description | truncate(200) }}
                {% endif %}
            </p>
            <div class="post-extra row">
                <div class="col">
                    {% if pg.meta and pg.meta.git_revision_date_localized %}
                    <p class="post-date">
                        <span>
                            {{ pg.meta.git_revision_date_localized }}
                        </span>
                    </p>
                    {% endif %}
                </div>
                <div class="col">
                    {% if pg.meta and pg.meta.tags %}
                    <p class="post-tags">
                        {% for tag in pg.meta.tags %}
                        <a class="tag" href="{{ config.site_url }}tags/#{{tag}}">
                            <span class="tag-name" style="color:{{ random_color() }};">
                                #{{ tag }}
                            </span>
                        </a>
                        {% endfor %}
                    </p>
                    {% endif %}
                </div>
            </div>
        </div>
        {% if pg_image %}
        <img class="post-banner "src='{{ pg_image }}'/>
        {% endif %}
    </div>
</div>
```

Here is a simple style to make each post display necessary basic information:

``` css
.md-typeset .post {
    margin-bottom: 1rem;
}
.md-typeset .post .post-title {
    margin: 0.25rem 0;
    text-decoration: none;
    font-size: 1.3em;
}
.md-typeset .post .post-info {
    display: flex;
}
.md-typeset .post .post-banner {
    margin-top: -1rem;
    max-height: 6rem;
    border: 1px solid lightgray;
}
.md-typeset .post .post-description {
    margin: 0 1rem 0 0;
}
.md-typeset .post .post-extra {
    margin: 0.5rem 1rem 0 0;
    
    color: darkgray;
}
.md-typeset .post .post-tags {
    margin: 0;
    text-align: end;
}
.md-typeset .post .post-date {
    margin: 0;
}
```


### Pagination bar

To show the current active page, I use pure CSS and JavaScript. The idea is to use the URL hash to detect which page is activated, such as `#page1`.

``` html
{# pagination #}
<div class="pages">
    {% for pg_group in blog_pages|slice(page_num) %}
        <div class="page" id="page{{ loop.index }}">
            {% for pg in pg_group %}
                {% set pg_image = "" %}
                {% if pg.meta and pg.meta.banner %}
                    {% set pg_image = pg.canonical_url ~ pg.meta.banner %}
                {% endif %}
                <div class="post">
                    ...
                </div>
            {% endfor %}
        </div>
    {% endfor %}
</div>

<hr>

<div class="center">
    <div class="pagination" id="pagination-bottom">
        <!-- <a href="#">&laquo;</a> -->
        {% for pg_group in blog_pages|slice(page_num) %}
        <a class="page-number {% if loop.index==1 %}active{% endif%}" href="#page{{ loop.index }}">{{ loop.index }}</a>
        {% endfor %}
        <!-- <a href="#">&raquo;</a> -->
    </div>
</div>

<hr>

<p class="center">Total <b>{{ blog_pages|count }}</b> posts in {{ page_num }} pages.</p>

```

Then add some styles to the pagination block and its children links:

\
__CSS Styles__:

Use `target` keyword to select the selected _page ID_, then show only the target element.

``` css
.md-typeset .pages > .page:target ~ .page:last-child,
.md-typeset .pages > .page {
    display: none;
}
.md-typeset .pages > :last-child,
.md-typeset .pages > .page:target {
    display: block;
}
```


__JavaScript__

When the page is loaded, a script will run to get all pagination's links, and then add a callback function for click event, that remove `active` class from last activated element and then assign `active` class to the event's source element. Note that the first page is activated by default when the page is loaded. After a page is selected, function `scrollToTop()` will navigate to the top view.

``` js title="overrides\partials\post-list.html"
<script>
    function scrollToTop() {
        // delay a little for css to calculate windows size
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);
    }

    function activatePaginationLinks(name) {
        var pagination = document.getElementById("pagination-"+name);
        if (pagination) {
            var links = pagination.getElementsByClassName("page-number");
            if (links.length) {
                for (var i = 0; i < links.length; i++) {
                    if (links[i].getAttribute("href") == window.location.hash) {
                        links[i].classList.add("active");
                    } else {
                        links[i].classList.remove("active")
                    }
                }
            }
        }
    }

    // show page 1 as default
    window.location.hash = "#page1";

    // listen to hash change
    window.onhashchange = function() {
        var hash = window.location.hash;
        const regexp = /^#page[0-9]+$/;
        if (regexp.test(hash)) {
            var num = parseInt(hash.substr(5));
            var max = parseInt(document.getElementById('page_num').dataset.value);
            if(num >= 1 && num <= max) {
                activatePaginationLinks("top");
                activatePaginationLinks("bottom");
                scrollToTop();
                return;
            }
        } 
        
        window.location.hash = "#page1";
    }
</script>
```



## Zoom-in Images

As mentioned in the [Images](../markdown-syntax/#images) section, [view-bigimg](https://github.com/newming/view-bigimg) library helps to zoom and pan images. It's useful when the image is in high resolution and resized to fit site's width.

Download `view-bigimg.css` and `view-bigimg.js` files from the [view-bigimg](https://github.com/newming/view-bigimg/tree/master/src) repo, then add them into the addition assets configs in `mkdocs.yml`:

``` yaml
extra_css:
    - assets/view-bigimg.css
extra_javascript:
    - assets/view-bigimg.js
```

When click on the image, this library will create a new layer and show the image in a bigger size. However, it must be clicked on the close button to go back to the page's content. I want to simplify this step by just click on the image. Panning still is activated by press and hold. Therefore, I write a function to detect `mousedown` and `mousemove` event, then only close the image if it is a simple click:

``` js title="assets\extra.js"
var dragged = false;
document.addEventListener("mousedown", () => (dragged = false));
document.addEventListener("mousemove", () => (dragged = true));

var viewer = new ViewBigimg();
var figures = document.querySelectorAll("img");
for (var i = 0; i < figures.length; i++) {
    figures[i].onclick = (e) => {
        if (e.target.nodeName === "IMG") {
            viewer.show(e.target.src);
        }
    };
}
var containers = document.querySelectorAll("#iv-container .iv-image-view");
for (var i = 0; i < containers.length; i++) {
    containers[i].onclick = () => {
        if (!dragged) {
            viewer.hide();
        }
    };
}
```



## Open external links

When following links, to remain the blog page opened, external links should be shown in new tabs without any tracking information. To do that, I write some lines of code to get all external links in the page, then set `target = "_blank"` and add attribute `rel = "noopener noreferrer"` to them.

``` js title="assets\extra.js"
/* open external links in new tab */
var links = document.links;
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
        links[i].target = "_blank";
        links[i].setAttribute("rel", "noopener noreferrer");
        links[i].className += " externalLink";
    } else {
        links[i].className += " localLink";
    }
}
```
