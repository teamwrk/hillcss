<img align="right" height="150" src="/docs/assets/hill_logo.png?raw=true">

# Hillcss - A Sass Toolkit for Intuitive Layouting

[![Build Status](https://api.travis-ci.org/teamwrk/hillcss.svg?branch=master)](https://travis-ci.org/teamwrk/hillcss)
[![npm version](https://img.shields.io/npm/v/hillcss.svg)](https://www.npmjs.com/package/hillcss)

## 1 - Why hillcss

Layouting should be separate from project Module styling. So we decided to create a toolkit of Sass functions and Markup helpers to realise a layouting framework that is lightweight and can be used independently.

<img alt="Why Hillcss Schema" width="70%" src="/docs/assets/hill_why.png?raw=true">

Hillcss covers all basic aspects of modern CSS layouting and it has also even more advantages:

* Fits perfectly into your project
* No more custom layouting
* Generates only that parts you need
* Very Lightweight 0.5KB (Full Configuration, GZip)
* A simple and intuitive Grid-System
* Helpers for both Sass and HTML
* Well thought out by developers for developers

## 2 - Get hillcss

```cli
$ npm i hillcss --save
```

## 3 - Use hillcss

Now load Hillcss into your Sass project. Load `hill-api.scss` instead of `hill.scss` file in order to use only the Sass API.

```sass
@import 'node_modules/hill/hill';
```

### 3.1 - Hillcss Configuration

Hillcss is splitted into different Parts. Each of this parts can be configured independently. Now, the first step is to configure Hillcss properly to fit into yout project.
The following _Scss_ configuration variables are defined globally and without a `!default` flag to overwrite the Hillcss defaults.

**All parameters are optional and not required!**

### 3.1.1 - HTML Prefix / Namespace

**$hill-html-prefix: hill !default;**

It is up to you how to call you layouting tool:

**Scss Configuration:**
```sass
$hill-html-prefix: myProject;
```

**HTML Usage:**
```html
<div myProject-layout="space-bottom">...</div>
<p myProject-text="center">...</p>
```

### 3.1.2 - Layout Boxes

<img alt="Hill Layout Boxes" width="50%" src="/docs/assets/hill_layout_boxes.png?raw=true">

We decided to use a Grid System based on fractions not based on percentage.

**Scss Configuration:**
```sass
$hill-layout-boxes: (
    '1/4',
    '1/2',
    '3/4',
    '1/1');
```

**HTML Usage:**
```html
<div myProject-layout="box-1/3">...</div>
```








