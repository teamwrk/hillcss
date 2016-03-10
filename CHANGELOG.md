# CHANGELOG

## HEAD
* Move `rem()` to `_helpers.scs` cause its a hill API method
* Ignore `*.todo` files, `/design` and `/issues` from git
* Add function `layers()` in `_helpers.scss` for z-index based layer management
* Move hillcss griddl to seperate repository -> git@bitbucket.org:twrk/hillcss-griddl.git
* Move `hill.css` and `test-results.css` to `dist` folder
* Unittests for layers() module
* Add `$hill-layout-space-multiplier` variable to configure how many spacing multiplier are needed for a project, for example `2x`, `3x` and so on.
* `$hill-text-root` Create SASS variable to configure a custom root font-size
* Make hill extendable and configurable
* Add Jasmine-style BDD testing for SASS with Bootcamp
* Rename main entrypoint layout.scss to hill.scss
* Make hill a bower package by creating bower.json file
* Use NPM to fetch required dependencies
* Add Grunt to automate SASS unit tests
* Add default dotfiles (editorconfig, .gitignore, ..)
