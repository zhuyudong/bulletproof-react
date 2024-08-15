# README

## playwright

### polyfill

```sh
pnpm exec playwright install
```

### output

```sh
pnpm exec playwright show-report
```

## 总结

1. 如果没有 .eslintignore 则 eslint 会默认不对 .xxx 形式的文件夹内的文件起作用
2. `window.btoa` 需要 `encodeURIComponent`，`window.atob` 需要 `decodeURIComponent`
3. `at-rule-no-unknown` [解决方案](https://byby.dev/at-rule-tailwind)
