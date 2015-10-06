# hill.css

A sass toolkit for intuitive layouting

## Get hill

@todo

## Use hill

Hill perfectly fits into your project and generates only that parts you need.
At first, import the hill SCSS file into your project:

```
@import 'node_modules/hill/hill';
```

Then, control hill, by overwriting the default settings. For example, choose another namespace:

```
$hill-layout-namespace: prj-name-layout;
```

Griddl - Known Bugs:
- Last empty row can be deleted
- Empty rows have no margin bottom to 'filled' rows
- No box add limitations


Griddl - Features:
- static grid and breakpoint. it can be done dynamically
