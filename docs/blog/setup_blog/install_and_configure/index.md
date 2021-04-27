---
title: Install and configure
title_full: Install and configure a blog based on Material for MkDocs
description: Install Material for MkDocs, add Markdown extensions, modify layouts and styles.
tags:
    - python
    - mkdocs
---

## 1. Installation

### 1.1. Python

Download and install [Python 3](https://www.python.org).

### 1.2. Material for MkDocs

There are some [static site generators](https://jamstack.org/generators/) written in Python: MkDocs, Pelican, Sphinx, etc. MkDocs is the most popular one.

[MkDocs](https://www.mkdocs.org/) is a fast and simple engine to build project documentation. Content source files are written in [Markdown](https://daringfireball.net/projects/markdown/), and configured with a single [YAML](https://yaml.org/) config file.

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) is a popular theme for MkDocs. It has a simple UI with [Material color](http://www.materialui.co/colors) palettes. It also brings more features, has flexible settings, and makes a clear layout for printing. 

!!! note notitle "&nbsp;"
    Refer to the official homepage of Material for MkDocs.Refer to the official homepage of Material for MkDocs.Refer to the official homepage of Material for MkDocs.Refer to the official homepage of Material for MkDocs.Refer to the official homepage of Material for MkDocs

Start a new project:

``` bat
mkdir CodeInsideOut
cd CodeInsideOut
```

Create project's [virtual environment](https://docs.python.org/3/library/venv.html):

``` bat
python -m venv .venv
```

> Why should use virtual environment? Read more here.

Activate the environment:

``` bat
.venv\Scripts\activate.bat
```

Then update the `pip` and `setuptools`:

``` bat
python -m pip install -U pip setuptools
```

> `-U` or `--upgrade` will upgrade the package if it is already installed

Then install _Material for Mkdocs_:

``` bat
pip install -U mkdocs-material
```

Finally, bring up the base of the site

``` bat
mkdocs new .
```

This will create the following structure

``` sh
.
├─ mkdocs.yml    # The configuration file
└─ docs/         # Other markdown pages
    ├─ index.md  # The documentation homepage
    └─ ...       # Other files
```

Change the theme to _material_ in the project configuration file *mkdocs.yml*:

``` yaml
theme:
    name: material
```

That's it.  Start a local server with :

``` bat
mkdocs serve
```

and preview the site at <http://localhost:8000>.

To publish the site, build it:

``` bat
mkdocs build
```

then copy all the content in the _site_ folder to the website root folder.

### 1.3. Visual Studio Code

Install [Visual Studio Code](https://code.visualstudio.com/) - a lightweight but powerful source code editor. It well supports users to write code, documents, notes.

Useful extensions for writing in Markdown and editing HTML template:

* __Code Spell Checker__: catch common spelling errors

* __Markdown All in One__: keyboard shortcuts, auto completions, list and task list, table formatter

* __Markdown Paste__: paste image, links from clipboard

* __Jinja__: highlight Jinja syntax (HTML template)

* __Git History__: view history edits from git log

## 2. Configuration

### 2.1. Markdown extensions

Original Markdown syntax just renders some basic elements. Therefore many extensions are made to extend Markdown syntax:

* [Official Markdown extensions](https://python-markdown.github.io/extensions/) has more syntaxes to make Tables, Table of Content,  Abbreviations, Admonitions, Codeblocks.

* [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) has a list of useful extensions to replace the official ones which eventually produce much better formats such as Nested Code Bocks, Tabs, Progress Bars, Tasks.

* [3rd party extensions](https://github.com/Python-Markdown/markdown/wiki/Third-Party-Extensions) which extend the Python Markdown APIs to deal with Math/Latex, Diagrams, Advanced formats, and more.

Material for MkDocs comes with both Official Python Markdown extensions and PyMdown Extensions, but those are not fully activated. To enable an extension, just need to declare its name in the project config file *mkdocs.yml* under `markdown_extensions` field. For example:

``` yaml
markdown_extensions:
    - admonition
```

Refer to [Markdown Syntax](../markdown_syntax/index.md) to know the list of extensions and their usage.

### 2.2. MkDocs plugins

To extend the abilities of MkDocs, there are some plugins can be installed. Check the list at the [official MkDocs plugin list](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins).

To enable an extension, just need to declare its name in the project config file *mkdocs.yml* under `plugins` field. For example:

``` yaml
plugins:
    - search # built-in search engine
```

Refer to [MkDocs plugins](../mkdocs_plugins/index.md) to know the list of plugins and their usage.

### 2.3. Theme configs

Material for MkDocs comes with some configs to change the look of the site. Follow the official homepage of [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) to learn how to configure or override the theme with more information.

List of modifications:

* Theme settings
* Overridden templates
* Additional styles

Refer to [Customize theme](../customize_theme/index.md) to know the list of modifications in details.
