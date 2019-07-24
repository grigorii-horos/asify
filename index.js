/* eslint-disable no-plusplus,consistent-return,func-names,no-underscore-dangle,max-len,no-shadow,no-param-reassign */

/**
 * @module index
 * This is scripts loader.
 * It load scripts one by one in order to keep the startup order.
 * For performance it create `<link type="preload">` tags
 * who will preload all scripts using paralell download.
 *
 */


/**
 *
 * @param {string[]} URLs
 * @param {string} type
 * @returns {undefined}
 */
function preloadExternal(externals, type, baseURL) {
  if (typeof externals === 'string') {
    if (!type) {
      type = /css/.test(externals) ? 'style' : 'script';
    }
    externals = [[externals]];
  }

  type = type || 'script';
  baseURL = baseURL || '';

  externals.forEach(function fn(externalsSub) {
    externalsSub.forEach(function fn(script) {
      var script_ = Array.isArray(script) ? script[0] : script;
      var link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('href', script_.startsWith('/') ? baseURL + script_ : script_);
      link.setAttribute('as', type);
      if (Array.isArray(script) && script[2]) {
        script[2].forEach(function fn(atribute) {
          link.setAttribute(atribute[0], atribute[1]);
        });
      }
      document.head.append(link);
    });
  });
}


function loadExternal(externals, config, callback) {
  var type;
  var baseURL;
  if (typeof externals === 'string') {
    type = /css/.test(externals) ? 'style' : 'script';
    externals = [[externals]];
  }

  if (typeof config === 'function') {
    callback = config;
    type = type || 'script';
    baseURL = '';
  } else if (typeof config === 'string') {
    type = config;
    baseURL = '';
  } else if (typeof config === 'object') {
    type = config.type || (type || 'script');
    baseURL = config.baseURL || '';
  } else {
    type = type || 'script';
    baseURL = '';
  }

  function load(externals) {
    var sources = externals.shift();
    var chunkLenght;

    if (!sources) {
      return callback ? callback(false) : false;
    }
    chunkLenght = sources.length;


    sources.forEach(function fn(source) {
      var s = document.createElement(type === 'script' ? 'script' : 'link');
      var source_ = Array.isArray(source) ? source[0] : source;
      source_ = source_.startsWith('/') ? baseURL + source_ : source_;
      s.setAttribute(type === 'script' ? 'src' : 'href', source_);

      if (type === 'style') {
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('media', 'none');
      }

      if (Array.isArray(source) && source[1]) {
        source[1].forEach(function fn(atribute) {
          s.setAttribute(atribute[0], atribute[1]);
        });
      }

      if (type === 'script') {
        console.log('Add script:', source_);
        document.body.append(s);
      }
      if (type === 'style') {
        console.log('Add style:', source_);
        document.head.append(s);
      }

      s.addEventListener('load', function fn() {
        if (type === 'style') {
          s.media = 'all';
        }
        chunkLenght--;
        if (!chunkLenght) {
          load(externals);
        }
      });

      s.addEventListener('error', function fn() {
        callback(new Error('Can\'t load ' + source_ + '. Try to reload page'));
      });
    });
  }

  load(externals);
}

if (typeof window !== 'undefined') {
  window.loadExternal = loadExternal;
  window.preloadExternal = preloadExternal;
}

if (typeof module !== 'undefined') {
  module.exports.loadExternal = loadExternal;
  module.exports.preloadExternal = preloadExternal;
}
