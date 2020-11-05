---
title: Writing Syntax
description: Quick reference to supported syntax for faster Writing and beautiful Output
tags:
    - markdown
date: 2020/30/01
featured: true
---

## Metadata

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - meta
```

In the markdown file, add *metadata* in YAML format:

```yaml
---
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
tags:
    - tag1
    - tag2
---
```

## Internal links

Create a simple **About** page at `docs/about.md`.
Link to internal page can be done by Markdown Link `#!md [About](../../about.md)`:  [About](../../about.md).

## Abbreviations

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - abbr
  - pymdownx.snippets
```

####  Usage

```md
The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium
```

#### Preview

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium


## Admonitions

Setting in `mkdocs.yml`"

```yaml
markdown_extensions:
  - admonition
```

####  Usage and Preview

=== "Default title"

    ```md
    !!! note
        Default title
    ```

    !!! note
        Default title

=== "Custom title"

    ```md
    !!! note "Custom title"
        Custom title
    ```

    !!! note "Custom title"
        Custom title

=== "No title"

    ```md
    !!! note ""
        No title
    ```

    !!! note ""
        No title

=== "More content"

    ```md
    !!! note
        Embedded code

        ``` python
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
        ```

        in side
    ```

    !!! note
        Embedded code

        ```python
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
        ```

        in side

=== "Other types"

    !!! note "note, seealso"
        
    !!! abstract "abstract, summary, tldr"
        
    !!! info "info, todo"
        
    !!! tip "tip, hint, important"
        
    !!! success "success, check, done"
        
    !!! question "question, help, faq"
        
    !!! warning "warning, caution, attention"
        
    !!! failure "failure, fail, missing"
        
    !!! danger "danger, error"
        
    !!! bug "bug"
        
    !!! example "example"
        
    !!! quote "quote, cite"

## Collapse

Setting in `mkdocs.yml`"

```yaml
markdown_extensions:
  - pymdownx.details
```

####  Usage and Preview

=== "Collapsed"

    ```md
    ??? note
        Details
    ```

    ??? note
        Details

=== "Expanded"

    ```md
    ???+ note
        Expanded details
    ```

    ???+ note
        Expanded details
    
## Attributes

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - attr_list
```

####  Usage and Preview

=== "Text"

    ```md
    <style>
    .text-green {
        color: green
    }
    .bg-lightyellow {
        background: lightyellow
    }
    </style>

    **Lorem ipsum**{: .text-green} dolor sit amet, consectetur adipiscing elit. 
    Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, 
    justo purus auctor massa, nec semper lorem quam in massa.
    {: .bg-lightyellow}
    
    ```

    <style>
    .text-green {
        color: green
    }
    .bg-lightyellow {
        background: lightyellow
    }
    </style>

    **Lorem ipsum**{: .text-green} dolor sit amet, consectetur adipiscing elit. 
    Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, 
    justo purus auctor massa, nec semper lorem quam in massa.
    {: .bg-lightyellow}

=== "Button"

    ```md
    [Subscribe to our mailing list](#){: .md-button }
    ```

    [Subscribe to our mailing list](#){: .md-button }

    ```md
    [Subscribe to our mailing list](#){: .md-button .md-button--primary }
    ```

    [Subscribe to our mailing list](#){: .md-button .md-button--primary }

    ```md
    [Submit :fontawesome-solid-paper-plane:](#){: .md-button .md-button--primary }
    ```

    [Submit :fontawesome-solid-paper-plane:](#){: .md-button .md-button--primary }


## KbdExtention

The KBD Extension is an inline processor for adding markdown syntax for inline `<kbd>` tags.
Text wrapped in 
_double brackets \[\[button]]_{: .newspan .text-green}, 
_double braces \{\{menu}}_{: .newspan .text-blue}, 
or _double parenthesis \(\(action))_{: .newspan .text-purple} 
will be wrapped with an HTML `<kbd>` tag with different classes.

Install the extension:

```shell
pip install kbdextension
```

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.keys:
  - kbdextension:
      brackets_css: button # [[button]]
      enable_parens: true
      parens_css: menu # ((menu))
      enable_braces: true
      braces_css: action # {{action}} or {{ "{{action}}" }}when using marcro
  
```

??? hint "KBD Extention CSS"

    ```css
    ---8<--- "docs/stylesheets/kbd.css"
    ```

####  Usage

```md
Keys: ++ctrl+alt+del++ or ++shift+a++ \
Button: [[Download]] or [[Details]] \
Menu: ((Save)) or ((Run > Run As)) \
Action: {{Double click}} or {{Long press}}
```

#### Preview

Keys: ++ctrl+alt+del++ or ++shift+a++ \
Button: [[Download]] or [[Details]] \
Menu: ((Save)) or ((Run > Run As)) \
Action: {{Double click}} or {{Long press}}

## Code blocks

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - pymdownx.inlinehilite
```

####  Usage and Preview

=== "Numbered"

        ``` python linenums="1"
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
        ```


    ``` python linenums="1"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```

=== "Highlighted"

        ``` python hl_lines="2 3"
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
        ```

    ``` python hl_lines="2 3"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```

=== "Inline"

    ```md
    The `#!python range()` function is used to generate a sequence of numbers.
    The `#!cpp int main(void)` function is the entry point of user application.
    ```

    The `#!python range()` function is used to generate a sequence of numbers.  
    The `#!cpp int main(void)` function is the entry point of user application.


Make unformatted code block look better

```css
.md-typeset code {
    color: var(--md-code-hl-special-color);
}
```

## Tabs

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.tabbed
```

####  Usage

    === "C"

        ``` c
        #include <stdio.h>

        int main(void) {
        printf("Hello world!\n");
        return 0;
        }
        ```

    === "C++"

        ``` c++
        #include <iostream>

        int main(void) {
        std::cout << "Hello world!" << std::endl;
        return 0;
        }
        ```

#### Preview

=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

## Tables

```yaml
markdown_extensions:
  - tables
```

####  Usage

```md
| Method   | Description                          |
| -------- | ------------------------------------ |
| `GET`    | :material-check:     Fetch resource  |
| `PUT`    | :material-check-all: Update resource |
| `DELETE` | :material-close:     Delete resource |
```

#### Preview

| Method   | Description                          |
| -------- | ------------------------------------ |
| `GET`    | :material-check:     Fetch resource  |
| `PUT`    | :material-check-all: Update resource |
| `DELETE` | :material-close:     Delete resource |

## Footnotes

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - footnotes
```

####  Usage

```md
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
[^2]: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

####  Preview

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

## Caret, Mark & Tilde

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
```

####  Usage

```md
* ==This was marked==
* ^^This was inserted^^
* ~~This was deleted~~
* H~2~0
* A^T^A
```

####  Preview

* ==This was marked==
* ^^This was inserted^^
* ~~This was deleted~~
* H~2~0
* A^T^A

## Critic

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.critic:
      mode: view
```

####  Usage

<div markdown="1" style="background-color: var(--md-code-bg-color); font-size: .85em; padding: .7em 1.2em;">

Text can be \{\--deleted--} and replacement text \{\++added++}. This can also be
combined into \{\~\~one~>a single~~} operation. \{\==Highlighting==} is also
possible \{\>>and comments can be added inline<<}.

\{\==

Formatting can also be applied to blocks, by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}

</div>


####  Preview

Text can be {--deleted--} and replacement text {++added++}. This can also be
combined into {~~one~>a single~~} operation. {==Highlighting==} is also
possible {>>and comments can be added inline<<}.

{==

Formatting can also be applied to blocks, by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}

## Icons & Emojis

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

####  Usage

```md
:material-account-circle: – `.icons/material/account-circle.svg`
:fontawesome-regular-laugh-wink: – `.icons/fontawesome/regular/laugh-wink.svg`
:octicons-octoface-16: – `.icons/octicons/octoface-16.svg`
:fontawesome-brands-facebook:{: style="color:#4267B2"} – Medium
:smile: 

```

####  Preview

:material-account-circle: – `.icons/material/account-circle.svg` \
:fontawesome-regular-laugh-wink: – `.icons/fontawesome/regular/laugh-wink.svg` \
:octicons-octoface-16: – `.icons/octicons/octoface-16.svg` \
:fontawesome-brands-facebook:{: style="color:#4267B2"} – Medium \
:smile:

## Lists

This is natively supported in Markdown.

#### Usage and Preview

=== "Unordered"

    ```
    * Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
    accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
    lacinia sed. Aenean in finibus diam.

        * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
        * Nam vulputate tincidunt fringilla.
        * Nullam dignissim ultrices urna non auctor.
    ```

    * Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
    accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
    lacinia sed. Aenean in finibus diam.

        * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.

=== "Ordered"

    ```
    1. Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
    sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
    nulla. Vivamus a pharetra leo.

        1. Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
        quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
        ultricies libero efficitur sed.

        2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
        rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

            1. Mauris dictum mi lacus
            2. Ut sit amet placerat ante
            3. Suspendisse ac eros arcu
    ```

    1. Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
    sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
    nulla. Vivamus a pharetra leo.

        1. Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
        quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
        ultricies libero efficitur sed.

        2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
        rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

            1. Mauris dictum mi lacus
    2. Ut sit amet placerat ante
    3. Suspendisse ac eros arcu

=== "Definition"

    ```
    `Lorem ipsum dolor sit amet`
    :   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
        tellus non sem sollicitudin, quis rutrum leo facilisis.

    `Cras arcu libero`
    :   Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin
        ut eros sed sapien ullamcorper consequat. Nunc ligula ante.

        Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
        Nam vulputate tincidunt fringilla.
        Nullam dignissim ultrices urna non auctor.
    ```

    `Lorem ipsum dolor sit amet`
    :   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
        tellus non sem sollicitudin, quis rutrum leo facilisis.

    `Cras arcu libero`
    :   Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin
        ut eros sed sapien ullamcorper consequat. Nunc ligula ante.

        Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
        Nam vulputate tincidunt fringilla.
        Nullam dignissim ultrices urna non auctor.


## Tasklist

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.tasklist:
      custom_checkbox: true
```

####  Usage

```md
* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

#### Preview

* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque

## HTML block

All HTML blocks is translated as-is to the output. \
You ==should NOT have empty line(s) inside HTML blocks==.

#### Example

```html
<style>
@keyframes heart {
0%, 40%, 80%, 100% {
    transform: scale(1);
}
20%, 60% {
    transform: scale(1.15);
}
}
.heart {
animation: heart 1000ms infinite;
}
</style>

:octicons-heart-fill-24:{: .heart }
```

#### Preview

<style>
@keyframes heart {
  0%, 40%, 80%, 100% {
    transform: scale(1);
  }
  20%, 60% {
    transform: scale(1.15);
  }
}
.heart {
  animation: heart 1000ms infinite;
}
</style>

:octicons-heart-fill-24:{: .heart }


### Markdown in HTML

To enable Markdown syntax inside a HTML block, enable it and add attribute `markdown="1"`

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - md_in_html
```

####  Usage

```md hl_lines="1"
<div markdown="1" style="color: darkred">
**Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.

Nulla et euismod nulla
</div>
```

#### Preview

<div markdown="1" style="color: darkred">
**Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.

Nulla et euismod nulla
</div>

### Note

!!! note ""
    Should not have empty line(s) inside pure HTML blocks if that block is at root. 
    If HTML block is inside a wrapper, it is considered as markdown block

```md
<div style="color: darkred">
**Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.

Nulla et euismod nulla
</div>
```

<div style="color: darkred">
**Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.

Nulla et euismod nulla
</div>

> All HTML block is considered as Markdown block if it is inside a quote or tab 
>    ```
>    > All HTML block is considered as Markdown block if it is inside a quote or tab 
>        <div markdown="1" style="color: darkred">
>        **Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.
> 
>        Nulla et euismod nullaa
>        </div>
>    ```
>
>    <div markdown="1" style="color: darkred">
>    **Lorem** ipsum dolor sit amet, *consectetur* adipiscing ==elit==.
> 
>    Nulla et euismod nulla
>    </div>

## Images

Image is natively support in Markdown, however, additional extension will help to show Image Caption

Install extension:

```shell
pip install markdown-captions
```

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - markdown_captions:
```

#### Usage and Preview

```md
![Alt title 300x200](https://dummyimage.com/300x200 "Title 300x200")
```

![Alt title 300x200](https://dummyimage.com/300x200 "Title 300x200")

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur 
feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

```md
![Alt title WQXGA](https://dummyimage.com/wqxga "Title WQXGA")
```

![Alt title WQXGA](https://dummyimage.com/wqxga "Title WQXGA")

!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur 
    feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.
    
    ```md
    ![Alt title HD720](https://dummyimage.com/hd720 "Title HD720")
    ```

    ![Alt title HD720](https://dummyimage.com/hd720 "Title HD720")

## Progress Bar

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.progressbar:

extra_css:
  - stylesheets/progressbar.css
```

??? hint "Progress Bar CSS"

    ```css
    ---8<--- "docs/stylesheets/progressbar.css"
    ```

####  Usage

```md
[=0% "0%"]
[=20% "20%"]
[=40% "40%"]
[=60% "60%"]
[=80% "80%"]
[=100% "100%"]

[=0%]{: .thin}
[=20%]{: .thin}
[=40%]{: .thin}
[=60%]{: .thin}
[=80%]{: .thin}
[=100%]{: .thin}
```

#### Preview

[=0% "0%"]
[=20% "20%"]
[=40% "40%"]
[=60% "60%"]
[=80% "80%"]
[=100% "100%"]

[=0%]{: .thin}
[=20%]{: .thin}
[=40%]{: .thin}
[=60%]{: .thin}
[=80%]{: .thin}
[=100%]{: .thin}

## Sane Header

This require headers to have spaces after the hashes (`#`) in order to be recognized as headers.

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.saneheaders:
```

```md
### Header

####Not a Header
```

## EscapeAll

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.escapeall:
```

There are two special escapes among all of these escapes though: escaping "space" characters and escaping "newline" characters. If [[nbsp]] is enabled, an escaped space {==\\ ==} will be converted into a non-breaking space: `&nbsp;`. If hardbreak is enabled, an escaped newline {==\\n==} will be converted to a hard break `<br>`. The advantage of hardbreak is that you can visually see the hard break opposed to Markdown's default method of two spaces at the end of a line.

####  Usage

```md
This is a line with some spaces {==\ \ \ \ \ ==} in the sentence. {==\==}
This is a line with some spaces {==          ==} in the sentence but they are not rendered.

A line is here. {==\==}
A new line is here, thanks to the escaped newline.{==  ==}
Another new line thanks to two space at the end of last line.  
The last line is not put on a new line!
```

####  Preview

This is a line with some spaces {==\ \ \ \ \ ==} in the sentence. \
This is a line with some spaces {==          ==} in the sentence but they are not rendered.

A line is here. \
A new line is here, thanks to the escaped newline.  
Another new line thanks to two space at the end of last line.  
The last line is not put on a new line!

## Magic Link

MagicLink supports auto-linking HTTP, FTP and email links. You can specify these links in raw text and they should get auto-linked. 
There are some limitations placed on MagicLink to keep it from aggressively auto-linking text that is not part of links. 
If you have a link that cannot be detected, you can always use the old style angle bracketed `<>` link format.

Setting in `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.magiclink:
```

####  Usage 

```
<https://codeinsideout.com> \
https://codeinsideout.com \
vuquangtrong@gmail.com
```

####  Preview

<https://codeinsideout.com> \
https://codeinsideout.com \
vuquangtrong@gmail.com

## Colors

Include defined colors for custom formatting with custom span

Setting in `mkdocs.yml`:

```yaml
extra_css:
  - stylesheets/colors.css
```

??? hint "W3.CSS Colors"

    ```css
    ---8<--- "docs/stylesheets/colors.css"
    ```

####  Usage

```md
_Text in green, but in red when horvering_{: .newspan .text-green .hover-text-red} \
_Background in yellow, but in cyan when hovering_{: .newspan .yellow .hover-cyan}
```

####  Preview

_Text in green, but in red when horvering_{: .newspan .text-green .hover-text-red} \
_Background in yellow, but in cyan when hovering_{: .newspan .yellow .hover-cyan}
