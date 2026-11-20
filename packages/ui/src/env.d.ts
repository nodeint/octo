/** Bundlers replace `process.env.NODE_ENV` at build time; this package ships no Node types. */
declare const process: { env: { NODE_ENV?: string } };
