((document, window, entries, isArray, style, script) => {
  const sAttr = (element) => (attr, value) => {
    element.setAttribute(attr, value);
  };

  const isStyleFn = (entry) => entry.type == style || /css$/.test(entry.src);

  const getURLs = (exts) => {
    const toObj = (arg) => {
      if (typeof arg == 'object') {
        return arg;
      }

      return {
        src: arg,
      };
    };

    // If argument is a string or object
    if (!isArray(exts)) {
      return [[toObj(exts)]];
    }

    // If argument is one dimensional array
    if (!isArray(exts[0])) {
      return [exts.map(toObj)];
    }

    // if argument is two dimensional array
    return exts.map((extsSub) => extsSub.map(toObj));
  };

  const load = (exts, cb) => {
    const loadC = (urls) => {
      const sources = urls.shift();

      if (!sources) {
        if (cb) {
          return cb();
        }

        return;
      }

      let chLen = sources.length;

      sources.map((source) => {
        const isStyle = isStyleFn(source);

        const element = document.createElement(isStyle ? 'link' : script);
        const s = sAttr(element);
        s(isStyle ? 'href' : 'src', source.src);

        if (isStyle) {
          s('rel', 'stylesheet');
          s('media', 'only x');
        }

        console.log(source.load);
        if (source.load) {
          entries(source.load).map(([key, value]) => {
            s(key, value);
          });
        }

        console.log('Add file:', source.src);
        (isStyle ? document.head : document.body).append(element);

        s.onload = () => {
          if (isStyle) {
            s.media = 'all';
          }

          chLen--;
          if (!chLen) {
            loadC(urls);
          }
        };

        s.onerror = (err) => {
          if (cb) {
            cb(err);
          }
        };
      });
    };

    loadC(getURLs(exts));
  };

  const preload = (exts, type = 'preload') => {
    getURLs(exts).map((urlsSub) => {
      urlsSub.map((source) => {
        const link = document.createElement('link');
        const s = sAttr(link);
        s('rel', type);
        s('href', source.src);
        s('as', isStyleFn(source) ? style : script);

        if (source.preload) {
          entries(source.preload).map(([key, value]) => {
            s(key, value);
          });
        }

        console.log(`Add ${type}: ${source.src}`);
        document.head.append(link);
      });
    });
  };


  window.asify = load;
  window.asify.preload = preload;
})(document, window, Object.entries, Array.isArray, 'style', 'script');
