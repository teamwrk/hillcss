# CHANGELOG

## HEAD
* Add placeholder `%_clearfix` in `_layout.scss` for smaller css output
* Remove layout helper `hide` and implement instead `box-0`, `device-small-0` etc.
* Improve `display: none` and `display: block` management for box and device helpers
* Combine `row` and `space` output for `box-...` and `device-...` helpers
* Clean up Grunttasks: `dev, serve, test` (Default is `dev`)
* Change layout-space to Rem unit
* Fix `fraction-to-percent` to return `null` when fraction is incorrect
* Use `hill-` Namespace for public Helper & Utilities methods
* Rename `helpers -> helper` in all cases
* Move Unittests of core methods to `tests/specs/core`
* Rename `_helper.spec.scss` to `functions.spec.scss`
* Rename `$hill-layout-css-general` to `$hill-layout-general-css-output`
* Rename `$hill-layout-css-box` to `$hill-layout-box-css-output`
* Rename `$hill-layout-css-responsive` to `$hill-layout-responsive-css-output`
* Rename `$hill-text-css-helpers` to `$hill-text-helper-css-output`
* Rename `$hill-layers` to `$hill-layer-order`
* Rename `$hill-layout-boxes-space` to `$hill-layout-box-space`
* Change `$hill-layout-attribute-name` to `$hill-html-prefix` and set default to `hill`
* Fix duplicate css output for box and responsive stuff
* Replace `$hill-text-attribute-name` with `$hill-html-prefix`
* Rename `_helpers.spec.scss` to `functions.spec.scss`
* Rename `_utilities.spec.scss` to `_mixins.spec.scss`
* Structure and move logic from `_helper.scss` and `_utilities.scss` to `_mixins.scss` and `_functions.scss`
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
* Move `rem()` to `_helper.scs` cause its a hill API method
* Ignore `*.todo` files, `/design` and `/issues` from git
* Add function `layers()` in `_helper.scss` for z-index based layer management
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
