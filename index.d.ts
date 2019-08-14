export type asifyURL = | string
  | {
      src: string;
      type?: string;
      preload?: Object<string, string>;
      load?: Object<string, string>;
    };

export type asifyURLs = asifyURL | asifyURL[] | asifyURL[][];

export as namespace asify;
export = asify;

declare function asify(args: asifyURLs, cb?: (error) => void): void;

declare namespace asify {
  function preload(args: asifyURLs, type?: string): void;
}
