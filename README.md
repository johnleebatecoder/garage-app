# 掌上车库 · Pocket Garage

一个精致的汽车鉴赏 PWA —— Claude 暖色外壳 + 逐品牌深度定制模块。当前已完成 **Porsche 911（992.2）** 模块（历史 / 海报 / 纽北 / 引擎 / 规格），其余品牌锁定占位。

## 特点

- **完全自包含单文件**：React 已内联、JSX 已预编译，运行期零外部 CDN 依赖，断网可开。
- **可安装 PWA**：带 manifest + service worker + 图标，iOS Safari「添加到主屏幕」即全屏离线 App。
- 原创风格化 SVG 资产（911 侧影、水平对置六缸点火动画、纽北赛道图），视觉做成可替换 slot。

## 本地预览

```bash
python -m http.server 8080
# 浏览器打开 http://127.0.0.1:8080
```

## 说明

- `index.html` — 实际部署的自包含成品。
- `index.src.html`（未纳入版本库）— 含 JSX 的可编辑源码，改版式后需重新构建。
- 数据来源：Porsche AG / sport auto；个人鉴赏 demo，视觉为原创风格化。
