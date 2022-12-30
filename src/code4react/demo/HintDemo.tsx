import React, { useState } from 'react';
import Code4React from '../code4react';
import { ignoreToken, timeout } from '../utils';
// require styles
import 'codemirror/lib/codemirror.css';
// language js
import 'codemirror/mode/javascript/javascript';
// theme css
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/edit/matchbrackets'; // 匹配括号
import 'codemirror/addon/edit/closebrackets'; // 补全括号
import 'codemirror/addon/edit/closetag'; // 补全标签
import 'codemirror/addon/hint/show-hint'; // 提示
import 'codemirror/addon/hint/show-hint.css'; // 提示样式
import 'codemirror/addon/hint/javascript-hint'; // 引入对应语言的提示包

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
}

const Demo: React.FC = () => {
  const [ code, setCode ] = useState('const name = \'zs\'\;');

  return (
    <div style={{ height: '400px' }}>
      <Code4React
        options={options}
        code={code}
        onChangeRaw={(cm, change) => {
          setCode(cm.getValue());
          // 判断需不需要提示
          if (change.origin === '+input') {
            // ignoreToken 忽略掉某些不需要提示的情况
            if (!ignoreToken(change.text)) {
              timeout(() => {
                cm.execCommand("autocomplete");
              }, 200);
            }
          }
        }}
      />
    </div>
  );
}

export default Demo;
