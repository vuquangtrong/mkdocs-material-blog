---
title: Markdown Syntax
description: How to write your posts in Markdown with basic and some extended elements
tags:
  - markdown
featured: true
---

## Metadata

In a markdown file, if you add `metadata` in YAML format at the beginning of the file, it will be used to create `page.meta` object. Metadata is not shown in the page content, but it is used in rendering template to HTML.

It is recommended to have at least 3 fields `title`, `description`, and `tags`, in each post.

``` yaml
---
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
tags:
    - tag1
    - tag2
---
```

## Headings

To create a heading, add number signs (`#`) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level _three_ (`<h3>`), use _three_ number signs (`### My Header level 3`). Please remember to always put a space between the number signs and the heading name.

## Paragraphs

Writing a paragraph is very straight forward. You just write down your sentences and they will be wrapped in `<p>` tags.

* To create paragraphs, use a blank line to separate one or more lines of text.

* To create a line break (`<br>`), end a line with two or more spaces, and then type return.

* You can add emphasis by making text **bold** or _italic_:
    *  To bold text, add two asterisks or underscores before and after a word or phrase
    *  To italicize text, add one asterisk or underscore before and after a word or phrase.

* To create a blockquote, add a `>` in front of a paragraph.

Here is an example:

##### Markdown:
``` md
Paragraphs are the **building blocks** of papers.

Many students define paragraphs in _terms of length_: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the __unity and coherence of ideas__ among sentences is what constitutes a paragraph.

> excerpt from: _https://writingcenter.unc.edu/tips-and-tools/paragraphs_
```

##### Rendered:
Paragraphs are the **building blocks** of papers.

Many students define paragraphs in _terms of length_: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the __unity and coherence of ideas__ among sentences is what constitutes a paragraph.

> excerpt from: _https://writingcenter.unc.edu/tips-and-tools/paragraphs_

## Marks

Beside standard marks to emphasize text as **bold** or _italic_, extended markdown supports some extra ways as below:

::: row
    ::: col
        ##### Markdown:
        ``` md
        * ==This was marked==
        * ^^This was inserted^^
        * ~~This was deleted~~
        * H~2~0
        * A^T^A
        ```
    
    ::: col
        ##### Rendered:
        * ==This was marked==
        * ^^This was inserted^^
        * ~~This was deleted~~
        * H~2~0
        * A^T^A

## List

You can organize items into ordered and unordered lists.

* To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

* To create an unordered list, add dashes (`-`), asterisks (`*`), or plus signs (`+`) in front of line items. Indent one or more items to create a nested list.

* To create Task List, use checked box (`[ ]` or `[x]`) to show completed or uncompleted tasks.

    ::: row
        ::: col
            ##### Markdown:
            ``` md
            1. First item
                - Sub 1.1
                - Sub 1.2
            2. Second item
                * Sub 2.1
                * Sub 2.2
            3. Third item
                + Sub 3.1
                + Sub 3.2
            4. Fourth item
                1. Sub 4.1
                2. Sub 4.2
            5. Task list
                * [x] Done
                * [ ] Not done yet
            ```
        ::: col
            ##### Rendered:
            1. First item
                - Sub 1.1
                - Sub 1.2
            2. Second item
                * Sub 2.1
                * Sub 2.2
            3. Third item
                + Sub 3.1
                + Sub 3.2
            4. Fourth item
                1. Sub 4.1
                2. Sub 4.2
            5. Task list
                * [x] Done
                * [ ] Not done yet

## Links

* To create a link, enclose the link text in brackets (e.g., `[Google]`) and then follow it immediately with the URL in parentheses (e.g., `(https://google.com)`).

* To quickly turn a URL or email address into a link, enclose it in angle brackets (`<>`).

    ::: row
        ::: col
            ##### Markdown:
            ``` md
            [Google](https://google.com).
            <https://codeinsideout.com>
            <vuquangtrong@gmail.com>
            ```
        ::: col
            ##### Rendered:
            [Google](https://google.com)\
            <https://codeinsideout.com>\
            <vuquangtrong@gmail.com>

* Reference-style links are a special kind of link that make URLs easier to display and read in Markdown. Reference-style links are constructed in two parts: the part you keep inline with your text and the part you store somewhere else in the file to keep the text easy to read.

    ##### Markdown:
    ``` md
    In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a [hobbit-hole][1], and that means comfort.

    [1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"
    ```
    ##### Rendered:
    In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a [hobbit-hole][1], and that means comfort.

    [1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"


## Images

To add an image, add an exclamation mark (`!`), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title after the URL in the parentheses.

``` md
![Image alt title](https://dummyimage.com/300x200 "Image title") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.
```

![Image alt title](https://dummyimage.com/300x200 "Image title") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

::: row
    ::: col
        ![Image alt title](https://dummyimage.com/300x200 "Image title")
    ::: col
        **Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

::: row
    ::: col
        ![](https://dummyimage.com/300x200 "Image title")
    ::: col
        ![](https://dummyimage.com/300x200 "Image title")
    ::: col
        ![](https://dummyimage.com/300x200 "Image title")
    ::: col
        ![](https://dummyimage.com/300x200 "Image title")

## Admonitions

=== "Default title"

    ``` md
    !!! note
        Default title
    ```

    !!! note
        Default title

=== "Custom title"

    ``` md
    !!! tip "Custom title"
        Custom title
    ```

    !!! tip "Custom title"
        Custom title

=== "No title"

    ``` md
    !!! info ""
        No title
    ```

    !!! info ""
        No title
    
    !!! info ""
        No title

        More details

=== "More content"

    ``` md
    !!! success
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

    !!! success
        Embedded code

        ``` python
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

=== "Collapsed"

    ``` md
    ??? note
        Details
    ```

    ??? note
        Details

=== "Expanded"

    ``` md
    ???+ note
        Expanded details
    ```

    ???+ note
        Expanded details

## Tables

##### markdown:
``` md
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |

| Column 1     | Column 2 | Column 3 |
| :----------: | -------- | -------- |
| expanded               || expanded |
| not expanded |          |          |
| expanded             |~~|          |
| expanded     | ~~       |          |
| expanded     | a cell   |          |
| _          _ | a cell   |          |
| a cell       | a cell   | _      _ |

```

##### rendered:
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

| Method   | Description                          |
| -------- | ------------------------------------ |
| `GET`    | :material-check:     Fetch resource  |
| `PUT`    | :material-check-all: Update resource |
| `DELETE` | :material-close:     Delete resource |

| Column 1     | Column 2 | Column 3 |
| :----------: | -------- | -------- |
| expanded               || expanded |
| not expanded |          |          |
| expanded             |~~|          |
| expanded     | ~~       |          |
| expanded     | a cell   |          |
| _          _ | a cell   |          |
| a cell       | a cell   | _      _ |

## Actions
The KBD Extension is an inline processor for adding markdown syntax for inline `<kbd>` tags.
Text that is wrapped in:

* double brackets _\[\[button]]_
* double braces _\{\{menu}}_
* or double parenthesis _\(\(action))_

will be wrapped with an HTML `<kbd>` tag with different classes.

::: row
    ::: col
        ##### markdown:
        ``` md
        [[Ctrl]]+[[Alt]]+[[Del]] or [[Details]]
        ((Save)) or ((Run > Run As))
        {{Double click}} or {{Long press}}
        ```
    ::: col
        ##### rendered:
        [[Ctrl]]+[[Alt]]+[[Del]] or [[Details]] \
        ((Save)) or ((Run > Run As)) \
        {{Double click}} or {{Long press}}

## Code blocks

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

        ``` python linenums="1" hl_lines="2 3"
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
        ```

    ``` python linenums="1" hl_lines="2 3"
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```

=== "Inline"

    ``` md
    The `#!python range()` function is used to generate a sequence of numbers.
    The `#!cpp int main(void)` function is the entry point of user application.
    ```

    The `#!python range()` function is used to generate a sequence of numbers.  
    The `#!cpp int main(void)` function is the entry point of user application.

## Tabs

##### markdown:
``` cpp
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
```

##### rendered:

=== "C"

    ``` cpp
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

## Footnotes

Footnotes allow you to add notes and references without cluttering the body of the document. When you create a footnote, a superscript number with a link appears where you added the footnote reference. Readers can click the link to jump to the content of the footnote at the bottom of the page.

To create a footnote reference, add a caret and an identifier inside brackets (`[^1]`). Identifiers can be numbers or words, but they can’t contain spaces or tabs. Identifiers only correlate the footnote reference with the footnote itself — in the output, footnotes are numbered sequentially.

Add the footnote using another caret and number inside brackets with a colon and text (`[^1]`: My footnote.). You don’t have to put footnotes at the end of the document. You can put them anywhere except inside other elements like lists, block quotes, and tables.

``` md
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.
    Indent paragraphs to include them in the footnote.
    `{ my code }`\
    Add as many paragraphs as you like.
```

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.\
    Indent paragraphs to include them in the footnote.\
    `{ my code }`\
    Add as many paragraphs as you like.
