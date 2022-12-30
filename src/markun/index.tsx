import React, { useRef, useState } from 'react';
import { Provider } from 'react-redux';
import Editor from './components/editor';
import { EditorRef } from './components/editor/types';
import Footer from './components/footer';
import Header from './components/header';
import Helper from './components/helper';
import Cate from './components/cate';
import Viewer from './components/viewer';
import { ViewerRef } from './components/viewer/types';
import './global.less';
import styles from './index.less';
import { store as markunStore } from './store/markun';
import { setScrollingOwner, store as scrollStore } from './store/scroll';
import { MarkunProps } from './types';
import { fullScreen } from './utils';

const Markun: React.FC<MarkunProps> = props => {
  const [theme, setTheme] = useState(props.defaultTheme || 'darcula');
  const [highlight, setHighlight] = useState(
    props.defaultHighlight || 'oneDark'
  );
  const [code, setCode] = useState('');

  const rootRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorRef>(null);
  const viewerRef = useRef<ViewerRef>(null);

  return (
    <Provider store={markunStore}>
      <div
        className={styles['markun']}
        ref={rootRef}
      >
        <Header
          theme={theme}
          highlight={highlight}
          themeChange={theme => {
            setTheme(theme);
          }}
          highlightChange={highlight => {
            setHighlight(highlight);
          }}
          operateCode={action => {
            editorRef?.current?.operateCode(action);
          }}
          fullScreen={() => {
            if (props.fullScreen) {
              props.fullScreen();
            } else {
              fullScreen(rootRef.current);
            }
          }}
        />
        <div className={styles['main']}>
          <Editor
            ref={editorRef}
            theme={theme}
            onCodeChange={newCode => setCode(newCode)}
            onImgUpload={async(file) => {
              return await props.onImgUpload(file);
            }}
            // 编辑器和预览区节点同步滚动，参考 https://developer.aliyun.com/article/978465#slide-6
            onScroll={cmInstance => {
              try {
                const state = scrollStore.getState();
                if (!state.isScrollSync || state.scrollingOwner !== 'editor')
                  return;

                // 需要用到 tree
                const treeData = scrollStore.getState().tree;
                const editorEleList: Array<number> = [],
                  viwerEleList: Array<number> = [];
                const viewerRoot = viewerRef?.current?.root;
                if (!viewerRoot) return;
                const viewerChlidNode = viewerRoot?.childNodes || [];
                treeData.children.forEach((child: any, index: any) => {
                  // 如果节点类型不为element则跳过
                  if (
                    child.type !== 'element' ||
                    viewerChlidNode.length === 0 ||
                    !cmInstance
                  ) {
                    return;
                  }
                  // heightAtLine 设为local返回的坐标是相对于编辑器本身的，其他还有两个可选项：window、page
                  let offsetTop = cmInstance.heightAtLine(
                    child.position.start.line - 1,
                    'local'
                  );
                  editorEleList.push(offsetTop);
                  // @ts-ignore
                  viwerEleList.push(viewerChlidNode[index].offsetTop);
                });
                // 获取编辑器滚动信息
                let editorScrollInfo = cmInstance.getScrollInfo();
                // 找出当前滚动到的节点的索引
                let scrollElementIndex = 0;
                for (let i = 0; i < editorEleList.length; i++) {
                  if (editorScrollInfo.top < editorEleList[i]) {
                    // 当前节点的offsetTop大于滚动的距离，相当于当前滚动到了前一个节点内
                    scrollElementIndex = Math.max(0, i - 1);
                    break;
                  }
                }
                // 编辑区滚动到底部预览区也要滚到底部
                if (
                  editorScrollInfo.top >=
                  editorScrollInfo.height - editorScrollInfo.clientHeight
                ) {
                  viewerRoot.scrollTop =
                    viewerRoot.scrollHeight - viewerRoot.clientHeight;
                  return;
                }
                // 正常情况
                if (scrollElementIndex >= 0) {
                  // 编辑区域滚动距离和当前滚动到的节点的offsetTop的差值与当前节点高度的比值
                  let ratio =
                    (editorScrollInfo.top - editorEleList[scrollElementIndex]) /
                    (editorEleList[scrollElementIndex + 1] -
                      editorEleList[scrollElementIndex]);
                  // 设置预览区域的滚动距离为对应节点的offsetTop
                  viewerRoot.scrollTop =
                    ratio *
                      (viwerEleList[scrollElementIndex + 1] -
                        viwerEleList[scrollElementIndex]) +
                    viwerEleList[scrollElementIndex];
                }
              } catch (e) {}
            }}
          />
          <Viewer
            ref={viewerRef}
            highlight={highlight}
            code={code}
            isListenTreeChange={true}
            onScroll={() => {
              try {
                const state = scrollStore.getState();
                if (!state.isScrollSync || state.scrollingOwner !== 'viewer')
                  return;

                const cmInstance = editorRef?.current?.cmInstance;
                if (!cmInstance) return;
                // 需要用到 tree
                const treeData = scrollStore.getState().tree;
                const editorEleList: Array<number> = [],
                  viwerEleList: Array<number> = [];
                const viewerRoot = viewerRef?.current?.root;
                if (!viewerRoot) return;
                const viewerChlidNode = viewerRoot?.childNodes || [];
                treeData.children.forEach((child: any, index: any) => {
                  // 如果节点类型不为element则跳过
                  if (
                    child.type !== 'element' ||
                    viewerChlidNode.length === 0 ||
                    !cmInstance
                  ) {
                    return;
                  }
                  // heightAtLine 设为local返回的坐标是相对于编辑器本身的，其他还有两个可选项：window、page
                  let offsetTop = cmInstance.heightAtLine(
                    child.position.start.line - 1,
                    'local'
                  );
                  editorEleList.push(offsetTop);
                  // @ts-ignore
                  viwerEleList.push(viewerChlidNode[index].offsetTop);
                });
                // 获取预览区滚动信息
                let viewerScrollTop = viewerRoot.scrollTop;
                // 找出当前滚动到的节点的索引
                let scrollElementIndex = 0;
                for (let i = 0; i < viwerEleList.length; i++) {
                  if (viewerScrollTop < viwerEleList[i]) {
                    // 当前节点的offsetTop大于滚动的距离，相当于当前滚动到了前一个节点内
                    scrollElementIndex = Math.max(0, i - 1);
                    break;
                  }
                }
                let editorScrollInfo = cmInstance.getScrollInfo();
                if (
                  viewerScrollTop >=
                  viewerRoot.scrollHeight - viewerRoot.clientHeight
                ) {
                  cmInstance.scrollTo(
                    0,
                    editorScrollInfo.height - editorScrollInfo.clientHeight
                  );
                  return;
                }
                // 正常情况
                if (scrollElementIndex >= 0) {
                  let ratio =
                    (viewerScrollTop - viwerEleList[scrollElementIndex]) /
                    (viwerEleList[scrollElementIndex + 1] -
                      viwerEleList[scrollElementIndex]);
                  const editorScrollTop =
                    ratio *
                      (editorEleList[scrollElementIndex + 1] -
                        editorEleList[scrollElementIndex]) +
                    editorEleList[scrollElementIndex];
                  cmInstance.scrollTo(0, editorScrollTop);
                }
              } catch (e) {}
            }}
          />
          <Helper />
          <Cate />
        </div>
        <Footer
          scrollToTop={isSync => {
            scrollStore.dispatch(setScrollingOwner('editor'));
            editorRef?.current?.cmInstance.scrollTo(0, 0);
            if (!isSync && viewerRef?.current?.root) {
              viewerRef.current.root.scrollTop = 0;
            }
          }}
        />
      </div>
    </Provider>
  );
};

export default Markun;