import 'katex/dist/katex.min.css';
import mermaid from 'mermaid';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import styles from './index.less';
import type { ViewerProps, ViewerRef } from './types';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { setInfo, store as markunStore } from '../../store/markun';
import {
  setScrollingOwner,
  setTree,
  store as scrollStore
} from '../../store/scroll';

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex, rehypeRaw];

const Viewer = React.forwardRef<ViewerRef, ViewerProps>((props, ref) => {
  let mermaidCount = 0;

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollSync = props.isListenTreeChange
      ? () => (tree: any) => {
          scrollStore.dispatch(setTree(tree));
        }
      : null;
    if (scrollSync) rehypePlugins.push(scrollSync);

    const countWord = () => (_: any, vf: any) => {
      const content = vf.value.trim();
      const chineseArray = content.match(/[\u4e00-\u9fa5]+/g) || [];
      const chineseLength = chineseArray.reduce((pre: number, cur: string) => {
        return pre + cur.length;
      }, 0);
      const normal = content
        .replace(/[^0-9A-Za-z\s]+/g, '')
        .replace(/[\s]+/g, ' ');
      const normalLength = normal ? normal.split(' ').length : 0;
      new Promise(resolve => {
        resolve(null);
      }).then(() => {
        markunStore.dispatch(
          setInfo({
            wordCount: chineseLength + normalLength
          })
        );
      });
    };
    remarkPlugins.push(countWord);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        root: divRef.current
      };
    },
    [divRef.current]
  );

  const curMainVisible = useSelector((state: any) => {
    return state.curMainVisible;
  });
  const curSidebarVisible = useSelector((state: any) => {
    return state.curSidebarVisible;
  });

  const mediaQueryList = window.matchMedia('(max-width:1024px)');
  // 0 只展示自己
  // 1 隐藏自己
  // 2 各自展示
  const [screenState, setScreenState] = useState(
    mediaQueryList.matches
      ? curMainVisible === 'viewer'
        ? 0
        : 1
      : curMainVisible === 'viewer'
      ? 0
      : curMainVisible === 'both'
      ? 2
      : 1
  );
  mediaQueryList.addEventListener('change', (e: any) => {
    setScreenState(
      e.matches
        ? curMainVisible === 'viewer'
          ? 0
          : 1
        : curMainVisible === 'viewer'
        ? 0
        : curMainVisible === 'both'
        ? 2
        : 1
    );
  });

  useEffect(() => {
    setScreenState(
      mediaQueryList.matches
        ? curMainVisible === 'viewer'
          ? 0
          : 1
        : curMainVisible === 'viewer'
        ? 0
        : curMainVisible === 'both'
        ? 2
        : 1
    );
  }, [curMainVisible]);

  return (
    <div
      id='markun-viewer'
      ref={divRef}
      className={styles['viewer']}
      style={{
        display: screenState === 1 ? 'none' : 'block',
        width:
          screenState === 0
            ? `${curSidebarVisible === 'none' ? '100%' : 'calc(100% - 180px)'}`
            : `${curSidebarVisible === 'none' ? '50%' : 'calc(50% - 180px)'}`
      }}
      onMouseEnter={() => {
        if (!scrollStore.getState().isScrollSync) return;
        scrollStore.dispatch(setScrollingOwner('viewer'));
      }}
      onScroll={() => props.onScroll && props.onScroll()}
    >
      <ReactMarkdown
        children={props.code}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          code({ node, inline, className, children, ...args }) {
            const match = /language-(\w+)/.exec(className || '');
            if (match?.[1] === 'mermaid') {
              try {
                const content = mermaid.render(
                  `mermaid-svg-new${mermaidCount++}`,
                  (children[0] as string) || ''
                );
                return (
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                );
              } catch (e) {
                return <div>error on mermaid</div>;
              }
            }
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={themes[props.highlight]}
                language={match[1]}
                PreTag="div"
                {...args}
              />
            ) : (
              <code
                className={styles['inline-code']}
                {...args}
              >
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
});

export default Viewer;
