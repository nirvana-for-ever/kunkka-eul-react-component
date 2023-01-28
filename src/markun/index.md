# Markun
可供 `react` 使用的 `md` 编辑器，包括基础 `md` 编辑器功能，还有目录、`mermaid` 等功能

## 简单应用
编辑和保存功能，保存功能通过 `ref` 来实现，`getHtml` 方法可以获取 `md` 渲染后的 `html` 代码
`md` 源码则保存在 `code` 中，可以根据实际需求保存内容
<code src="./demo/SimpleDemo.tsx"></code>

## 生成目录
保存了 `html` 之后，不使用 `Markun` 的时候如何生成目录?
通过提供的 `CateHelper` 帮助类来生成目标 `dom` 对应的目录的 `html` 代码
通过 `CateHelper` 的 `generateCate` 方法可以生成目录 `dom` 元素，通过 `appendChild` 添加到自定义的容器当中
<code src="./demo/CateDemo.tsx"></code>

## 不保存 `html` , 使用 `md` 进行渲染
若不想在数据库中保存 `html` 内容，可以使用提供的 `Renderer` 组件传入 `md` 源码即可渲染，
可搭配 `CateHelper` 一起使用
<code src="./demo/RendererDemo.tsx"></code>

## Markun
| 配置项 | 说明 | 默认值 | 类型 |
| :--- | :--- | :--- | :--- |
| `code` | `md` 源码 | 必填 | `string` |
| `onCodeChange` | `md` 改变回调 | 必填 | `(code: string) => void` |
| `defaultTheme` | 编辑器默认主题 | `darcula` | `string` |
| `defaultHighlight` | 预览区代码高亮主题 | `oneDark` | `string` |
| `onImgUpload` | 图片上传回调 | `undefined` | `(file: File) => Promise<string>` 方法返回值需要返回图片地址 |
| `fullScreen` | 全屏事件 | 原生 `js` 全屏 | `() => void` |

### Ref
| 配置项 | 说明 | 类型 |
| :--- | :--- | :--- |
| `getHtml` | 获取渲染后的 `html` 代码 | `() => string` |

## CateHelper
构造函数参数
| 配置项 | 说明 | 默认值 | 类型 |
| :--- | :--- | :--- | :--- |
| `root` | 需要生成目录的 `html` 根元素 | 必填 | `HTMLElement` |
| `toTop` | 跳转后目标元素距离顶部距离 | 0 | `number` |

## Renderer
| 配置项 | 说明 | 默认值 | 类型 |
| :--- | :--- | :--- | :--- |
| `code` | `md` 源码 | 必填 | `string` |
| `highlight` | 代码高亮主题 | `oneDark` | `string` |
| `onRenderFinished` | 渲染完毕回调 | `undefined` | `() => void` |

### Ref
| 配置项 | 说明 | 类型 |
| :--- | :--- | :--- |
| `root` | 获取 `Renderer` 组件的根元素 `dom` | `HTMLDivElement \| null` |
