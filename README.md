# 神秘寻宝之旅 · 挂网指南(无需本地执行)

页面就是一个单文件 `index.html`,**所有 CSS/JS 都内联**,因此任何静态托管都能直接用。
下面 4 种方式按"从最简单到最正式"排列,全部只用浏览器操作。

---

## 方案 A:Netlify Drop(最快,30 秒,无需命令行)

1. 打开 <https://app.netlify.com/drop>
2. 把 `d:\cxdownload\treasure-hunt` **整个文件夹**(或直接拖 `index.html`)拖进网页中间的方框
3. 上传完成后页面立刻给你一个链接,形如:
   `https://silly-fox-123abc.netlify.app`
4. 想永久保存 → 点 `Claim your site` / 用 GitHub 或邮箱登录(免费)

> 优点:不用注册即可先预览;支持 HTTPS;改文件重新拖一次就更新。

---

## 方案 B:GitHub Pages(正式,推荐长期使用)

1. 登录 <https://github.com/new> → 新建仓库,例如 `treasure-hunt`,选 **Public** → Create
2. 进仓库 → `Add file` → `Upload files` → 把 `index.html` 拖进去 → `Commit changes`
3. 仓库 → `Settings` → 左侧 `Pages`
   - **Source**:`Deploy from a branch`
   - **Branch**:`main` + `/ (root)` → `Save`
4. 等 30~60 秒,链接固定为:
   `https://<你的用户名>.github.io/treasure-hunt/`

> 更新方式:仓库里点 `index.html` → 铅笔图标编辑 → Commit,几秒后网页自动更新。

---

## 方案 C:GitHub Gist + htmlpreview(不建仓库,一条链接)

1. 打开 <https://gist.github.com>
2. 文件名填 `index.html`,把内容粘进去 → `Create public gist`
3. 打开 gist,点 `Raw`,复制地址(形如
   `https://gist.githubusercontent.com/用户名/xxxx/raw/…/index.html`)
4. 拼成:`https://htmlpreview.github.io/?<刚才复制的 Raw 地址>`

---

## 方案 D:在线编辑器(想边看边改代码)

| 平台 | 做法 | 链接形态 |
|---|---|---|
| CodePen | <https://codepen.io/pen> 粘贴 HTML(JS/CSS 可直接放 HTML 里) | `https://codepen.io/用户名/pen/xxxx` |
| JSFiddle | <https://jsfiddle.net> 粘贴到 HTML 面板 → Save | `https://jsfiddle.net/xxxx` |
| StackBlitz | <https://stackblitz.com/fork/static> 新建静态项目,替换 index.html | `https://stackblitz.com/edit/xxxx` |

> 这些平台的分享链接本身就是"挂网"结果,手机打开同样能看动画。

---

## 常见问题

- **为什么页面是空的 / 显示源码?** 文件必须叫 `index.html`(全小写),且托管根目录要有它。
- **想让动画更快/更慢?** 页面里改速度下拉框;或在 `root` 里改 `--speed` 默认值。
- **想换成真实接口?** 把 `api` 对象里的 `delay(...)` 换成 `fetch(...)`,整套 `async/await` 结构不用动。
