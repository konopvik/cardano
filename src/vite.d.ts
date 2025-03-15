/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_DEFAULT_ADDRESS: string;
  readonly VITE_IPFS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
