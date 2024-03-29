import 'katex/dist/katex.min.css';
// @ts-ignore
import mermaid from 'mermaid/dist/mermaid.esm.min.mjs';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './renderer.css';
import { RendererProps, RendererRef } from './types';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex, rehypeRaw];

const Renderer = React.forwardRef<RendererRef, RendererProps>((props, ref) => {
  let mermaidCount = 0;

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.onRenderFinished && rootRef.current) {
      if (rootRef.current.innerHTML === '') {
        const observer = new MutationObserver(() => {
          props.onRenderFinished!();
        });
        const options = {
          childList: true,
          subtree: true,
          characterData: true
        };
        observer.observe(rootRef.current, options);
        return () => {
          observer.disconnect();
        };
      } else {
        props.onRenderFinished();
      }
    }
  }, [rootRef.current, props.onRenderFinished]);

  useImperativeHandle(ref, () => {
    return {
      root: rootRef.current
    }
  }, [rootRef.current]);

  return (
    <div ref={rootRef}>
      <ReactMarkdown
        className={`renderer ${props.className}`}
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
                return <></>;
              }
            }
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={themes[props.highlight || 'oneDark']}
                language={match[1]}
                PreTag="div"
                {...args}
              />
            ) : (
              <code
                className={'inline-code'}
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

export default Renderer;
