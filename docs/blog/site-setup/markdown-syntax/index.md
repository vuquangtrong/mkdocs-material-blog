---
title: Syntaxes for Writing Markdown Documents
description: There are some useful Markdown extensions that brings more convenience for you while working with writing, especially in editing technical documents. Let's take a look at all extensions and new syntaxes which are being used in this site.
date: 2021-05-02
banner: markdown.jpg
tags:
    - markdown
---

!!! info " "

    For basic markdown syntax, refer to [Markdown Guide](https://www.markdownguide.org/basic-syntax/.)



## Meta-data

The [Meta-Data extension](https://squidfunk.github.io/mkdocs-material/reference/meta-tags/) adds a syntax for defining meta-data of a document. It is inspired by and follows the syntax of [MultiMarkdown](https://fletcherpenney.net/multimarkdown/#metadata). Meta-data is the additional information that can be used to briefly describe the content of a post, such as the title, the short description, tags, and sometimes the banner image. _I prefer YAML format_:

``` yaml
---
title: The page title
description: The summary of the page content
---
```

The meta-data can be used in the template and the page content[^macros]. In Jinja syntax, each page is represented as a `page` object, then the meta-data field `#!jinja {{page.meta.title}}` will be replaced by the string `#!yaml The page title`.

[^macros]: Use [mkdocs-macros](https://mkdocs-macros-plugin.readthedocs.io/en/latest/) plugin to use Jinja template directly in the Markdown content.



## Code highlighting

Below extensions are extremely useful for showing code blocks by adding colors, and decoration.


### Inline code

The [InlineHilite](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/#highlighting-inline-code-blocks) is an inline code highlighter inspired by [CodeHilite](https://python-markdown.github.io/extensions/code_hilite/).

Borrowing from CodeHilite's existing syntax, InlineHilite utilizes the following syntax to insert inline highlighted code: <code>\`:::language my code\`</code> or <code>\`#!language my code\`</code>.

This will render this line <code>\`#!python [x for x in range(1, 10) if x % 2]\`</code> to a fully colored inline Python code: `#!python [x for x in range(1, 10) if x % 2]`.


### Code blocks

The [Code blocks](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/) plugin provides a number of features including allowing the nesting of fences, and ability to specify custom fences to provide features like flowcharts, sequence diagrams, or other custom blocks. Highlighting can be further controlled via the [Highlight extension](https://facelessuser.github.io/pymdown-extensions/extensions/highlight/).

The standard format which supports to add `id`, `class`, or custom attribute `key=value` is as below:

```` css
```{ .language #id .class key="value"}
content
```
````

Some special attributes `key=value` are as below:

- `#!css title="abc"` creates a title for the block, used to show the filename or the purpose.
- `#!css linenums="n"` creates line numbers starting from _n_.
- `#!css hl_lines="x y-z"` highlights the __x__-th line and lines in the range from __y__-th to __z__-th. Line numbers are always referenced starting at 1 ignoring what the line number is started labeling at the number set by the option `#!css linenums="n"`.

_Example:_

````
``` cpp title="main.c" linenums="2" hl_lines="1 4-5"
#include <stdio.h>

int main(void) {
    printf("Hello world!\n");
    return 0;
}
```
````

_Result:_

``` cpp title="main.c" linenums="2" hl_lines="1 4-5" 
#include <stdio.h>

int main(void) {
    printf("Hello world!\n");
    return 0;
}
```

#### Code annotations

[Code annotation](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/#code-annotations) is a unique feature of Material theme which offers a comfortable and friendly way to attach arbitrary content to specific sections of code blocks by adding numeric markers in block and inline comments in the language of the code block.

Code annotations can be placed anywhere in a code block where a comment for the language of the block can be placed, e.g. for JavaScript in `// ...` and `/* ... */`, for YAML in `# ...`, etc.

_Example:_

````
``` cpp
int main(void) {
    printf("Hello world!\n");
    return 0;
}
```

1. Need including\
   `#!cpp #include <stdio.h>`

````

_Result:_ 

Click on :one:{style="border-radius:1em;"} to show the annotation.

``` cpp
int main(void) {
    printf("Hello world!\n"); // (1)
    return 0;
}
```

1. Need including\
   `#!cpp #include <stdio.h>`



## Admonitions

[Admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/), also known as call-outs, are an excellent choice for including side content without significantly interrupting the document flow.


### Marked blocks

These types of blocks show an icon to help readers notice the kind of content, such as _additional information_, _caution_, or _error_.

_Example:_

``` md
!!! info "The title of the block"

    The content can contain formatted text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis ante blandit diam accumsan scelerisque.

    - Lorem ipsum dolor sit amet
    - Lorem ipsum dolor sit amet

    ``` cpp
    int main(void) {
        return 0;
    }
    ```
```

_Result:_

!!! info "The title of the block"

    The content can contain formatted text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis ante blandit diam accumsan scelerisque.

    - Lorem ipsum dolor sit amet
    - Lorem ipsum dolor sit amet

    ``` cpp
    int main(void) {
        return 0;
    }
    ```

To remove the title but keep the icon, use a space:

``` md hl_lines="1"
!!! hint " "

    Need some CSS styles to adjust content block of admonitions.
```

_Result:_

!!! hint " "

    Need some CSS styles to adjust content block of admonitions.


#### Supported types

::: row

    ::: col style="padding: 0 1em"

        !!! abstract "abstract, summary, tldr"

        !!! info "info, todo"

        !!! tip "tip, hint, important"

        !!! success "success, check, done"

        !!! question "question, help, faq"

        !!! tag "tag"

    ::: col style="padding: 0 1em"

        !!! warning "warning, caution, attention"

        !!! failure "failure, fail, missing"

        !!! danger "danger, error"

        !!! bug "bug"

        !!! example "example"

        !!! quote "quote, cite"
        

### Collapsible blocks

When Details is enabled and an admonition block is started with `???` instead of `!!!,` the admonition is rendered as a collapsible block with a small toggle on the right side. Use plus (`+`) sign to make it expanded by default.

_Example:_

``` md
???+ quote "Expandable"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.
```

_Result:_

???+ quote "Expandable"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.



## MathJax

[MathJax](https://www.mathjax.org/) is a beautiful and accessible way to display mathematical content in the browser, adds support for mathematical typesetting in different notations (e.g. [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics), [MathML](https://en.wikipedia.org/wiki/MathML), [AsciiMath](http://asciimath.org/)).


#### Block syntax

Blocks must be enclosed in `$$...$$` or `\[...\]` on separate lines:

_Example:_

``` latex
$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$
```

_Result:_

$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$


#### Inline syntax

Inline blocks must be enclosed in `$...$` or `\(...\)` :

_Example:_

``` latex
The homomorphism $f$ is injective if and only if its kernel is only the singleton set $e_G$, because otherwise $\exists a,b \in G$ with $a \neq b$ such that $f(a)=f(b)$.
```

_Result:_

The homomorphism $f$ is injective if and only if its kernel is only the singleton set $e_G$, because otherwise $\exists a,b \in G$ with $a \neq b$ such that $f(a)=f(b)$.



## Formatting

Beside _Italic_, __Bold__, ___Italic and Bold___, here are some more syntax to format texts.


### Caret

[Caret](https://facelessuser.github.io/pymdown-extensions/extensions/caret/) optionally adds two different features which are syntactically built around the `^` character.

The double carets `^^` inserts `<ins></ins>` tags, and\
the single caret `^` inserts `<sup></sup>` tags.
 
_Example:_

``` md
The ^^mass-energy^^ equivalence: E=m*c^2^.
```

_Result:_

The ^^mass-energy^^ equivalence: E=m*c^2^. 


### Mark

[Mark](https://facelessuser.github.io/pymdown-extensions/extensions/mark/) adds the ability to insert `<mark></mark>` tags.

The syntax requires the text to be surrounded by double equal signs `==` .

_Example:_

``` md
==mark me== and ==mark==me==all==.
```

_Result:_

==mark me== and ==mark==me==all==.


### Tildes

[Tildes](https://facelessuser.github.io/pymdown-extensions/extensions/tilde/) optionally adds two different features which are syntactically built around the `~` character.

Add Deletion by using double tildes `~~` which inserts `<del></del>` tags and\
Add Subscript by using single tilde `~` which inserts `<sub></sub>` tags.

_Example:_

```
~~Remove~~ the existence of CH~3~CH~2~OH.
```

_Result:_

~~Remove~~ the existence of CH~3~CH~2~OH.


### Critic

[Critic](https://facelessuser.github.io/pymdown-extensions/extensions/critic/) is an extension that adds handling and support of [Critic Markup](http://criticmarkup.com/) which uses a special syntax to represent edits to a Markdown document. This extension runs before all other extensions to parse the critic edits.

Critic Markup uses special markup to insert, delete, substitute, highlight, and comment.

_Example:_

``` md
To insert or remove text, use {​++insert me++} and {​--remove me--}.\
Denote a substitution with {​~~that ~> this one~~}.

Highlight specific text with {​==highlight me==}.\
Or even add {​>>a comment<<}.
```

_Result:_

To insert or remove text, use {++insert me++} and {--remove me--}.\
Denote a substitution with {~~that ~> this one~~}.

Highlight specific text with {==highlight me==}.\
Or even add {>>a comment<<}.



## Lists

This element allows to group a set of related items in lists. Children items can be numbered in ordered list, or even can have inline checkbox.

#### Ordered list

::: row
    ::: col

        ``` md
        1. Ordered item 1
            1. Child 1
            2. Child 2
        2. Ordered item 2
        ```

    ::: col
        ::: packed
            1. Ordered item 1
                1. Child 1
                2. Child 2
            2. Ordered item 2

#### Unordered list

::: row
    ::: col
        ``` md
        -   Unordered item 1
            -   Child 1
            -   Child 2
        -   Unordered item 2
        ```

    ::: col
        ::: packed
            -   Unordered item 1
                -   Child 1
                -   Child 2
            -   Unordered item 2


#### Task list

::: row
    ::: col
        ``` md
        -   [x] item 1
            -   [x] item a
            -   [ ] item b
        -   [ ] item 2
        ```

    ::: col
        ::: packed
            -   [x] item 1
                -   [x] item a
                -   [ ] item b
            -   [ ] item 2


#### Definition

::: row
    ::: col

        ``` md
        Roses
        :   are red

        Violets
        :   are blue
        ```

    ::: col
        ::: packed
            Roses
            :   are red

            Violets
            :   are blue



## Images

There are some extensions to add a caption to an image. After testing, [markdown-captions](https://github.com/evidlo/markdown_captions) is a good one that uses the alternate text to make caption, accepts markdown in the alternate text.

``` md
![A photo from <https://picsum.photos>](https://picsum.photos/320/240)
```

![A photo from <https://picsum.photos>](https://picsum.photos/320/240)

Some images have big size that does not show the detail, therefore, it's better to zoom in by clicking on them, and pan the image on the screen. The [view-bigimg](https://github.com/newming/view-bigimg) library can do that requirement well.



## Tabs

[Tabbed extension](https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/) provides a syntax to easily add tabbed Markdown content.

Tabs start with `===` to signify a tab followed by a quoted title. Consecutive tabs are grouped into a tab set.

_Example:_

``` md
=== "Tab 1"
    Some texts

    === "Tab A"
        Text A

    === "Tab B"
        Text B

=== "Tab 2"
    Some other texts
```

_Result:_

=== "Tab 1"
    Some texts

    === "Tab A"
        Text A

    === "Tab B"
        Text B

=== "Tab 2"
    Some other texts



## Tables

Markdown Tables are written in pipe-line format: row is on one line, cell is inline text only. The 1st line contains the column headers. The 2nd line is to control text alignment in a column: `:---`, `:---:` and `---:` are left, center, and right alignment. Styles for table need to change a little to show cell border.

_Example:_

``` md
| Syntax     | Description  |   Test Text |
| :--------- | :----------: | ----------: |
| Left align | Center align | Right align |
| A text     | Another text |  More texts |
```

_Result:_

| Syntax     | Description  |   Test Text |
| :--------- | :----------: | ----------: |
| Left align | Center align | Right align |
| A text     | Another text |  More texts |



## Icons & Emojis

The [Emoji extension](https://facelessuser.github.io/pymdown-extensions/extensions/emoji/) adds support for inserting emoji via simple short names enclosed within colons `:short_name:`. This is accomplished by using a short name index to map easy-to-remember names to the corresponding emoji characters.

#### Emojis

Emojis can be written by putting the short-code of the emoji between two colons. Look up the short-codes at [Emojipedia](https://emojipedia.org/twitter/).

`:smile: ` :smile:, and `:heart:` :heart:


#### Icons

Icons can be used similarly to emojis, by referencing a valid path to any icon bundled with the theme, which are located in the `.icons` directory, and replacing `/` with `-`.

E.g. The short-code `:material-account-circle:` will be converted to an SVG image element with the path `.icons/material/account-circle.svg` which eventually shows the icon :material-account-circle: on the webpage.

Using `include` function of Jinja to add an icon wrapped in a `twemoji` class, e.g. to show :fontawesome-brands-twitter::

``` html
<span class="twemoji">
    {% include ".icons/fontawesome/brands/twitter.svg" %}
</span>
```



## Escape All

The [Escape All](https://facelessuser.github.io/pymdown-extensions/extensions/escapeall/) extension makes the backslash `\` character escape everything after it, except things in code blocks of any kind.

There are two special escapes among all of these escapes though: escaping _space_ characters and escaping _newline_ characters:

-   Enable `nbsp` to convert an escaped space into a non-breaking space: `&nbsp;`.
-   Enable `hardbreak` to convert an escaped newline to a hard break ` <br>`. The advantage of hard break is that the backslash is visually seen in the document, opposed to the Markdown's default method of two spaces at the end of a line.



## Special characters

The [Smarty Pants](https://python-markdown.github.io/extensions/smarty/) extension converts ASCII dashes, quotes and ellipses to their HTML entity equivalents.

| Syntax            | Render          |
| ----------------- | --------------- |
| `'single quote'`  | 'single quote'  |
| `"double quote"`  | "double quote"  |
| `<<angle quote>>` | <<angle quote>> |
| `ellipses ...`    | ellipses ...    |
| `N-dash --`       | N-dash --       |
| `M-dash ---`      | M-dash --       |

The [Smart Symbols](https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/) adds syntax for creating special characters such as trademarks, arrows, fractions, etc.

| Syntax                                | Render                              |
| ------------------------------------- | ----------------------------------- |
| `trademark (tm)`                      | trademark (tm)                      |
| `copyright (c)`                       | copyright (c)                       |
| `registered (r)`                      | registered (r)                      |
| `in care of c/o`                      | in care of c/o                      |
| `plus or minus +/-`                   | plus or minus +/-                   |
| `arrows --> <-- <-->`                 | arrows --> <-- <-->                 |
| `not equal =/=`                       | not equal =/=                       |
| `fractions 1/4 2/3`                   | fractions 1/4 2/3                   |
| `ordinal numbers 1st 2nd 3rd 4th 5th` | ordinal numbers 1st 2nd 3rd 4th 5th |

!!! hint " "

    Not all fractions can be displayed. To render fractions in a better format, use [MathJax](#mathjax) with inline format. Such as `$1 \over 4$` --> $1 \over 4$, or `$2 \over 3$` --> $2 \over 3$.



## Footnotes

The [Footnotes extension](https://python-markdown.github.io/extensions/footnotes/) adds syntax for defining footnotes in Markdown documents.

_Example:_

``` md
Footnotes[^fn] have a label[^lb] and the footnote's content.

[^fn]: This is a footnote content.
[^lb]: A footnote on the label `lb`.
```

_Result:_

Footnotes[^fn] have a label[^lb] and the footnote's content.

[^fn]: This is a footnote content.
[^lb]: A footnote on the label `lb`.
