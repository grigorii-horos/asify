// @ts-ignore
(function(w, d, scriptStr, styleStr, isArray) {
  function sAttr(element, attr, value) {
    element.setAttribute(attr, value);
  }

  function isStyleFn(entry) {
    return entry.type == styleStr || /css$/.test(entry.src);
  }

  function getURLs(exts) {
    function toObj(arg) {
      if (typeof arg == "object") {
        return arg;
      }
      return {
        src: arg
      };
    }

    // If argument is a string or object
    if (!isArray(exts)) {
      return [[toObj(exts)]];
    }

    // If argument is one dimensional array
    if (!isArray(exts[0])) {
      return [exts.map(toObj)];
    }

    // if argument is two dimensional array
    return exts.map(function(extsSub) {
      return extsSub.map(toObj);
    });
  }

  function load(exts, cb) {
    var urls = getURLs(exts);

    function loadC(urls) {
      var sources = urls.shift();
      if (!sources) {
        if (cb) {
          return cb();
        }
        return;
      }

      var chLen = sources.length;

      sources.map(function(source) {
        var key;
        var load = source.load;
        var isStyle = isStyleFn(source);

        var s = d.createElement(isStyle ? "link" : scriptStr);
        sAttr(s, isStyle ? "href" : "src", source.src);

        if (isStyle) {
          sAttr(s, "rel", "stylesheet");
          sAttr(s, "media", "only x");
        }

        if (load) {
          // eslint-disable-next-line no-restricted-syntax
          for (key in load) {
            // eslint-disable-next-line no-prototype-builtins
            if (load.hasOwnProperty(key)) {
              sAttr(s, key, load[key]);
            }
          }
        }

        console.log("Add file:", source.src);
        (isStyle ? d.head : d.body).append(s);

        s.onload = function() {
          if (isStyle) {
            s.media = "all";
          }
          chLen--;
          if (!chLen) {
            loadC(urls);
          }
        };

        s.onerror = function(err) {
          if (cb) {
            cb(err);
          }
        };
      });
    }

    loadC(urls);
  }

  function preload(exts, type) {
    var urls = getURLs(exts);

    urls.map(function(urlsSub) {
      urlsSub.map(function(source) {
        var key;
        var preload = source.preload;

        var link = d.createElement("link");
        sAttr(link, "rel", type || "preload");
        sAttr(link, "href", source.src);
        sAttr(link, "as", isStyleFn(source) ? styleStr : scriptStr);

        if (preload) {
          // eslint-disable-next-line no-restricted-syntax
          for (key in preload) {
            // eslint-disable-next-line no-prototype-builtins
            if (preload.hasOwnProperty(key)) {
              sAttr(link, key, preload[key]);
            }
          }
        }

        console.log("Add " + (type || "preload") + ":", source.src);
        d.head.append(link);
      });
    });
  }

  w.asify = load;
  w.asify.preload = preload;
})(window, document, "script", "style", Array.isArray);
