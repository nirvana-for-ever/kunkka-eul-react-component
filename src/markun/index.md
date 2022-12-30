# markun
可供 `react` 使用的 `md` 编辑器，包括基础 `md` 编辑器功能，还有目录、`mermaid` 等功能

## 简单应用
```tsx
import React from 'react';
import Markun from './';

const Demo: React.FC = () => {
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <Markun onImgUpload={async(file) => {
        // 上传图片
        return 'myurl';
      }}
      />
    </div>
  );
}

export default Demo;

```

## API
| 配置项 | 说明 | 默认值 | 类型 |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | 编辑器默认主题 | `darcula` | `string` |
| `defaultHighlight` | 预览区代码高亮主题 | `oneDark` | `string` |
| `onImgUpload` | 图片上传回调 | `undefined` | `(file: File) => Promise<string>` 方法返回值需要返回图片地址 |
| `fullScreen` | 全屏事件 | 原生 `js` 全屏 | `() => void` |
