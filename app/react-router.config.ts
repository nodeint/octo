import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // SPA mode: the Atlassian packages ship CommonJS files that cannot be bundled for SSR
  ssr: false,
  appDirectory: './src'
} satisfies Config;
