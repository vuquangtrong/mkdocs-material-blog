"""
mkdocs-macros-plugin
"""

def define_env(env):

    @env.macro
    def new_page():
        "Add page break marker"
        return '<div class="new-page"></div>'
