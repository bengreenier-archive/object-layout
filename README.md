# object-layout

[![Build Status](https://travis-ci.org/bengreenier/object-layout.svg?branch=master)](https://travis-ci.org/bengreenier/object-layout)

force a specific object layout in node

## How?

By taking advantage of the fact that most javascript engines layout objects
such that the properties exist in the order they are created.

## Install

Thats easy - just `npm install object-layout`.

## Use

Pass an un-layed-out object and a schema:
```
var objectLayout = require('object-layout');

// will result in {one: 1, two: 2, three: 3, four: 4}
objectLayout({
    one: 1,
    four: 4,
    two: 2,
    three: 3
}, {
    one: true,
    two: true,
    three: true,
    four: true
});
```

Pass a schema to create a layout function:
```
var objectLayout = require('object-layout');

var fn = objectLayout({
    one: true,
    two: true,
    three: true,
    four: true
});

// will result in {one: 1, two: 2, three: 3, four: 4}
fn({
    one: 1,
    four: 4,
    two: 2,
    three: 3
});
```

Ignore fields unreferenced by the schema (default):
```
var objectLayout = require('object-layout');

// will result in {one: 1, two: 2, three: 3, four: 4}
objectLayout({
    one: 1,
    four: 4,
    two: 2,
    three: 3,
    ten: 10
}, {
    one: true,
    two: true,
    three: true,
    four: true
});
```

Append fields unreferenced by the schema:
```
var objectLayout = require('object-layout');

// will result in {one: 1, two: 2, three: 3, four: 4, ten: 10}
objectLayout.append({
    one: 1,
    four: 4,
    two: 2,
    three: 3,
    ten: 10
}, {
    one: true,
    two: true,
    three: true,
    four: true
});
```

See more in [the tests](./test).

## License

MIT