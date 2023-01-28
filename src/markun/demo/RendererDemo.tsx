import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Renderer, CateHelper } from '@kunkka-eul/react-component';
import { RendererRef } from '@kunkka-eul/react-component';
import './catedemo.less'; // 样式示例，可自定义样式

const mdContent = '# title 1\n## title 1.1\n\n```js\nconst name = \'zs\'\n```\n # title 2\n content';
const highlight = 'oneDark';

const Demo: React.FC = () => {
  const targetRef = useRef<RendererRef>(null);
  const cateRef = useRef<HTMLDivElement>(null);

  const [isRenderFinished, setIsRenderFinished] = useState(false);

  const helper = useMemo(() => {
    if (targetRef.current?.root) {
      return new CateHelper(targetRef.current.root, 100);
    }
  }, [targetRef.current]);

  useEffect(() => {
    if (isRenderFinished && cateRef.current && helper) {
      cateRef.current.innerHTML = '';
      // 使用 appendChild 的方式而不是设置 innerHTML，避免点击事件用不了
      cateRef.current.appendChild(helper.generateCate());
    }
  }, [cateRef.current, isRenderFinished, helper]);

  return (
    <div>
      <div ref={cateRef} className='cate-container'></div>
      <Renderer
        ref={targetRef}
        code={mdContent}
        highlight={highlight}
        onRenderFinished={() => setIsRenderFinished(true)}
      />
    </div>
  );
}

export default Demo;
