---
title:
  en-US: bid compontent
  zh-CN: 投标组件
subtitle: 投标组件
cols: 1
order: 12
---

作为投标的入口。

## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| type | 类型，不同类型自带对应的图标 | Enum {'success', 'error'} | - |
| title       | 标题     | ReactNode  | -    |
| description | 结果描述    | ReactNode  | -    |
| extra       | 补充信息，有默认的灰色背景     | ReactNode  | -    |
| actions     | 操作建议，推荐放置跳转链接，按钮组等    | ReactNode  | -    |
