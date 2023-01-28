import { useDeepCompareEffect } from 'ahooks';
// @ts-ignore
import _CodeMirror from 'codemirror';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './global.less';
import { Code4ReactProps, Code4ReactRef } from './types';

// @ts-ignore
const CodeMirror = window.CodeMirror || _CodeMirror;

// 生成基本配置
const basicOptions = {
  tabSize: 2,
  theme: 'darcula', // 需要引入对应的主题css
  lineNumbers: true, // 代码行号
  line: true, // 代码出错提醒
  readOnly: false,
  matchBrackets: true, // 匹配括号
  autoCloseBrackets: true, // 补全括号
  autoCloseTags: true, // 补全标签
  // lineWrapping: true, // 自动换行
  hintOptions: {
    completeSingle: false // 提示只剩一个选项是自动填充，体验不好，最好去掉
  }
};

const Code4React = React.forwardRef<Code4ReactRef, Code4ReactProps>(
  ({ code, onChange, onChangeRaw, onScrollRaw, options }, ref) => {
    const textarea = useRef<HTMLTextAreaElement>(null);

    const [cmInstance, setCmInstance] = useState<any>(null);

    useEffect(() => {
      const cmOptions = Object.assign({}, basicOptions, options);
      const instance = CodeMirror.fromTextArea(textarea.current, cmOptions);
      setCmInstance(instance);

      return () => {
        const element = cmInstance && cmInstance.doc.cm.getWrapperElement();
        element && element.remove && element.remove();
      };
    }, []);

    useEffect(() => {
      if (cmInstance?.getValue() !== code) {
        cmInstance?.setValue(code || '');
      }
    }, [code])

    useEffect(() => {
      if (cmInstance) {
        cmInstance.on('change', (cm: any, change: any) => {
          if (onChangeRaw) onChangeRaw(cm, change);
          if (onChange) onChange(cm.getValue());
        });
      }
    }, [cmInstance, onChange, onChangeRaw]);

    useEffect(() => {
      if (cmInstance) {
        cmInstance.on('scroll', (cm: any) => {
          if (onScrollRaw) onScrollRaw(cm);
        });
      }
    }, [cmInstance, onScrollRaw]);

    // 向外暴露 cmInstance
    useImperativeHandle(ref, () => {
      if (cmInstance) cmInstance.CodeMirrorObj = CodeMirror;
      return {
        cmInstance
      };
    }, [cmInstance]);

    useDeepCompareEffect(() => {
      if (cmInstance) {
        for (const key in options) {
          cmInstance.setOption(key, options[key]);
        }
      }
    }, [cmInstance, options]);

    return <textarea ref={textarea}></textarea>;
  }
);

export default Code4React;
