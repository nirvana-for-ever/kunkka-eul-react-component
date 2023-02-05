import React, { useCallback, useMemo, useRef } from 'react';
import { CateHelper } from '@kunkka-eul/react-component';
import { Button } from 'antd';
import 'antd/lib/button/style';
import './catedemo.less'; // 样式示例，可自定义样式

const Demo: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const cateRef = useRef<HTMLDivElement>(null);

  const helper = useMemo(() => {
    if (targetRef.current) {
      return new CateHelper(targetRef.current, 100);
    }
  }, [targetRef.current]);

  const generateCate = useCallback(() => {
    if (cateRef.current && helper) {
      cateRef.current.innerHTML = '';
      // 使用 appendChild 的方式而不是设置 innerHTML，避免点击事件用不了
      const cate = helper.generateCate();
      if (cate) {
        cateRef.current.appendChild(cate);
      }
    }
  }, [cateRef.current, helper]);

  return (
    <div>
      <Button onClick={generateCate}>生成目录</Button>
      <div ref={targetRef}>
        <h1>标题1</h1>
        <h2>标题1.1</h2>
        <p>内容111</p>
        <h2>标题1.2</h2>
        <p>内容222</p>
        <h1>标题2</h1>
        <h2>标题2.1</h2>
        <h3>标题2.1.1</h3>
        <p>content</p>
        <h2>标题2.2</h2>
      </div>
      <div ref={cateRef} className='cate-container'></div>
    </div>
  );
}

export default Demo;
