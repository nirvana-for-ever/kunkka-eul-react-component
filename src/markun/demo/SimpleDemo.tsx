import React, { useRef, useState } from 'react';
import { Markun, MarkunRef } from '@kunkka-eul/react-component';
import { Button } from 'antd';
import 'antd/lib/button/style';

const Demo: React.FC = () => {
  const [code, setCode] = useState('');

  const markunRef = useRef<MarkunRef>(null);

  const save = () => {
    console.log('html content', markunRef.current?.getHtml());
  }

  return (
    <>
      {/* 自定义保存按钮 */}
      <Button onClick={save} style={{ marginBottom: '20px' }}>保存</Button>
      <Markun
        style={{ height: '400px', overflow: 'auto' }}
        ref={markunRef}
        code={code}
        onCodeChange={(code: string) => {
          setCode(code);
        }}
        onImgUpload={async(file: File) => {
          console.log('file', file);
          // 上传图片
          return 'myurl';
        }}
      />
    </>
  );
}

export default Demo;
