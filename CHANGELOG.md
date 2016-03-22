# CHANGELOG

## Tags

> - Breaking Change
> - New Feature
> - Bug Fix
> - Documentation
> - Internal
> - Polish

## HEAD

## v1.0.0 - 23-03-2016

![Happy Hillcss v1 Release](http://i.imgur.com/XmMMZKg.gif)

### Breaking Change
* Change `$hill-layout-boxes` definition from ('25', '50', ...) to fraction like definition ('1/4', '1/2', ...)
* Add box margins left/right and remove that `:last-child ` version.
* Rename main entrypoint layout.scss to hill.scss
* Use `hill-` Namespace for public Helper & Utilities methods
* Change wording of `box-small-1/2` to `device-small-1/2`

### New Feature
* Add function `layers()` in `_helper.scss` for z-index based layer management
* `$hill-text-root` Create SASS variable to configure a custom root font-size for Rem calculation
* Add `$hill-layout-space-multiplier` variable to configure how many spacing multiplier are needed for a project, for example `2x`, `3x` and so on.
* Add Jasmine-style BDD testing for SASS with [Bootcamp](https://www.npmjs.com/package/bootcamp)

### Internal
* Change layout-space to Rem unit
* Fix `fraction-to-percent` to return `null` when fraction is incorrect
* Structure and move logic from `_helper.scss` and `_utilities.scss` to `_mixins.scss` and `_functions.scss`
* Rename `_vars.scss` to `_config.scss`
* Remove function `_calcWidth()`, because it is not needed anymore
* Implement functions `_explodeFraction`, `_fractionToPercent` and `_toNumber` for fraction based box model
* Move `rem()` to `_helper.scs` cause its a hill API method

### Documentation
* Improve documentation and update dependencies in `hill-api.scss` and `hill.scss`
* Add full documentation of the hillcss framework


