const d = document;
let g = null;

if (typeof window !== 'undefined') {
  g = window;
}

if (typeof module !== 'undefined') {
  g = module.exports;
}


const f = () => {
  const crEl = d.createElement.bind(d);
  const { head, body } = d;
  const { isArray } = Array;
  const scriptStr = 'script';
  const styleStr = 'style';
  const stringStr = 'string';

  const sAttr = (element, attr, value) => {
    element.setAttribute(attr, value);
  };

  const types = (entry) => {
    if (entry.type) {
      return {
        js: entry.type === scriptStr,
        css: entry.type === styleStr,
      };
    }
    const isStyle = /css$/.test(entry.src);
    return {
      css: isStyle,
      js: !isStyle,
    };
  };

  const getURLs = (exts) => {
    const srcToObj = string => ({
      src: string,
      load: {},
      preload: {},
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

  const p = (exts) => {
    const urls = getURLs(exts);


    urls.forEach((urlsSub) => {
      urlsSub.forEach((source) => {
        const { src, preload } = source;

        const { js } = types(source);

        const link = crEl('link');
        sAttr(link, 'rel', 'preload');
        sAttr(link, 'href', src);
        sAttr(link, 'as', js ? scriptStr : styleStr);

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

  const l = (exts, cb) => {
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
        const { css, js } = types(source);


        const s = crEl(js ? scriptStr : 'link');
        sAttr(s, js ? 'src' : 'href', src);

        if (css) {
          sAttr(s, 'rel', 'stylesheet');
          sAttr(s, 'media', 'none');
        }

        if (load) {
          for (const key in load) {
            sAttr(s, key, load[key]);
          }
        }

        if (js) {
          console.log('Add script:', src);
          body.append(s);
        }
        if (css) {
          console.log('Add style:', src);
          head.append(s);
        }

        s.addEventListener('load', () => {
          if (css) {
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

  return [p, l];
};
const fs = f();

if (g) {
  g.preloadExternal = fs[0];
  g.loadExternal = fs[1];
}
