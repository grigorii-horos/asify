type loaderURL = string| {
  src:string,
  type?:string,
  preload?:Object.<string,string>,
  load?:Object.<string,string>,
} 

type loaderArg = loaderURL | loaderURL[] | loaderURL[][]

declare function preloadExternal (urls:loaderArg, callback?:(error)=>void): void
declare function loadExternal (urls:loaderArg, callback?:(error)=>void): void
