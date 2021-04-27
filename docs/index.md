---
title: Home
disqus: ""
hide:
  - navigation
  - toc
---

Welcome to
{.welcome}

# {{ config.site_name }} {.site-name}

{{ config.site_description_full }}
{.site-description}

---

{# 
    create a list of social buttons
    use - to remove leading or trailing spaces 
#}
{%- if config.extra.social -%}
    {%- for social in config.extra.social -%}
        [:{{ social.icon | replace('/', '-') }}:]({{ social.link }}){.md-button}
    {% endfor %}
{% endif %}

<style>
    .welcome {
        padding-left: .1em;
        margin-bottom: 0
    }
    .site-name {
        margin-bottom: .5em !important;
        color: orangered !important;
    }
    .site-description {
        font-size: large;
        padding-left: .05em;
        margin-bottom: 0;
    }
    .md-typeset .md-button {
        font-size: unset;
        min-width: 3em;
        text-align: center;
        padding: .3em 0 0 0;
        border-radius: .5em;
        border: 1px solid lightgray;
        color: unset;
    }
</style>
