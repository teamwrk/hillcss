# CHANGELOG

## HEAD
* Change html namespace default from `hill-layout` to `hill-helper`
* Fix dublicate css output for box and responsive stuff
* Simplify documentation of `_config.scss`
* Rename/Merge `$hill-layout-attribute-name` and `$hill-text-attribute-name` to `$hill-html-namespace`
* Rename `$hill-layout-boxes` to `$hill-box-sizes`
* Rename `$hill-box-sizes-space` to `$hill-box-space`
* Rename `$hill-box-sizes-space` to `$hill-box-space`
* Rename `$hill-layout-space` to `$hill-general-space`
* Rename `$hill-layout-space-multiplier` to `$hill-general-space-multiplier`
* Rename `$hill-layout-breakpoints` to `$hill-responsive-breakpoints`
* Add `root` to `$hill-text-sizes` to configure a custom root font-size
* Rename `$hill-layout-css-general` to `$hill-general-css-output`
* Rename `$hill-layout-css-box` to `$hill-box-css-output`
* Rename `$hill-layout-css-responsive` to `$hill-responsive-css-output`
* Rename `$hill-text-css-helpers` to `$hill-text-css-output`
* Rename `$hill-layers` to `$hill-layer-order`
* Update file dependencies of the new structure
* Rename `_helpers.spec.scss` to `functions.spec.scss`
* Rename `_utilities.spec.scss` to `_mixins.spec.scss`
* Struct and move logic from `_helpers.scss` and `_utilities.scss` to `_mixins.scss` and `_functions.scss`
* Split logic of `_layout.scss` to files `_general.scss`, `_box.scss`, `_responsive.scss`
* Rename `core` folder to `lib`
* Improve documentation and update dependencies in `hill-api.scss` and `hill.scss`
* Remove `normalize.css` from package.json`
* Rename `_vars.scss` to `_config.scss`
* Remove never used code and logic like `$hill-layout-classes-as-breaktpoints`, `min` and `max`.
* Change naming like `box-small-1/2` to `device-small-1/2`
* Move box/device general code together
* Rename e.g. `box-small-hide` to `device-small-0`
* Remove dead/commented code for map
* Remove not needed % in fractionToPercent() and update associated unit tests
* Change `$hill-layout-boxes definition from ('25', '50', ...) to fraction definition like so ('1/4', '1/2', ...)
* Change `$hill-layout-boxes default to ('1/4', '1/2', '3/4')
* Remove function `_calcWidth()`, bdecause it is not needed anymore
* Implement functions `_explodeFraction`, `_fractionToPercent` and `_toNumber` for fraction based box model
* Write unittests for `_explodeFraction`, `_fractionToPercent` and `_toNumber`
* Move `rem()` to `_helpers.scs` cause its a hill API method
* Ignore `*.todo` files, `/design` and `/issues` from git
* Add function `layers()` in `_helpers.scss` for z-index based layer management
* Move hillcss griddl to seperate repository -> git@bitbucket.org:twrk/hillcss-griddl.git
* Move `hill.css` and `test-results.css` to `dist` folder
* Unittests for layers() module
* Add `$hill-layout-space-multiplier` variable to configure how many spacing multiplier are needed for a project, for example `2x`, `3x` and so on.
* Make hill extendable and configurable
* Add Jasmine-style BDD testing for SASS with Bootcamp
* Rename main entrypoint layout.scss to hill.scss
* Make hill a bower package by creating bower.json file
* Use NPM to fetch required dependencies
* Add Grunt to automate SASS unit tests
* Add default dotfiles (editorconfig, .gitignore, ..)
