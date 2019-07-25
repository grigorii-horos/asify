(function (w) {
  var d = w.document;
  var crEl = d.createElement.bind(d);
  var head = d.head;
  var body = d.body;
  var scriptStr = 'script';
  var styleStr = 'style';
  var stringStr = 'string';

  function sAttr(element, attr, value) {
    element.setAttribute(attr, value);
  }

  function isStyleFn(entry) {
    return entry.type === styleStr || /css$/.test(entry.src);
  }

  function getURLs(exts) {
    function srcToObj(string) {
      return {
        src: string
      };
    }

    function arrToObj(arr) {
      return arr.map(function (arr2) {
        if (typeof arr2 === stringStr) {
          return srcToObj(arr2);
        }
        return arr2;
      });
    }

    if (typeof exts === stringStr) {
      return [[
        srcToObj(exts)
      ]];
    }

    if (typeof exts === 'object' && !exts[0]) {
      return [[
        exts
      ]];
    }

    if (!exts[0]) {
      exts = [exts];
    }

    return exts.map(function (externals_) { return arrToObj(externals_); });
  }

  function preloadExternal(exts, type) {
    var urls = getURLs(exts);


    urls.map(function (urlsSub) {
      urlsSub.map(function (source) {
        var key;
        var src = source.src;
        var preload = source.preload;

        var isStyle = isStyleFn(source);

        var link = crEl('link');
        sAttr(link, 'rel', type || 'preload');
        sAttr(link, 'href', src);
        sAttr(link, 'as', isStyle ? styleStr : scriptStr);

        if (preload) {
          for (key in preload) {
            sAttr(link, key, preload[key]);
          }
        }

        console.log('Add ' + (type || 'preload') + ':', src);
        head.append(link);
      });
    });
  }

  function loadExternal(exts, cb) {
    var urls = getURLs(exts);

    function loadC(urls) {
      var sources = urls.shift();
      if (!sources) {
        return cb ? cb() : true;
      }
      var chLen = sources.length;

      sources.map(function (source) {
        var key;
        var src = source.src;
        var load = source.load;
        var isStyle = isStyleFn(source);

        var s = crEl(isStyle ? 'link' : scriptStr);
        sAttr(s, isStyle ? 'href' : 'src', src);

        if (isStyle) {
          sAttr(s, 'rel', 'stylesheet');
          sAttr(s, 'media', 'none');
        }

        if (load) {
          for (key in load) {
            sAttr(s, key, load[key]);
          }
        }

        console.log('Add file:', src);
        (isStyle ? head : body).append(s);

        s.onload = function () {
          if (isStyle) {
            s.media = 'all';
          }
          chLen--;
          if (!chLen) {
            loadC(urls);
          }
        };

        s.onerror = function (err) {
          cb && cb(err);
        };
      });
    }

    loadC(urls);
  }


  w.preloadExternal = preloadExternal;
  w.loadExternal = loadExternal;
}(window));
