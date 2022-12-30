import React, { useState } from 'react';
import Code4React from '../code4react';
// require styles
import 'codemirror/lib/codemirror.css';
// 编程语言包，这里以 js 为例子
import 'codemirror/mode/javascript/javascript';
// 引入主题文件 css，这里使用 idea 的 darcula
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/edit/matchbrackets'; // 匹配括号
import 'codemirror/addon/edit/closebrackets'; // 补全括号
import 'codemirror/addon/edit/closetag'; // 补全标签

const options = {
  tabSize: 2,
  mode: 'javascript', // 需要引入对应的语言js文件
  theme: 'darcula', // 需要引入对应的主题css
  lineNumbers: true,
  line: true,
  readOnly: false,
  matchBrackets: true, // 匹配括号
  autoCloseBrackets: true, // 补全括号
  autoCloseTags: true, // 补全标签
  hintOptions: {
    completeSingle: false // 提示只剩一个选项是自动填充，体验不好，最好去掉
  }
}

const Demo: React.FC = () => {
  const [ code, setCode ] = useState('const name = \'zs\'\;');

  return (
    <div style={{ height: '400px' }}>
      <Code4React
        options={options}
        code={code}
        onChange={(text) => {
          setCode(text);
        }}
      />
    </div>
  );
}

export default Demo;
