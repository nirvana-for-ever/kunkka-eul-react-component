import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import Code4React from '../../../code4react/code4react';
import styles from './index.less';
import { EditorProps, EditorRef } from './types';
// require styles
import 'codemirror/lib/codemirror.css';
// 编程语言包，这里以 markdown 为例子
import 'codemirror/mode/markdown/markdown';
// 引入主题文件 css，这里使用 idea 的 darcula
import 'codemirror/addon/edit/closebrackets'; // 补全括号
import 'codemirror/addon/edit/closetag'; // 补全标签
import 'codemirror/addon/edit/matchbrackets'; // 匹配括号
import { Code4ReactRef } from 'nirvana/code4react/types';
import { isMac, operateCode4React } from '../../utils';
import { useDebounceFn } from 'ahooks';
import { store as scrollStore, setScrollingOwner } from '../../store/scroll';
import { store as markunStore, setInfo } from '../../store/markun';
import { useSelector } from 'react-redux';

const basicOptions = {
  tabSize: 2,
  mode: 'markdown', // 需要引入对应的语言文件
  theme: 'darcula', // 需要引入对应的主题css
  lineWrapping: true, // 自动换行
  lineNumbers: true,
  line: true,
  readOnly: false,
  matchBrackets: true, // 匹配括号
  autoCloseBrackets: true, // 补全括号
  autoCloseTags: true, // 补全标签
  hintOptions: {
    completeSingle: false // 提示只剩一个选项是自动填充，体验不好，最好去掉
  }
};

const Editor = React.forwardRef<EditorRef, EditorProps>(
  ({ theme, onCodeChange, onImgUpload, onScroll }, ref) => {
    const [code, setCode] = useState('');
    const [keyEvents, setKeyEvents] = useState<any>();

    const code4ReactRef = useRef<Code4ReactRef>(null);

    const imgUploader = useRef<any>(null);

    // 防抖
    const { run: onCodeChangeDebounce } = useDebounceFn((code) => {
      onCodeChange(code);
      const lineCount = code4ReactRef?.current?.cmInstance?.lineCount() || 0;
      markunStore.dispatch(setInfo({
        lineCount
      }));
    }, { wait: 300 });

    useEffect(() => {
      import(`codemirror/theme/${theme}.css`).catch(() => {
        // 不存在或导入失败
      });
    }, [theme]);

    useEffect(() => {
      const cmInstance = code4ReactRef?.current?.cmInstance;
      const obj = isMac
      ? {
          'Cmd-B'() {
            operateCode4React(cmInstance, 'bold');
          },
          'Cmd-I'() {
            operateCode4React(cmInstance, 'italics');
          },
          Enter() {
            operateCode4React(cmInstance, 'enter');
          },
          'Cmd-K'() {
            operateCode4React(cmInstance, 'link');
          },
          'Shift-Cmd-I'() {
            imgUploader?.current?.click();
          },
          'Shift-Cmd-K'() {
            operateCode4React(cmInstance, 'code');
          },
          'Shift-Cmd-C'() {
            operateCode4React(cmInstance, 'codeBlock');
          },
          'Shift-Cmd-U'() {
            operateCode4React(cmInstance, 'ul');
          },
          'Shift-Cmd-O'() {
            operateCode4React(cmInstance, 'ol');
          }
        }
      : {
          'Ctrl-B'() {
            operateCode4React(cmInstance, 'bold');
          },
          'Ctrl-I'() {
            operateCode4React(cmInstance, 'italics');
          },
          Enter() {
            operateCode4React(cmInstance, 'enter');
          },
          'Ctrl-K'() {
            operateCode4React(cmInstance, 'link');
          },
          'Shift-Ctrl-I'() {
            imgUploader?.current?.click();
          },
          'Shift-Ctrl-K'() {
            operateCode4React(cmInstance, 'code');
          },
          'Shift-Ctrl-C'() {
            operateCode4React(cmInstance, 'codeBlock');
          },
          'Shift-Ctrl-U'() {
            operateCode4React(cmInstance, 'ul');
          },
          'Shift-Ctrl-O'() {
            operateCode4React(cmInstance, 'ol');
          }
        };
      setKeyEvents(obj);
    }, [code4ReactRef?.current?.cmInstance]);

    const options = useMemo(() => {
      return Object.assign({}, basicOptions, {
        theme,
        extraKeys: {
          ...keyEvents
        }
      });
    }, [theme, keyEvents]);

    useImperativeHandle(
      ref,
      () => ({
        cmInstance: code4ReactRef?.current?.cmInstance,
        operateCode(action: string) {
          if (action === 'imgUpload') {
            imgUploader?.current?.click();
            return;
          }
          operateCode4React(code4ReactRef?.current?.cmInstance, action);
        }
      }),
      [code4ReactRef?.current?.cmInstance, imgUploader?.current]
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
        ? curMainVisible !== 'viewer'
          ? 0
          : 1
        : curMainVisible === 'editor'
        ? 0
        : curMainVisible === 'both'
        ? 2
        : 1
    );
    mediaQueryList.addEventListener('change', (e: any) => {
      setScreenState(
        e.matches
          ? curMainVisible !== 'viewer'
            ? 0
            : 1
          : curMainVisible === 'editor'
          ? 0
          : curMainVisible === 'both'
          ? 2
          : 1
      );
    });

    useEffect(() => {
      setScreenState(
        mediaQueryList.matches
          ? curMainVisible !== 'viewer'
            ? 0
            : 1
          : curMainVisible === 'editor'
          ? 0
          : curMainVisible === 'both'
          ? 2
          : 1
      );
    }, [curMainVisible]);

    return (
      <div
        className={styles['editor']}
        style={{
          display: screenState === 1 ? 'none' : 'block',
          width:
            screenState === 0
              ? `${curSidebarVisible === 'none' ? '100%' : 'calc(100% - 140px)'}`
              : `${curSidebarVisible === 'none' ? '50%' : 'calc(50% - 140px)'}`
        }}
        onMouseEnter={() => {
          if (!scrollStore.getState().isScrollSync) return;
          scrollStore.dispatch(setScrollingOwner('editor'));
        }}
      >
        <Code4React
          ref={code4ReactRef}
          code={code}
          options={options}
          onChange={newCode => {
            setCode(newCode);
            onCodeChangeDebounce(newCode);
          }}
          onScrollRaw={onScroll}
        />
        <input
          style={{ display: 'none' }}
          ref={imgUploader}
          type="file"
          accept=".jpg,.png,.webp,.jpeg,.gif,.bmp"
          onChange={async(e) => {
            if (e.target.files) {
              let url = '';
              try {
                url = await onImgUpload(e.target.files[0]);
              } catch (e) {}
              const cmInstance = code4ReactRef?.current?.cmInstance;
              operateCode4React(cmInstance, 'img', url);
            }
          }}
        />
      </div>
    );
  }
);

export default Editor;
