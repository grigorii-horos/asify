Welcome to asify
===
![Version](https://img.shields.io/github/package-json/v/horosgrisa/asify.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/horosgrisa/asify#readme)
[![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)](https://github.com/horosgrisa/asify/graphs/commit-activity)
[![License: GPL-3.0](https://img.shields.io/github/license/horosgrisa/asify.svg)](https://github.com/horosgrisa/asify/blob/master/LICENSE)
![Downloads](https://img.shields.io/npm/dw/asify.svg)

> Async loader for srcript and styles.
> Only 962 bytes for `min.js` or 527 bytes for commpresed file!!!

### [Homepage](https://github.com/horosgrisa/asify)

## Install

```sh
npm install asify
```

```js
const asify = require('asify');
```

Or use script from CDN;

```html
<script src="https://cdn.jsdelivr.net/npm/asify@2.0.13/index.js"></script>
```

## Usage

#### Load Single file

```js
asify('http://example.com/script.js');
```

#### Preload Single file

```js
asify.preload('http://example.com/script.js');
```

#### Prefetch Single file

```js
asify.preload('http://example.com/script.js', 'prefetch');
```

#### Array of files

```js
asify([ // Or asify.preload
  'http://example.com/script.js',
  'http://example.com/style.css',
]);
```

Files will be loaded async

#### Array of Arrays of files

```js
asify([ // Or asify.preload
  [ // These files will be loader first
    'http://example.com/pre.js',
    'http://example.com/pre.css',
  ], [ // These files will be loaded after
    'http://example.com/post.js',
    'http://example.com/post.css',
  ],
]);
```

#### Callbacks

```js
asify.preload('http://example.com/script.js', error => console.log(error));
asify('http://example.com/script.js', error => console.log(error));
```

#### Source Object 

Instead of string with URL, you can provide object

```js
asify({ // Or asify.preload
  src: 'http://example.com/script', //Link to file
  type: 'script',  // File type, if it can't be detected from `src`
  load: { crossorigin: 'anonymous' }, // params for `script` or `link` tags 
  preload: { crossorigin: 'anonymous' }, // params for `<meta rel="preload" >` tag for preload
});
```

## Author

**Grigorii Horos**

* Github: [@horosgrisa](https://github.com/horosgrisa)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/horosgrisa/asify/issues).

## Show your support

Give a star if this project helped you!

## License

Copyright © 2019 [Grigorii Horos](https://github.com/horosgrisa).<br />
This project is [MIT](https://github.com/horosgrisa/asify/LICENSE) licensed.

***
_This README was generated with love by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
