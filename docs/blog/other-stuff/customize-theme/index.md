---
title: Customize theme
title_full: Customize the theme with personal styles
description: A personal website should look different to others to make it unique or standout. Some must-have elements of a blog, such as tag cloud, tag page, list of posts, will also be added.
tags:
    - jinja
    - css
    - javascript
---

## 1. Additional metadata

**A full title**

By using the [Awesome Pages](../mkdocs-plugins/index.md#1-awesome-pages) plugin and the [ Section index](../mkdocs-plugins/index.md#2-section-index) plugin, the navigation sidebar can show a good structure of posts. However, each entry is displaying the post's title with long text, this make the navigation bar look a bit messy.

It is easy to add a full title into a post by using the [Metadata section](../markdown-syntax/index.md#1-meta-data). For example:

```yaml
---
title: Customize theme
title_full: Customize the theme with personal styles
description: A personal website should look different to others ...
---
```

However, the content of each post will also display the short title. To fix this, I am going to override the main template. Before do it, I will add tags in the Metadata section also.

\
**Tags**

A tag is a word or a phrase that describes one main point of a blog post's content. They are an easy way to attach labels to the content and link similar posts together.

The tags of a post are defined in the [Metadata section](../markdown-syntax/index.md#1-meta-data), then they are gathered and processed in templates later.

```yaml
---
title: title
description: description
tags:
    - python
    - mkdocs
---
```

## 2. Override templates

MkDocs allows to override them by just adding extra files that will replace the original ones when building the site. Create a new folder `overrides` in the project folder to save the overriding files, then enable them in the config file `mkdocs.yml`:

::: file
mkdocs.yml

```yaml
theme:
    name: material
    custom_dir: overrides
```

### 2.1. Override files

The structure in the `overrides` directory must mirror the directory structure of the original theme, as any file in the overridden directory will replace the file with the same name which is part of the original theme. Besides, further assets may also be put in the overridden directory.

```sh
.
├─ .icons/                             # Bundled icon sets
├─ assets/
│  ├─ images/                          # Images and icons
│  ├─ javascripts/                     # JavaScript
│  └─ stylesheets/                     # Stylesheets
├─ partials/
│  ├─ integrations/                    # Third-party integrations
│  │  ├─ analytics.html                # - Google Analytics
│  │  └─ disqus.html                   # - Disqus
│  ├─ languages/                       # Localized languages
│  ├─ footer.html                      # Footer bar
│  ├─ header.html                      # Header bar
│  ├─ language.html                    # Localized labels
│  ├─ logo.html                        # Logo in header and sidebar
│  ├─ nav.html                         # Main navigation
│  ├─ nav-item.html                    # Main navigation item
│  ├─ palette.html                     # Color palette
│  ├─ search.html                      # Search box
│  ├─ social.html                      # Social links
│  ├─ source.html                      # Repository information
│  ├─ source-date.html                 # Last updated date
│  ├─ source-link.html                 # Link to source file
│  ├─ tabs.html                        # Tabs navigation
│  ├─ tabs-item.html                   # Tabs navigation item
│  ├─ toc.html                         # Table of contents
│  └─ toc-item.html                    # Table of contents item
├─ 404.html                            # 404 error page
├─ base.html                           # Base template
└─ main.html                           # Default page
```

The template file `base.html`, which originally located in the folder `.venv\Lib\site-packages\material`, is the starting point of any site's page. All other pages should extend from it. The `main.html` template, which extends the `base.html`, is used to add a custom template.

To use other template, in the metadata of the Markdown file, set the attribute `template` with the name of template file. For example:

::: file
blog.md

```md
---
title: Blog
template: blog.html
---
```

### 2.2. Override blocks

Besides overriding partials, it's also possible to override (and extend) template blocks, which are defined inside the template files and wrap specific features. To override a block, create a new template `.html` file inside the `overrides` directory, and define a same block name with the one which will be overridden:

```jinja hl_lines="2"
{% extends "base.html" %}
{% block htmltitle %}
    <title>New title</title>
{% endblock %}
```

To extend a block, use the `#!jinja {{ super() }}` command:

```jinja hl_lines="3"
{% extends "base.html" %}
{% block head %}
    {{ super() }}
    Appended content
{% endblock %}
```

!!! warning no-title "\ "

    To replace a block, don't use the `#!jinja {{ super() }}` command.

```jinja
{% block head %}
    New content
{% endblock %}
```

The list of blocks:

```sh
analytics   # Wraps the Google Analytics integration
announce    # Wraps the announcement bar
config      # Wraps the JavaScript application config
content     # Wraps the main content
disqus      # Wraps the Disqus integration
extrahead   # Empty block to add custom meta tags
fonts       # Wraps the font definitions
footer      # Wraps the footer with navigation and copyright
header      # Wraps the fixed header bar
hero        # Wraps the hero teaser (if available)
htmltitle   # Wraps the <title> tag
libs        # Wraps the JavaScript libraries (header)
outdated    # Wraps the version warning
scripts     # Wraps the JavaScript application (footer)
source      # Wraps the linked source files
site_meta   # Wraps the meta tags in the document head
site_nav    # Wraps the site navigation and table of contents
styles      # Wraps the stylesheets (also extra sources)
tabs        # Wraps the tabs navigation (if available)
```

## 3. Tags page

The tag page is the place to list all tags, and list all pages that have a common tag. A new page will be created at `docs\tags\index.md`. There is a method to use [MkDocs Macros](../mkdocs-plugins/index.md#5-macros) in Markdown template, but it is quite complicated.

I use Jinja syntax to create the content of the Tags page, therefore, create a new file at `overrides\tags.html` and use it as the template for the Tags page:

::: file
docs\\tags\\index.md

```yaml
---8<--- "docs\tags\index.md"
```

The `tags.html` template to include 2 parts:

-   `tag-cloud.html`: make a tag cloud to see how many pages are associated with a tag
-   `tag-list-pages.html`: for each tag, list all pages having that tag to show similar articles together

::: file
overrides\\tags.html

```jinja
---8<--- "overrides\tags.html"
```

Tags will have random colors, to easily disguise them to each other. A helper `random_color()` macro that returns a random color looks like:

::: file
overrides\\partials\\random-colors.html

```jinja
---8<--- "overrides\partials\random-colors.html"
```

Then it can be imported as:

```jinja
{% from "partials/random-colors.html" import random_color %}
```

### 3.1. Tag cloud

The tag cloud shows all tags in different size and color. The bigger a tag is, the more pages mention that tag. Steps to make a tag cloud:

1. Scan all pages and create a list of pairs `(tag, pages[])`

    ```jinja
    {% set tags=[] %}
    {# scan all pages #}
    {% for p in pages %}
    {% if p.page.meta.tags %}
      {# extract tags if available #}
      {% for tag in p.page.meta.tags %}
      {% if tags|length %}
        {% set ns = namespace(found=False) %}
        {# read more about scope at
        https://jinja.palletsprojects.com/en/2.11.x/templates/#assignments
        #}
        {# check if tag exists, append to its page list #}
        {% for item in tags %}
        {% set t, ps = item %}
        {% if tag == t %}
          {% set ns.found = True %}
          {{ ps.append(p.page) or "" }} {# use (or "") to not print} #}
        {% endif %}
        {% endfor %}
        {# if tag doesn't exist, create new page list#}
        {% if not ns.found %}
        {{ tags.append((tag, [p.page])) or "" }}
        {% endif %}
      {% else %}
        {{ tags.append((tag, [p.page])) or "" }}
      {% endif %}
      {% endfor %}
    {% endif %}
    {% endfor %}
    ```

2. Count the number of pages for each tag then show each tag with different text size and color using `font-size` and `color` attributes

    ```jinja
    <p class="md-nav">
        <label class="md-nav__title">Tag cloud</label>
    </p>
    <div class="tag-cloud-content">
    {% if tags|count %}
        {% for item in tags %}
        {% set tag, ps = item %}
        {# create a link with tag name #}
        {# font size is based on the page count #}
        <a class="tag" href="{{ config.site_url }}tags/#{{ tag }}">
            <span class="tag-name" style="
            font-size:{{ 0.6+ps|count*0.1}}rem;
            color:{{ random_color() }};
            ">
            {{- tag -}}
            </span>
            <sup class="tag-count">{{- ps|count -}}</sup>
        </a>
        {% endfor %}
    {% else %}
        <div>
        <h3>No tag found!</h3>
        </div>
    {% endif %}
    </div>
    ```

### 3.2. Page list

This section is simple as it just needs to loop through the list of pairs `(tag, pages[])` and create a link to each page. Steps to take that:

1. Scan all pages and create a list of pairs `(tag, pages[])`

    > see above section

2. Show each tag with the list of pages in a collapsible `<details>` block

    ```jinja
    <div class="tag-page-list">
    {% for item in tags %}
        {% set tag, ps = item %}
        <details class="note" id={{ tag }}>
        <summary>
            {{- tag }} ({{- ps|count -}})
            <a class="headerlink" href="#{{ tag }}">⚓︎</a>
        </summary>
        <ol>
            {% for p in ps %}
            <li>
            <a href="{{ page.canonical_url }}">
                {%- if p.meta and p.meta.title_full -%}
                {{- p.meta.title_full -}}
                {%- elif p.meta and p.meta.title -%}
                {{- p.meta.title -}}
                {%- else -%}
                {{- p.title -}}`
                {%- endif -%}
            </a>
            </li>
            {% endfor %}
        </ol>
        </details>
    {% endfor %}
    </div>
    ```

3. Only one tag block is open at a time to easily follow the selected tag. To do this, I added a callback of the `toggle` event on all tag blocks. Whenever a block is opened, this script will close all others

    ```js
    [...document.getElementsByTagName("details")].forEach((D, _, A) => {
        D.open = false;
        D.addEventListener(
            "toggle",
            (E) => D.open && A.forEach((d) => d != E.target && (d.open = false))
        );
    });
    ```

4. A tag block can be opened via URL with hash being the selected tag

    ```js
    var hash = window.location.hash.substr(1);
    if (hash) {
        document.getElementById(hash).open = true;
    }
    ```

Visit the [Tags](../../../tags/index.md) to see the result.

## 4. Main template

The `main.html` file, extending the `base.html` template, will be used for all markdown pages, and it is the starting point to add custom template.

To override it, add the `main.html` file in the `overrides` folder. Here are things I'm going to do to add more content into a blog post:

1. Extract metadata to get `title`, `title_full`, `description`, `tags`, and other information:

    ```jinja
    {% set title = config.site_name %}
    {% if page and page.meta and page.meta.title_full %}
        {% set title = page.meta.title_full %}
    {% elif page and page.meta and page.meta.title %}
        {% set title = page.meta.title %}
    {% elif page and page.title %}
        {% set title = page.title %}
    {% endif %}

    {% set description = config.site_description %}
    {% if page and page.meta and page.meta.description %}
        {% set description = page.meta.description %}
    {% endif %}

    {% if page and page.meta and page.meta.banner %}
        {% set image = page.meta.banner %}
    {% endif %}

    {% if page and page.meta and page.meta.tags %}
        {% set tags = page.meta.tags %}
    {% endif %}
    ```

2. Add block to use the [Open Graph protocol](https://ogp.me/) to show the page's information when a user shares a page on a social network:

    ```jinja
    {% block htmltitle %}
        <title>{{ title | striptags }} - {{ config.site_name }}</title>
    {% endblock %}

    {% block extrahead %}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="
            {{- title | striptags ~ ' - ' ~ config.site_name -}}
        "/>
        <meta property="og:description" content="{{ description }}" />
        <meta property="og:url" content="{{ page.canonical_url }}" />
        <meta property="og:image" content="
                {%- if image is defined -%}
                    {{ page.canonical_url ~ image }}
                {%- else -%}
                    {{ config.site_url ~ 'assets/banner.jpg' }}
                {%- endif -%}
                " />
        <meta property="og:site_name" content="{{ config.site_name }}" />
        <meta name="twitter:card" content="summary" />
    {% endblock %}
    ```

3. The sidebar will display the **_tag cloud_** based in the page's table of content:

    ```jinja
    {% block site_nav %}
        {% if nav %}
            {% if page and page.meta and page.meta.hide %}
                {% set hidden = "hidden" if "navigation" in page.meta.hide %}
            {% endif %}
            <div class="md-sidebar md-sidebar--primary"
                data-md-component="sidebar"
                data-md-type="navigation" {{ hidden }}>
                <div class="md-sidebar__scrollwrap">
                    <div class="md-sidebar__inner">
                        {% include "partials/nav.html" %}
                        {% if page.toc %}
                        <br>
                        <div class="tag-cloud-nav">
                            {% include "partials/tag-cloud.html" %}
                        </div>
                        {% endif %}
                    </div>
                </div>
            </div>
        {% endif %}
        {% if not "toc.integrate" in features %}
            {% if page and page.meta and page.meta.hide %}
                {% set hidden = "hidden" if "toc" in page.meta.hide %}
            {% endif %}
            <div class="md-sidebar md-sidebar--secondary"
                data-md-component="sidebar"
                data-md-type="toc" {{ hidden }}>
                <div class="md-sidebar__scrollwrap">
                    <div class="md-sidebar__inner">
                        {% include "partials/toc.html" %}
                        {% if not page.toc %}
                        <div class="tag-cloud-toc">
                            {% include "partials/tag-cloud.html" %}
                        </div>
                        {% endif %}
                    </div>
                </div>
            </div>
        {% endif %}
    {% endblock %}
    ```

4. The page content will be placed in the main block. If there is no content, a list of children posts will be shown.

    ```jinja
    {% block content %}
        {% block page_content %}
            <style>
                .page-description {
                    font-weight: bold;
                }
            </style>
            <h1 class="page-title">{{ title | d(config.site_name, true) }}</h1>
            <p class="page-description">{{ description }}</p>
            {% if tags is defined %}
                <p class="page-tags">
                    {% for tag in tags %}
                    <a class="tag" href="{{ config.site_url }}tags/#{{tag}}">
                        <span class="tag-name">
                            #{{ tag }}
                        </span>
                    </a>
                    {% endfor %}
                </p>
            {% endif %}

            {# show the children pages if no content #}
            {% if page.is_section and page.markdown == '' %}
                <h2>Posts in this sections:</h2>
                <ol>
                {% for p in page.children %}
                    <li>
                        <a href="{{ p.canonical_url }}">
                            {%- if p.meta and p.meta.title_full -%}
                                {{- p.meta.title_full -}}
                            {%- elif p.meta and p.meta.title -%}
                                {{- p.meta.title -}}
                            {%- else -%}
                                {{- p.title -}}
                            {%- endif -%}
                        </a>
                    </li>
                {% endfor %}
                </ol>
            {% else %}
                {{ page.content }}
            {% endif %}
        {% endblock %}
    {% endblock %}
    ```

## 5. The recent blog posts

There should be a page showing the recent posts to help users see what is new and updated. With the [Revision Date](../mkdocs-plugins/index.md#3-revision-date) plugin, it is able to use two new meta-data fields: `git_revision_date_localized`, and `git_creation_date_localized` if the option `enable_creation_date` is `true`.

Create new `index.md` file inside the `blog` folder. When using the [Section Index](../mkdocs-plugins/index.md#2-section-index) plugin, this index file will be merged to the Blog section, therefore, when user selects the Blog label, there is a list of recent posts will be shown.

This page will use the `blog.html` template in which it scans all posts and check the creation date to make a list of posts. Each post should be displayed in a container and be formatted to show the title, the description (at most 250 character using the `truncate` filter), the creation date, and its tags.

Here is the code to sort all pages in order of creation date, and then filter all blog posts to save into the array `blog_pages` which will be used to generate content.

```jinja
{% set blog_pages=[] %}

{% for p in
    pages|sort(
        attribute='page.meta.git_creation_date_localized',
        reverse=True
    )
%}
    {% set pg = p.page %}

    {# do not list empty section pages #}
    {% if not pg.markdown == '' %}
        {{ blog_pages.append(pg) or "" }}
    {% endif %}

{% endfor %}

<div class="pages">
    ... create list from blog_pages ...
</div>
```

### 5.1. Groups of pages

When the number of posts goes bigger, the recent post list becomes longer. It's time to brake the long list into pages — the user can click on the page number to see its children posts.

This is called "Pagination". How to implement it?

Jinja template has the [`slice` filter](https://jinja.palletsprojects.com/en/3.0.x/templates/#jinja-filters.slice) to divide a list into sub-lists. Here, I'd like to have maximum of 10 posts on each page.

```jinja
{% set page_num = (blog_pages|count / 10)|int %}

{# have at least one page #}
{% if page_num == 0 %}
    {% set page_num = 1 %}
{% endif %}

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

### 5.2. Post-entry

Each post is wrapped inside a `#!html <div class="post">` and its elements are marked with different classes, such as `post-title`, `post-description`, etc. for applying styles later.

```jinja
<div class="post">
    <h3 class="post-title">
        <a class="link" href="{{ pg.canonical_url }}">{{ title }}</a>
    </h3>
    <p class="post-description">
        {% if pg.meta.description %}
        {{ pg.meta.description | truncate }}
        {% endif %}
    </p>
    <div class="post-extra">
        <span class="post-timestamp">
            {% if pg.meta and pg.meta.git_revision_date_localized %}
            <span class="post-timestamp-update">
                Updated: {{ pg.meta.git_revision_date_localized -}}
            </span>
            {% endif %}
        </span>
        <span class="post-tags">
            {% if pg.meta.tags %}
            {% for tag in pg.meta.tags %}
            <a class="tag" href="{{ config.site_url }}tags/#{{tag}}">
                <span class="tag-name"
                        style="color:{{random_color()}};">
                    #{{ tag }}
                </span>
            </a>
            {% endfor %}
            {% endif %}
        </span>
    </div>
    <hr />
</div>
```

Here is a simple style to make each post display necessary basic information:

```css
.md-typeset .post {
    font-size: 0.9em;
}
.md-typeset .post h3,
.md-typeset .post hr,
.md-typeset .post .post-title,
.md-typeset .post .post-description {
    margin: 0.5em 0;
}
.md-typeset .post .post-extra {
    color: gray;
}
.md-typeset .post .post-tags {
    float: right;
}
```

### 5.3. Pagination bar

To show the current active page, I use pure CSS and JavaScript. The idea is to use the URL hash to detect which page is activated, such as `#page1`.

```jinja
<div class="center">
    <div class="pagination" id="pagination">
    <a href="#">&laquo;</a>
    {% for pg_group in blog_pages|slice(page_num) %}
        <a class="page-number {% if loop.index==1 %}active{% endif%}"
            href="#page{{ loop.index }}">{{ loop.index }}</a>
    {% endfor %}
    <a href="#">&raquo;</a>
    </div>
</div>
```

Then add some styles to the pagination block and its children links:

\
**CSS Styles**:

Use `target` keyword to select the selected _page ID_, then show only the target element.

::: file
assets\\extra.css

```css
.md-typeset .pages > .page:target ~ .page:last-child,
.md-typeset .pages > .page {
    display: none;
}
.md-typeset .pages > :last-child,
.md-typeset .pages > .page:target {
    display: block;
}
```

\
**JavaScript**

When the page is loaded, a script will run to get all pagination's links, and then add a callback function for click event, that remove `active` class from last activated element and then assign `active` class to the event's source element. Note that the first page is activated by default when the page is loaded. After a page is selected, function `scrollToTop()` will navigate to the top view.

::: file
assets\\extra.js

```js
function scrollToTop() {
    // delay a little for css to calculate windows size
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 100);
}

function activatePaginationLinks() {
    var pagination = document.getElementById("pagination");
    if (pagination) {
        var links = pagination.getElementsByClassName("page-number");
        if (links.length) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("click", function () {
                    var current = pagination.getElementsByClassName("active");
                    console.log(current);
                    if (current.length) {
                        current[0].className = current[0].className.replace(
                            " active",
                            ""
                        );
                    }
                    this.className += " active";
                    scrollToTop();
                });
            }
            links[0].click();
            scrollToTop();
        }
    }
}

activatePaginationLinks();
```

## 6. The 404 page

Whenever a page is not found in a website, the error `404` is return to the requested users. I need to create this special page to display a short message and guide user to search in this blog.

The [404 page](/404) should be created in the `overrides` folder as it will replace the default 404 pages of Material theme. Its layout is based on the `base.html`, and the content is a message displayed in the center of the page. The `disqus` comment section is removed. The sidebar should not be visible to display message clearly.

```jinja
---8<--- "overrides\404.html"
```

## 7. Zoom-in Images

As mentioned in the [Images](../markdown-syntax/index.md#7-images) section, [view-bigimg](https://github.com/newming/view-bigimg) library helps to zoom and pan images. It's useful when the image is in high resolution and resized to fit site's width.

Download `view-bigimg.css` and `view-bigimg.js` files from the [view-bigimg](https://github.com/newming/view-bigimg/tree/master/src) repo, then add them into the addition assets configs in `mkdocs.yml`:

::: file
mkdocs.yml

```yaml
extra_css:
    - assets/view-bigimg.css
extra_javascript:
    - assets/view-bigimg.js
```

When click on the image, this library will create a new layer and show the image in a bigger size. However, it must be clicked on the close button to go back to the page's content. I want to simplify this step by just click on the image. Panning still is activated by press and hold. Therefore, I write a function to detect `mousedown` and `mousemove` event, then only close the image if it is a simple click:

::: file
assets\\extra.js

```js
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

## 8. Open external links

When following links, to remain the blog page opened, external links should be shown in new tabs without any tracking information. To do that, I write some lines of code to get all external links in the page, then set `target = "_blank"` and add attribute `rel = "noopener noreferrer"` to them.

::: file
assets\\extra.js

```js
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
