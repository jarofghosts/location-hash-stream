# location-hash-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/location-hash-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/location-hash-stream)
[![npm install](https://img.shields.io/npm/dm/location-hash-stream.svg?style=flat-square)](https://www.npmjs.org/package/location-hash-stream)
[![npm version](https://img.shields.io/npm/v/location-hash-stream.svg?style=flat-square)](https://www.npmjs.org/package/location-hash-stream)
[![License](https://img.shields.io/npm/l/location-hash-stream.svg?style=flat-square)](https://github.com/jarofghosts/location-hash-stream/blob/master/LICENSE)

streaming interface to the window location hash

## example

Emits the location hash whenever it changes. Uses the
[hashchange event](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange)
under the hood, so browser support is dictated therein.

```javascript
const hashStream = require('location-hash-stream')

const stream = hashStream()

hashStream.on('data', data => console.log(data))

window.location.hash = 'lol'

// logs '#lol'
```

Writing to the stream sets the location hash.

```javascript
const hashStream = require('location-hash-stream')

const stream = hashStream()

hashStream.write('hash')

// window.location.hash is now '#hash'
```

## API

`hashStream([opts]) -> HashStream`

* `opts` is an optional configuration object. Available options are:
  - `stripHash` a `Boolean` specifying whether the emitted location hash should
    be stripped of its leading `#` character. Defaults to `false`.

* `HashStream.getHash()` -> Retrieve the current hash string, respects the
  `stripHash` parameter.

## license

MIT
