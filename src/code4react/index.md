# code4react
可供 `react` 使用的代码编辑器，可以自定义主题

## 简单应用
<code src="./demo/SimpleDemo.tsx"></code>

## 提示代码
需要引入对应的提示代码包，同时要添加 `onChangeRaw` 回调
<code src="./demo/HintDemo.tsx"></code>

## API
| 配置项 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `code` | 代码内容 | `''` |
| `options` | 参考 `codemirror5` | 见下面 |
| `onChange` | 代码内容发生改变的回调 | `undefined` |
| `onChangeRaw` | `codemirror5` 原生 `change` 事件 | `undefined` |

### 默认 options
```js
const basicOptions = {
  tabSize: 2,
  theme: 'darcula', // 需要引入对应的主题css
  lineNumbers: true, // 代码行号
  line: true, // 代码出错提醒
  readOnly: false,
  matchBrackets: true, // 匹配括号
  autoCloseBrackets: true, // 补全括号
  autoCloseTags: true, // 补全标签
  hintOptions: {
    completeSingle: false // 提示只剩一个选项是自动填充，体验不好，最好去掉
  }
};
```

更多配置项参考 [codemirror5](https://codemirror.net/5/doc/manual.html#config)

### ref
通过绑定 `ref` 可以获取 `CodeMirror` 实例，进行更多自定义的操作
```ts
export interface Code4ReactRef {
  cmInstance: any;
  textarea: HTMLTextAreaElement | null;
}
```


