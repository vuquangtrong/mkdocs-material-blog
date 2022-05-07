---
title: A Password-proteted private page!
description: To make a page private, we can hide the content to general readers. The content is encrypted, and needs a password to show the original content. This feature is useful but still not totally secured. This post demonstrates how the feature works, its limitations and a soluton for that. Use <code>secret_password</code> to unlock this page.
password: secret_password
date: 2021-05-06
tags:
    - encryption
---



## Encryption

The content is encrypted with AES-256 in Python using [PyCryptodome](https://www.pycryptodome.org/en/latest/), and decrypted in the browser with [Crypto-JS](https://www.npmjs.com/package/crypto-js).

It has been tested in _Python 3.5+_.

!!! caution "Render JavaScript-based content after decrypting"

    If there is any content needs processed by javascript, they do not work after decrypting.

    __Why?__

    In the source code of the `mkdocs-encryptcontent-plugin` plugin, the function `decrypt_action()` inserts decrypted content by setting the attribute `innerHTML`. If your javascript does not subcribe to the change of new content, your decrypted content just appears.

    ``` js
    function decrypt_action(password_input, encrypted_content, decrypted_content) {
        var parts = encrypted_content.innerHTML.split(';');
        var content = decrypt_content(password_input.value, parts[0], parts[1], parts[2]);
        if (content) {
            decrypted_content.innerHTML = content;
        }
    }
    ```

    \
    __Solution__

    When the decrypted content is added, we execute the needed scripts again. Below example runs 4 functions which render html content or update styles and actions.
    Note that delay time is added to wait for content fully updated in HTML DOM element. 

    ``` js title="extra.js"
    var decrypted_content = document.getElementById('mkdocs-decrypted-content');
    if (decrypted_content) {
        decrypted_content.onchange = function() {
            setTimeout(() => {
                activateBigImg();
                activateExternalLinks();
                styleAdmonitions();
                MathJax.typesetPromise();
            }, 1000);
        };
    }
    ```

<style>
    h1.header {
        margin: 2em 0 1em 0;
    }
    .content {
        background-color: lightyellow;
        padding: 1em;
    }
    .content hr,
    .content hr + p,
    .content hr + p + hr {
        display: none;
    }
    .content hr + p + hr + *{
        margin-top: 0;
    }
</style>



# Decrypted Content {.header}

The below content is from the page [Markdown Syntax](../markdown-syntax/), it is used to check how markdown elements are re-rendered after decryption.
There are issues causing some elements are not fully rendered. Those issues may disappear after reloading the page if `#!yaml remember_password: true` option is set for the `encryptcontent` plugin.
<div 
    markdown="1"
    class="content"
>

--8<-- "docs\blog\site-setup\markdown-syntax\index.md"

</div>
