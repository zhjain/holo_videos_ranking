declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 在这里定义其他的环境变量
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
