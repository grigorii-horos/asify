(function fn(w) {
  const d = w.document;
  const crEl = d.createElement.bind(d);
  const head = d.head;
  const body=d.body
  const isArray = Array.isArray;
  const scriptStr = 'script';
  const styleStr = 'style';
  const stringStr = 'string';

  const sAttr = (element, attr, value) => {
    element.setAttribute(attr, value);
  };

  const isStyleFn = entry => entry.type === styleStr || /css$/.test(entry.src);

  const getURLs = (exts) => {
    const srcToObj = string => ({
      src: string,
    });

    const arrToObj = arr => arr.map((arr2) => {
      if (typeof arr2 === stringStr) {
        return srcToObj(arr2);
      }
      return arr2;
    });

    if (typeof exts === stringStr) {
      return [[
        srcToObj(exts),
      ]];
    }

    if (!isArray(exts) && typeof exts === 'object') {
      return [[
        exts,
      ]];
    }

    if (isArray(exts) && !isArray(exts[0])) {
      return [
        arrToObj(exts),
      ];
    }

    if (isArray(exts) && isArray(exts[0])) {
      return exts.map(externals_ => arrToObj(externals_));
    }
    return [[]];
  };

  const preloadExternal = (exts) => {
    const urls = getURLs(exts);


    urls.forEach((urlsSub) => {
      urlsSub.forEach((source) => {
        const { src, preload } = source;

        const isStyle = isStyleFn(source);

        const link = crEl('link');
        sAttr(link, 'rel', 'preload');
        sAttr(link, 'href', src);
        sAttr(link, 'as', isStyle ? styleStr : scriptStr);

        if (preload) {
          for (const key in preload) {
            sAttr(link, key, preload[key]);
          }
        }

        console.log('Add preload:', src);
        head.append(link);
      });
    });
  };

  const loadExternal = (exts, cb) => {
    if (!cb) {
      cb = () => {};
    }
    const urls = getURLs(exts);

    const loadC = (urls) => {
      const sources = urls.shift();

      if (!sources) {
        return cb();
      }
      let chLen = sources.length;


      sources.map((source) => {
        const { src, load } = source;
        const isStyle = isStyleFn(source);

        const s = crEl(isStyle ? 'link' : scriptStr);
        sAttr(s, isStyle ? 'href' : 'src', src);

        if (isStyle) {
          sAttr(s, 'rel', 'stylesheet');
          sAttr(s, 'media', 'none');
        }

        if (load) {
          for (const key in load) {
            sAttr(s, key, load[key]);
          }
        }

        console.log('Add file:', src);
        (isStyle ? head : body).append(s);

        s.addEventListener('load', () => {
          if (isStyle) {
            s.media = 'all';
          }
          chLen--;
          if (!chLen) {
            loadC(urls);
          }
        });

        s.addEventListener('error', (err) => {
          cb(err);
        });
      });
    };

    loadC(urls);
  };

  // commonjs
  if (typeof exports !== 'undefined') {
    exports.preloadExternal = preloadExternal;
    exports.loadExternal = loadExternal;
  } else {
    w.preloadExternal = preloadExternal;
    w.loadExternal = loadExternal;
  }
}(typeof global !== "undefined" ? global : window));
