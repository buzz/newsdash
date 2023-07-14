/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API base URL */
  readonly NEWSDASH_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
