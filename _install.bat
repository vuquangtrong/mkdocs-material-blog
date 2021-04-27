rem -U will upgrade the package if it is already installed
python -m pip install -U pip setuptools

rem markdown extensions
pip install -U markdown-captions
pip install -U kbdextension
pip install -U git+https://github.com/vuquangtrong/cell_row_span.git
pip install -U markdown-customblocks

rem mkdocs plugins
pip install -U mkdocs-material
pip install -U mkdocs-awesome-pages-plugin
pip install -U mkdocs-macros-plugin
pip install -U mkdocs-mermaid2-plugin
pip install -U mkdocs-git-revision-date-plugin
pip install -U mkdocs-git-revision-date-localized-plugin
pip install -U git+https://github.com/vuquangtrong/mkdocs-pdf-with-js-plugin.git

rem copy reference source
rmdir /s /q refer
mkdir refer
robocopy /s .venv\Lib\site-packages\material refer *.html
