---
title: MkDocs plugins
title_full: MkDocs plugins to manage blog's pages and content
description: Install MkDocs plugins, add them into the site, customize plugins and rendered content.
tags:
    - mkdocs
---

## 1. Awesome Pages

[MkDocs Awesome Pages plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin) simplifies configuring page titles and their entries order. 

Install the plugin:

``` bat
pip install -U mkdocs-awesome-pages-plugin
```

Enable the extension:

``` yaml
plugins:
    - search # built-in search must be always activated
    - awesome-pages
```

It overrides the `nav` sections in the site config file *mkdocs.yml*, and provides some extra configs:

1. Create a YAML file named *.pages* in a directory and use the `nav` attribute to customize the navigation on that level. List the files and subdirectories in the order that they should appear in the navigation.

2. A `...` entry to specify where all remaining items should be inserted. It can filter the remaining items using glob patterns or regular expressions.

    e.g.
    ``` yaml
    nav:
        - ... | introduction-*.md
        - ...
        - summary.md
    ```
    !!! attention notitle "&nbsp;"
        The pattern is checked against the basename of remaining items - not their whole path.

3. Optionally specify a title for the navigation entry

4. Add additional links to the navigation entry.
    
    e.g.
    ``` yaml
    nav:
        - ...
        - First page: page1.md
        - Link Title: https://lukasgeiter.com
    ```

5. Hide directory by setting the `hide` attribute to `true`.

6. Set directory title using the `title` attribute.

7. Collapse single nested pages by setting `collapse_single_pages` to `true`.


## 2. Macros

[MkDocs macro plugin](https://mkdocs-macros-plugin.readthedocs.io/en/latest/) is a plugin/framework that makes it easy to produce richer and more beautiful pages. It can do two things:

1. Transforming the markdown pages into [Jinja2 templates](https://jinja.palletsprojects.com/en/2.11.x/) that use variables, calls to macros and custom filters.

2. Replacing MkDocs plugins for a wide range of tasks: e.g. manipulating the navigation, adding files after the html pages have already been generated etc.

Install the plugin:

``` bat
pip install -U mkdocs-macros-plugin
```

Enable the extension:

``` yaml
plugins:
    - search # built-in search must be always activated
    - macros
```

!!! warning "incomplete data"
    The macro *{%raw%}{{ navigation.pages }}{%endraw%}* contains a list of all pages, but the data of each page maybe not complete, such as title or meta-data.


## 3. Mermaid

[MkDocs Mermaid2 plugin](https://github.com/fralau/mkdocs-mermaid2-plugin) is a plugin to render textual graph description into [Mermaid](https://mermaid-js.github.io/mermaid) graphs (flow charts, sequence diagrams, pie charts, etc.).

Install the plugin:

``` bat
pip install -U mkdocs-mermaid2-plugin
```

Enable the extension:

``` yaml
plugins:
    - search # built-in search must be always activated
    - mermaid2
```

And configure the codeblock parser for mermaid2 blocks:

``` yaml
markdown_extensions:
  - pymdownx.superfences:
        custom_fences:
          - name: mermaid
            class: mermaid
            format: !!python/name:mermaid2.fence_mermaid
```

Example:

```` md
``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
````

will render as:

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
