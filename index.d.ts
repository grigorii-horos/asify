type loaderURL =
  | string
  | {
      src: string;
      type?: string;
      preload?: Object;
      load?: Object;
    };

type loaderArg = loaderURL | loaderURL[] | loaderURL[][];

export function asify(exts: loaderArg, cb?: Function): any;

export namespace asify {
  function preload(exts: loaderArg, type?: "prefetch" | string): void;
}
