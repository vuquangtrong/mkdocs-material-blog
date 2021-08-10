---
title: MkDocs plugins
title_full: MkDocs plugins with additional features
description: New features can be added to MkDocs engine by installing additional plugins. These packages can modify the navigation behavior, or render new content types, or export the site to PDF documents. Plugins also can be modified easily as they are written in Python.
tags:
    - mkdocs
---

## 1. Awesome Pages

[MkDocs Awesome Pages plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin) simplifies configuring page titles and their entries order.

Install the plugin:

```bat
pip install -U mkdocs-awesome-pages-plugin
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - awesome-pages
```

It overrides the `nav` sections in the site config file `mkdocs.yml`, and provides some more extra configs:

1.  Create a YAML file named `.pages` in a directory and use the `nav` attribute to customize the navigation on that level. List the files and subdirectories in the order that they should appear in the navigation.

2.  A 3-dots `...` entry is used to specify where all remaining items should be inserted. It can filter the remaining items using glob patterns or regular expressions. For example:

    ::: file
    .pages

    ```yaml
    nav:
        - ... | introduction-*.md
        - ...
        - summary.md
    ```

    !!! Attention no-title "\ "

        The pattern is checked against the basename of remaining items - not their whole path, so it can be used to filter files in sub-folders.

3.  Hide directory by setting the `hide` attribute to `true`.
4.  Optionally set the directory title using the `title` attribute.
5.  Optionally specify a title for the navigation entry before its document path. For example:

    ::: file
    .pages

    ```yaml
    title: New section
    nav:
        - First page: page1.md
        - Link Title: https://example.com
    ```

6.  Collapse single nested pages by setting `collapse_single_pages` attribute to `true`.
    ![Using `collapse_single_pages` only, before and after applying](nav_collapse_single_pages.png)

## 2. Section index

[MkDocs Section Index](https://pypi.org/project/mkdocs-section-index/) is a plug that change the navigation sidebar to turn section name to a link that show the index page that section.

Install the plugin:

```bat
pip install -U mkdocs-section-index
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - awesome-pages
    - section-index # must be after awesome-pages
```

In MkDocs, each directory will become a section, and by default, section only contains its children. There is no page associated to a section. This plugin will merge the `index.md` page in the directory to its section label. However, the merge section page show the section's title {>>from directory name<<}, not the page's title.

![Using the Section Index plugin only, before and after applying](nav_section_index_only.png)

This result is different from using `collapse_single_pages: true` option in the Awesome Pages plugin. If you use single page collapsing, Awesome Pages plugin replace the section which has only one child by its child page. Therefore, a directory with `index.md` and some sub-folders will not be processed to merge the `index.md` to the section label of that directory.

Use both Awesome Pages `collapse_single_pages` option and Section Index will make a better result because both page and title are merged to the section.

## 3. Revision date

To keep tracking the last modified date of a post, [git-revision-date](https://github.com/zhaoterryy/mkdocs-git-revision-date-plugin) plugin can be used. A better alternative plugin is [git-revision-date-localized](https://pypi.org/project/mkdocs-git-revision-date-localized-plugin/) which provides more types of date format (even in time-ago format), and the creation date.

Install the plugin:

```bat
pip install -U mkdocs-git-revision-date-localized-plugin
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - git-revision-date-localized:
          enable_creation_date: true
          type: iso_date
```

This plugin creates new field in the post's meta-data which content the creation and update date. This information is used to sort the posts by revision date to get recently updated items, as shown in the [Blog](../../index.md) page. Read more in the [Customize theme](../customize-theme/index.md).

## 4. Print to PDF

To export the posts on this blog, there are plugins which can do it. However, most of them depend on [Weasy Print](http://weasyprint.org/) which in turn depends on many other packages. There is one plugin that does print in an easy and simple way: use browser to print page by sending print command (like press `Ctrl + S`).

More detail of installation and configuration the [MkDocs PDF with JS](https://github.com/vuquangtrong/mkdocs-pdf-with-js-plugin) plugin for printing to PDF can be read in [Print to PDF](../print-to-pdf/index.md).

## 5. Macros

!!! Attention "This plugin is no longer used in this site!"

[MkDocs Macros](https://mkdocs-macros-plugin.readthedocs.io/en/latest/) is a plugin/framework that makes it easy to produce richer and more beautiful pages. It can do two things:

1. Transform the markdown pages into a [Jinja2 templates](https://jinja.palletsprojects.com) that can use variables, macros and filters.

2. Replace MkDocs plugins for a wide range of tasks: e.g. manipulating the navigation, adding files after the HTML pages have already been generated etc.

Install the plugin:

```bat
pip install -U mkdocs-macros-plugin
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - macros
```

!!! Bug "Incomplete data in macro"

    The macro `#!md {{ navigation.pages }}` contains a list of all pages, but the data of each page maybe not complete, such as title or meta-data.

    This issue happens when rendering a the content of the first page, but it needs to know the content of the second page which has not been parsed already as it is waiting for the first page getting done.

## 6. DrawIO Exporter

!!! Attention "This plugin is no longer used in this site!"

[DrawIO Exporter](https://github.com/LukeCarrier/mkdocs-drawio-exporter) is a great plugin that exports the `.drawio` diagrams to images at build time and insert them to the document. This plugin can replace the [Mermaid](https://github.com/fralau/mkdocs-mermaid2-plugin) plugin, and it is faster thanks to no JavaScript needed at runtime. It also helps to enable instant navigation mode of the Material theme.

Install the plugin:

```bat
pip install -U mkdocs-drawio-exporter
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - drawio-exporter
```

To create end edit `.drawio` diagram, download and install the [diagrams.net](https://www.diagrams.net) application.

To import a diagram, just use the syntax for inserting an image:

```md
![My alt text](my-diagram.drawio)
```

The plugin will generate an SVG image to a cache folder (default in `docs\drawio-exporter`), and then modify the image source attribute to the generated image.

If the diagram is a multi-page documents, append the index of the page as an anchor in the URL:

```md
![Page 1](my-diagram.drawio#0)
```

![A draw.io diagram](example.drawio.svg)

!!! Attention "A limitation"

    Using [Draw.io Integration](../index.md#12-visual-studio-code) extension in Visual Studio Code, I can save a DrawIO diagram as a `.drawio.svg` file, then use that file directly in the page as an usual image. However this method will not support multiple pages in the drawing:

    ```md
    ![My alt text](my-diagram.drawio.svg) // work
    ![My alt text](my-diagram.drawio.svg#1) // does not work
    ```

## 7. Mermaid

!!! Attention "This plugin is no longer used in this site!"

[MkDocs Mermaid2](https://github.com/fralau/mkdocs-mermaid2-plugin) is a plugin to render textual graph description into [Mermaid](https://mermaid-js.github.io/mermaid) graphs (flow charts, sequence diagrams, pie charts, etc.).

Install the plugin:

```bat
pip install -U mkdocs-mermaid2-plugin
```

Enable it in the config file:

```yaml
plugins:
    - search # built-in search must be always activated
    - mermaid2
```

And configure the code block parser for mermaid2 blocks:

```yaml
markdown_extensions:
    - pymdownx.superfences:
          custom_fences:
              - name: mermaid
                class: mermaid
                format: !!python/name:mermaid2.fence_mermaid
```

Example:

````md
```mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
````

will render as:

![A diagram generated by Mermaid](example.mermaid.svg)
