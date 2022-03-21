:: -U will upgrade the package if it is already installed
python -m pip install -U pip setuptools wheel

::
:: MkDocs plugins
::

pip install -U mkdocs-material

pip install -U mkdocs-awesome-pages-plugin

:: pip install -U mkdocs-section-index

:: below branch fixed the issue of windows path
pip install -U git+https://github.com/frankkopp/mkdocs-redirects.git

pip install -U git+https://github.com/vuquangtrong/mkdocs-pdf-with-js-plugin.git

pip install -U mkdocs-git-revision-date-localized-plugin

pip install -U mkdocs-encryptcontent-plugin

pip install -U mkdocs-exclude

::
:: Markdown extensions
::

pip install -U markdown-captions

pip install -U markdown-customblocks

pip install -U git+https://github.com/vuquangtrong/cell_row_span.git

::
:: copy reference source
::
rmdir /s /q refer
mkdir refer
robocopy /s .venv\Lib\site-packages\material refer *.html
