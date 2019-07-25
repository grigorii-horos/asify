<h1 align="center">Welcome to asify 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/asify.svg">
  <a href="https://github.com/horosgrisa/asify">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/horosgrisa/asify/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Async loader for srcript and styles

### 🏠 [Homepage](https://github.com/horosgrisa/asify)

## Install

```sh
npm install asify
```

## Usage

#### Load Single file

```js
loadExternal('http://example.com/script.js');
```
#### Preload Single file

```js
preloadExternal('http://example.com/script.js');
```

#### Array of files

```js
loadExternal([ // Or preloadExternal
  'http://example.com/script.js',
  'http://example.com/style.css',
]);
```

Files will be loaded async

#### Array of Arrays of files

```js
loadExternal([ // Or preloadExternal
  [
    'http://example.com/pre.js',
    'http://example.com/pre.css',
  ], [
    'http://example.com/post.js',
    'http://example.com/post.css',
  ],
]);
```

`pre`-files will be loaded async, and after that will be loaded async `post`-files

#### Callbacks

```js
preloadExternal('http://example.com/script.js', error => console.log(error));
loadExternal('http://example.com/script.js', error => console.log(error));
```

#### Source Object 

Instead of string with URL, you can provide object

```js
loadExternal({ // Or preloadExternal
  src: 'http://example.com/script',
  type: 'script',
  load: { crossorigin: 'anonymous' },
  preload: { crossorigin: 'anonymous' },
});
```

Params

* `src` - link to files
* `type` - if type of file can't be detected from `src`, you need to provide `type` param
* `load` - params for `script` or `link` tags when you load files
* `preload` - params for `<meta rel="preload" >` tag when you preload files

## Author

👤 **Grigorii Horos**

* Github: [@horosgrisa](https://github.com/horosgrisa)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/horosgrisa/asify/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Grigorii Horos](https://github.com/horosgrisa).<br />
This project is [MIT](https://github.com/horosgrisa/asify/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
