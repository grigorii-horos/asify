const { isArray } = Array;
const d = document;
const crEl = d.createElement.bind(d);
const { head, body } = d;
let g = null;

if (typeof window !== 'undefined') {
  g = window;
}

if (typeof module !== 'undefined') {
  g = module.exports;
}

const types = ({ src, type }) => {
  let css; let
    js;
  if (type) {
    js = type === 'script';
    css = type === 'style';
  } else {
    const b = /css/.test(src);
    css = b;
    js = !b;
  }
  return { js, css };
};

const getURLs = (exts) => {
  const srcToObj = string => ({
    src: string,
    load: {},
    preload: {},
  });

  const arrToObj = arr => arr.map((arr2) => {
    if (typeof arr2 === 'string') {
      return srcToObj(arr2);
    }
    return arr2;
  });

  if (typeof exts === 'string') {
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

      const { js } = types(source);

      const link = crEl('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('href', src);
      link.setAttribute('as', js ? 'script' : 'style');

      if (preload) {
        Object.entries(preload).forEach(([key, value]) => {
          link.setAttribute(key, value);
        });
      }

      console.log('Add preload:', src);
      head.append(link);
    });
  });
};

const loadExternal = (exts, callback = () => true) => {
  const urls = getURLs(exts);

  const loadC = (urls) => {
    const sources = urls.shift();

    if (!sources) {
      return callback();
    }
    let chLen = sources.length;


    sources.map((source) => {
      const { src, load } = source;
      const { css, js } = types(source);


      const s = crEl(js ? 'script' : 'link');
      s.setAttribute(js ? 'src' : 'href', src);

      if (css) {
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('media', 'none');
      }

      if (load) {
        Object.entries(load).map(([key, value]) => s.setAttribute(key, value));
      }
      s.m = s.media || 'all';

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
          s.media = s.m;
        }
        chLen--;
        if (!chLen) {
          loadC(urls);
        }
      });

      s.addEventListener('error', () => {
        callback(new Error(`Can't load ${src}. Try to reload page`));
      });
    });
  };

  loadC(urls);
};


if (g) {
  g.loadExternal = loadExternal;
  g.preloadExternal = preloadExternal;
}
