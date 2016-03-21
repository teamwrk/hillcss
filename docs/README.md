<img align="right" height="150" src="/docs/assets/hill_logo.png?raw=true">

# Hillcss - A Sass Toolkit for Intuitive Layouting

[![Build Status](https://api.travis-ci.org/teamwrk/hillcss.svg?branch=master)](https://travis-ci.org/teamwrk/hillcss)
[![npm version](https://img.shields.io/npm/v/hillcss.svg)](https://www.npmjs.com/package/hillcss)

## 1 - Why Hillcss

Layouting should be separate from project Module styling. So we decided to create a toolkit of Sass functions and Markup helpers to realise a layouting framework that is lightweight and can be used independently.

Hillcss covers all basic aspects of modern CSS layouting and it has also even more advantages:

<img align="right" alt="Why Hillcss Schema" width="55%" src="/docs/assets/hill_why.png?raw=true">

* Keep Focus on your Module Styles ...
* ... Layouting is already set up with Hillcss!
* Fits perfectly into your Project
* Generates only that parts you need
* Very Lightweight 0.5KB (Full Configuration, GZip)
* A simple and intuitive Grid-System
* API for both Sass and HTML
* Well thought out by developers for developers

## 2 - Get Hillcss

```cli
$ npm i hillcss --save
```

## 3 - Use Hillcss

Now load Hillcss into your Sass project. Load `hill-api.scss` instead of `hill.scss` file in order to use only the Sass API.

```sass
@import 'node_modules/hill/hill';
```

Hillcss is splitted into different Parts. Each of this parts can be configured independently. Now, the first step is to configure Hillcss properly to fit into your project.
The following _Scss_ configuration variables are defined globally and without a `!default` flag to overwrite the Hillcss defaults.

**Hints**

* All parameters are optional and not required!
* All HTML API Parameters can also be used simultaneously!


### 3.1 - HTML Prefix / Namespace

It is up to you how to call you layouting tool:

* **Default** `hill`
* **Type** String

**Sass Config**
```sass
$hill-html-prefix: myProject;
```

**HTML API**
```html
<div myProject-layout="space-bottom">...</div>
<p myProject-text="center">...</p>
```


### 3.2 - [Layout] Boxes

<img alt="Hill Layout Boxes" width="50%" src="/docs/assets/hill_layout_boxes.png?raw=true">

We decided to use a Grid System based on fractions not based on percentage.

* **Default** `('1/4', '1/2', '3/4', '1/1')`
* **Type** List
* **HTML API** Enabled by Default `$hill-layout-box-css-output: true default;`

**Sass Config**
```sass
$hill-layout-boxes: (
    '1/3',
    '1/2',
    '2/3',
    '1/1');

$hill-layout-box-css-output: false; // To not render HTML API helper
```

**HTML API**

* `row` (Adds a clearfix (3.4) and float Boxes inside)
* `box-{fraction}` (Last-child has no Box-Space (3.3))
* `box-0` (Hide elements from the screen per default with `-0)

```html
<div hill-layout="row">
    <div hill-layout="box-1/3">...</div>
    <div hill-layout="box-2/3">...</div>
</div>

<div hill-layout="box-0">Hidden Box</div>
```

### 3.3 - [Layout] Box Space

Default Gutter Space between Layout Boxes.

* **Default** `2%`
* **Type** Number

**Sass Config**
```sass
$hill-layout-box-space: 5%;
```


### 3.4 - [Layout] Spacing / General Helper

Variable used for vertical and horizontal spacing between `block` or `inline-block` HTMLElements. On the other hand, Hillcss has a set of HTML API helper that are enabled in combination with space-helper.

* **Default** `1.25rem`
* **Type** Number
* **Hint** Pixel and REM units are both permitted
* **HTML API** Enabled by Default `$hill-layout-general-css-output: true !default`

**Sass Config**
```sass
$hill-layout-space: 2rem;
$hill-layout-general-css-output: false; // To not render HTML API helper
```

**HTML API**

* `space-{top, right, bottom, left}`
* `space-{top, right, bottom, left}-{multiplier}` // See 3.5
* `float-left`
* `float-right`
* `clear` ([Micro Pseudo-Element Clearfix](http://nicolasgallagher.com/micro-clearfix-hack/))

```html
<p hill-layout="space-bottom">...</p>

<div hill-layout="clear">
    <p>...</p>
    <img hill-layout="float-right" />
</div>
```


### 3.5 - Layout Space Multiplier

Multiplier of `$hill-layout-space` (see 3.4) to increase Spacing but always be a multiple of the same base.
If it has a value of 3, it means that for example `space-bottom`, `space-bottom-2x` and `space-bottom-3x` helper attributes are available in html.

* **Default** `2`
* **Type** Number

**Sass Config**
```sass
$hill-layout-space-multiplier: 3;
```

**HTML API**
```html
<p hill-layout="space-top-2x">...</p>
<p hill-layout="space-right-3x">...</p>
```


### 3.6 - [Layout] Breakpoints

Hillcss has variables Breakpoints which are used for the HTML API of Boxes and for the Sass API. Breakpoints makes it possible to change Box Sizing and visibility on different screen sizes. It will also being considered to use the width of the surrounding container of a Box instead of the screen size ([Element Queries](http://ianstormtaylor.com/media-queries-are-a-hack/) could be the right choice here). (We planned this for v2.0 of Hillcss)

* **Default** `(small:  480px, medium: 992px, large:  1280px)`
* **Type** Map
* **HTML API** Disabled by Default `$hill-layout-responsive-css-output: false !default;`

**Sass Config**
```sass
$hill-layout-breakpoints: (
    phone-portrait: 320px,
    phone-landscape: 480px,
    phone-large: 640px,
    tablet: 992px,
    desktop:  1280px,
    desktop-large: 1600px
);

$hill-layout-responsive-css-output: true; // To render HTML API helper
```

**Sass API**

* `hill-device-is($breakpoint)`
* `hill-device-min($breakpoint)`
* `hill-device-max($breakpoint)`
* `hill-device-between($min-breakpoint, $max-breakpoint)`

```sass
.example {
    color: blue;

    @include hill-device-is(small) {
        color: red;
    }
}
```

**HTML API**
```html
<div hill-layout="box-1/4 device-small-1/2">...</div>
<p hill-layout="device-small-0">Hidden on `small`</p>
```


### 3.7 - [Layout] Layers

To be more consistent we create a Map of z-index Layers (we call them layer aliases) and the corresponding Sass API to work with the Map.

* **Default** `('highest', 'lowest')`
* **Type** List

**Sass Config**
```sass
$hill-layer-order: (
    'overlay',
    'background'
);
```

**Sass API**

* `hill-layer($alias)`

```sass
.overlay {
    position: absolute;
    z-index: @layer('overlay'); // z-index: 2
}

.page {
    position: absolute;
    z-index: @layer('background'); // z-index: 1
}
```

```sass
$hill-layer-order: (
    'highest', // z-index: 3
    'center',  // z-index: 2
    'lowest'   // z-index: 1
);
```


### 3.8 - [Text] Sizes

Hillcss comes not only with Layout helpers, **Text** is another Part of Hillcss. With a predefined Map of different Font-Sizes and the corresponding HTML and Sass API you can keep the font sizes of your project consistent.

On the other hand, Hillcss has a set of HTML API alignment helper that are enabled in combination with text-helper.

* **Default** `(small-3x: 0.8rem, small-2x: 0.9rem, base: 1rem, large-2x: 1.2rem, large-3x: 1.4rem)`
* **Type** Map
* **HTML API** Disabled by Default `$hill-text-helper-css-output: false !default;`

**Sass Config**
```sass
$hill-text-sizes: (
    micro: 0.8rem,
    mini:  0.9rem,
    base:    1rem,
    large:   2rem,
    giant:   5rem
);

$hill-text-helper-css-output: true; // To render HTML API helper
```

**Sass API**

* `hill-text-is($size)`

```sass
.example {
    font-size: hill-text-is(large-3x);
}
```

**HTML API**

* `{font-size}`
* `left`
* `right`
* `center`

```html
<h3 hill-text="large-3x right">...</h3>
```


### 3.9 - [Text] Root Font-Size

For REM calculation it is up to you to change the root `font-size` of your project. Hillcss has a Sass Pixel to Rem calculation function on Board.

* **Default** `16px`
* **Type** Number

**Sass Config**
```sass
$hill-text-root: 14px;
```

**Sass API**

* `rem($pixel, $root: $hill-text-root)`

```sass
.example {
    width: rem(200px);          // width: 12.5rem;
    padding: rem(10) rem(20);   // padding: 0.625rem 1.25rem;
}
```



