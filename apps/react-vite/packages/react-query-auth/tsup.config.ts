import type { Options } from 'tsup'

export default {
  entry: ['src/index.tsx'],
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  minify: true,
  clean: true
} satisfies Options
