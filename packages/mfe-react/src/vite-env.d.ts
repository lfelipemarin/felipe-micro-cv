/// <reference types="vite/client" />

// ?inline CSS imports return the processed stylesheet as a plain string.
declare module '*.css?inline' {
  const css: string;
  export default css;
}
