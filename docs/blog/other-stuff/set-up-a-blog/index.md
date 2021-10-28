---
title: Set up a blog
title_full: Set up a personal blog site
description: Start a personal blog based on Material for MkDocs - a well-known theme for a popular Python-based static site generator. Before going to customize a theme, base packages and configurations should be done firstly.
tags:
    - python
    - jinja
---

## 1. Material for MkDocs

[MkDocs](https://www.mkdocs.org/) is a fast and simple engine to build a site for project documentation. Content source files are written in [Markdown](https://daringfireball.net/projects/markdown/) format, and the site is configured with a single [YAML](https://yaml.org/) config file.

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) is a popular theme for MkDocs. It has a simple UI with [Material color](http://www.materialui.co/colors) palettes. It also brings more features than the base MkDocs: single-page web-app mode, flexible settings, clear layout and good styles for printing.

### 1.1. Installation

MkDocs runs on [Python 3](https://www.python.org), so download and install it first.

Create a new folder to store the project:

```cmd
mkdir CodeInsideOut
cd CodeInsideOut
```

Create the project's [virtual environment](https://docs.python.org/3/library/venv.html) to isolate this project with others from a possible package conflict:

```cmd
python -m venv .venv
```

Activate the virtual environment:

```cmd
.venv\Scripts\activate.bat
```

Update the `pip`, `setuptools` and `wheel` as they're used to installing and configuring other packages:

```cmd
python -m pip install -U pip setuptools wheel
```

> `-U` or `--upgrade` will upgrade the package if it is already installed

Then install the _Material for MkDocs_ package:

```cmd
pip install -U mkdocs-material
```

### 1.2. A new site

Bring up the base of the site:

```cmd
mkdocs new .
```

This will create the following file structure:

```sh
.
├─ mkdocs.yml    # The configuration file
└─ docs/         # Other markdown pages
    ├─ index.md  # The documentation homepage
    └─ ...       # Other files
```

Change the theme to _material_ in the project configuration file `mkdocs.yml`:

::: file
mkdocs.yml

```yaml
theme:
    name: material
```

Run a local server with:

```cmd
mkdocs serve
```

And preview the site at <http://localhost:8000> to see the default homepage.

Each Markdown file inside the folder `docs` will be rendered to a page of the site. The index page is located at `docs\index.md`. There can be sub-folders inside the `docs` directory to contain a group of posts in separate main topics.

If a post is named other than `index.md`, the filename will be used as the directory path of the generated page. Here is how MkDocs generates URLs for Markdown posts:

-   folder `docs` becomes the root of the site [www.site.com/](#)
-   file `docs\blog\index.md` becomes a link [www.site.com/blog/](#)
-   file `docs\blog\a-post.md` becomes a link [www.site.com/blog/a-post/](#)

> Use hyphen `-` in folder name and file name to create good URLs.\
> Here are some tips to [keep URLs simple](https://developers.google.com/search/docs/advanced/guidelines/url-structure).

To publish the site, build it first:

```cmd
mkdocs build
```

Then copy all the content in the `site` folder to the website root folder.

## 2. Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/) — a lightweight but powerful source code editor. It well supports users to write code, documents, notes. This editor also have some extensions to turn it into a full-feature IDE for coding, such as [PlatformIO](https://platformio.org/).

![Edit and preview side by side](blog_editing.png)

Useful extensions for writing in Markdown format and editing HTML template:

-   [**Markdown All in One**](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one): add keyboard shortcuts, auto-completion, edit and format list and table.
-   [**Markdown Paste**](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image): paste images, links from the clipboard.
-   [**Prettier — Code formatter**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): a formatter which supports a lot of languages.
-   [**Draw.io Integration**](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio): edit diagrams and SVG images.
-   [**LTeX**](https://marketplace.visualstudio.com/items?itemName=valentjn.vscode-ltex): Grammar/spell checker using LanguageTool with support for LaTeX, Markdown, and others.

Additional extensions:

-   [**Jinja**](https://marketplace.visualstudio.com/items?itemName=wholroyd.jinja): highlight Jinja syntax in HTML templates.
-   [**Sublime Text Key map and Settings Importer**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings): import keybindings and settings.

## 3. Configuration

Material for MkDocs is just a start point. It is needed to be customized a little to fit my personal tastes. All configurations are in the config file `mkdocs.yml`.

### 3.1. Site information

Site information consists of the name, the URL, the title, a description and some keywords that are used to get brief information about the content of the site.

::: file
mkdocs.yml

```yaml
site_name: Code Inside Out
site_url: https://www.codeinsideout.com/ # must have the trailing slash, and be a sub-directory e.g. https://www.codeinsideout.com/my-project/
site_author: Vũ Quang Trọng
site_email: vuquangtrong@gmail.com
site_description: >-
    Embedded Systems and IoT Applications. Step by step.
site_keywords: embedded systems application programming
copyright: >
    &copy; 2021 Code Inside Out, using <a href="https://github.com/vuquangtrong/mkdocs-material-blog">MkDocs Material Blog</a>
```

The social links can be added in the `extra` section in the config file `mkdocs.yml`.
Refer to the guide of [setting up the footer](https://squidfunk.github.io/mkdocs-material/setup/setting-up-the-footer/). The icon field must point to a valid icon path referencing to a [bundled icon](markdown-syntax/index.md/#12-icons--emojis).

::: file
mkdocs.yml

```yaml
extra:
    social:
        - icon: fontawesome/brands/github-alt
          link: https://github.com/vuquangtrong
          name: vuquangtrong
        - icon: fontawesome/brands/facebook-f
          link: https://facebook.com/trongvq
          name: trongvq
        - icon: fontawesome/brands/linkedin-in
          link: https://www.linkedin.com/in/vqtrong
          name: vqtrong
```

### 3.2. Color palette

[Changing color](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/) is to select colors for 2 main groups:

-   The primary color which is used for the header, the sidebar, text links and several other components.
-   The accent color which is used to denote elements that can be interacted with, e.g. hovered links, buttons and scroll-bars.

Both of them can be changed in `mkdocs.yml` by choosing a valid color name. As this page is intent to be printed on paper, I choose the white color as the primary look and feel, and the deep orange color for interactive elements.

::: file
mkdocs.yml

```yaml
theme:
    palette:
        primary: white
        accent: deep orange
```

### 3.3. Fonts

Serif fonts[^serif] are widely used for body text because they are considered to be easier to read than Sans-Serif fonts in print.

[^serif]: https://en.wikipedia.org/wiki/Serif

For better reading, distinguishing the digit zero `0` from the Latin script letter Oh `o` or `O` is a way to avoid mistake, especially while reading technical notes. Fonts for source code do have slashed / dotted / open zero[^zero], but fonts for reading don't have those styles.

[^zero]: https://en.wikipedia.org/wiki/Slashed_zero

It's also needed to clearly distinguish the digit one `1` with lowercase i `i`, the uppercase i `I`, and the lowercase l `l`. Luckily, they usually do not stand close to each other.

To replace the [defaults fonts](https://squidfunk.github.io/mkdocs-material/setup/changing-the-fonts/), this site uses _Noto Serif_ for the body text, and _Roboto Mono_ for the code block.

::: file
mkdocs.yml

```yaml
theme:
    font:
        text: Noto Serif
        code: Roboto Mono
```

Can you easily read below pairs of characters?

-   Body text: 0o 0O oO 1i 1I 1l 1L iI il iL Il IL lL
-   Code block: `0o 0O oO 1i 1I 1l 1L iI il iL Il IL lL`

### 3.4. Logo & Icon

I want to replace the [default icon](https://squidfunk.github.io/mkdocs-material/setup/changing-the-logo-and-icons) and logo with this `code` symbol :fontawesome-solid-code:.

::: file
mkdocs.yml

```yaml
theme:
    icon:
        logo: fontawesome/solid/code
    favicon: favicon.png
```

To use the included icons in Material theme, refer to [Markdown syntax — Icons and Emojis](../markdown-syntax/index.md).

### 3.5. Navigation

Here are some interesting features for the [navigation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/) in Material theme:

::: file
mkdocs.yml

```yaml
theme:
    features:
        - navigation.tabs
        - navigation.top
        - header.autohide
```

#### 3.5.1. Navigation tabs

When tabs are enabled, top-level sections (first-level directories in the `docs` folder) are rendered in a menu layer below the header.

#### 3.5.2. Back-to-top button

A back-to-top button can be shown when the user, after scrolling down, starts to scroll up again. It's rendered in the lower right corner of the viewport, and help to go to the top of the page quickly.

#### 3.5.3. Hide header bar

When auto hiding is enabled, the header is automatically hidden when the user scrolls past a certain threshold, leaving more space for content.

### 3.6. Table of Content

The [Table of Content extension](https://python-markdown.github.io/extensions/toc/) provides a quick navigation between sections in the post, it also places an anchor link at each header. This anchor can be used to link the header from other pages. The `toc_depth: 4` makes the list displays from `<h1>` to `<h4>`.

::: file
mkdocs.yml

```yaml
markdown_extensions:
    - toc:
          permalink: ⚓︎
          slugify: !!python/name:pymdownx.slugs.uslugify
          toc_depth: 4
```

### 3.7. Site analytics

Material for MkDocs natively integrates with [Google Analytics](https://developers.google.com/analytics). Just need to create a new GA property in order to obtain a unique tracking ID of the form `UA-XXXXXXXX-X`, add it to mkdocs.yml:

::: file
mkdocs.yml

```yaml
google_analytics:
    - UA-XXXXXXXX-X
    - auto
```

### 3.8. Comments section

Material for MkDocs is natively integrated with [Disqus](https://disqus.com/), a comment system that provides a wide range of features like social integrations, user profiles, as well as spam and moderation tools.

After setting up the `site_url` in `mkdocs.yml`, Disqus is configured by adding the Disqus short name:

::: file
mkdocs.yml

```yaml
extra:
    disqus: "shortname"
```

This will insert a comment system on every page, except the [index page](/).
If the [Metadata extension](../markdown-syntax/index.md#1-meta-data) is enabled, Disqus can be disabled per page by using an empty string:

::: file
\*.md

```yaml
---
disqus: ""
---
```

### 3.9. Extra styles and scripts

Add stylesheets and JavaScript files to the `docs` directory as below structure:

```md hl_lines="4 5"
.
├─ docs/
│ ├─ assets/
│ | └─ extra.css
│ | └─ extra.js
| └─ blog/
└─ mkdocs.yml
```

Then, add the following line to `mkdocs.yml`:

::: file
mkdocs.yml

```yaml
extra_css:
    - assets/extra.css
extra_javascript:
    - assets/extra.js
```

It's ready to add extra styles and scripts to the site at the moment, but it should be done later after adding new layouts and elements to the theme. At this time, I just need to add some small additional styles to make the theme look a bit harmonious with the selected theme color.

To do that, in the webpage, right-click on an element, then select **Inspect** menu to go to the **Developer Mode**, and check the tag and the class of the selected element.

The page content is usually wrapped inside the tag `#!html <article class="md-content__inner md-typeset"> </article>`, so select either the tag or a class of that tag to use as the container of extra styles. Here are some small requirements:

-   Logo and headers should be in orange to be highlighted, and active links can be in dark blue
-   Search input should have white background color
-   Non-highlighted code needs stand out a bit in dark red in white background
-   Normal paragraph should be fully justified
-   Footer should look smaller by changing the background color
