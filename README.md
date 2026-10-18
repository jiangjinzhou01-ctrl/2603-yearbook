# 2603 同学录

把日常，留成以后。

本版只包含首页与下滑后的「敬请期待」。原生页面滚动，支持手机轻扫、桌面滚轮、触控板与键盘。不设下一页、下一步、拖拽把手、长按按钮或空链接。

## 设计与实现

纸白与钴蓝的数字纪念册。中文主标题、班级大字、校园相片和蓝色手记构成封面。相片以不同速度随滚动轻微展开；回滑时动画可逆。系统减少动态效果开启时关闭入场动画与视差，内容始终可读。系统深色模式自动匹配。

纯 HTML / CSS / JavaScript，GitHub Pages 根目录部署。运行时不请求第三方字体、CDN、接口或付费服务；没有埋点、数据库和个人数据。

```sh
npm ci
npm run build
npm run check
```

构建后的 `assets/app.js` 已提交，GitHub Pages 无需安装依赖或打包。直接使用 `main` 分支根目录。

## 开源研究与选型

| 项目 | 许可证 | 本版用途与取舍 |
| --- | --- | --- |
| [Motion](https://github.com/motiondivision/motion) 12.43.0 | MIT | 使用 `animate`、`scroll` 关联滚动进度与 transform/opacity。按需打包、本地托管，新增减少动态效果切换与销毁清理。未修改上游源码。许可证保留在 `assets/MOTION-LICENSE.txt`。 |
| [esbuild](https://github.com/evanw/esbuild) 0.25.12 | MIT | 开发阶段打包、压缩与 tree shaking，不在运行时加载。 |
| [Lenis](https://github.com/darkroomengineering/lenis) | MIT | 研究后未引入。本版原生惯性滚动已经符合触摸体验，无需再加入平滑滚动层。 |

## 后续沿用

- 颜色、字号、页面间距与暗色模式统一在 `style.css` 的 tokens 中维护。
- 本版班级信息：`index.html` 的页头、主视觉数字与页脚。
- 后续同学详情、照片与留言沿用同一套色彩、纸张边缘、排版、间距和动效原则，再替换「敬请期待」章节。
- 当前图片是 AI 生成的校园意象，并非本班实拍。可将 `assets/classroom.webp` 与 `assets/sky.webp` 替换为班级素材，维持 3:2 比例。图片源文件不依赖外站。
- 尚未实现后续同学录资料、存储或上传功能，页面没有假入口。

## 图片来源与生成说明

使用内置 imagegen 生成两张网站专用的氛围图片，再转为 WebP 做体积优化。没有使用实际同学肖像。

教室提示词：An empty ordinary Chinese secondary vocational school classroom in late afternoon, vivid clean cobalt-blue sky outside large open windows, leafy trees, simple wooden desks, open exercise book in foreground, sheer white curtains gently lifted by wind, honey-colored sunlight and cinematic soft shadows, subtle 35mm film texture. Landscape 3:2. No people, readable writing, logos or watermarks. Illustrative atmosphere, not an actual known school.

蓝天提示词：A white folded paper airplane seen from slightly below, flying against a clear cobalt blue summer sky and fluffy white clouds, a distant corner of a school rooftop and lush green tree canopy at the bottom edge. Landscape 3:2, analog 35mm snapshot. No people, text, watermarks or borders.
