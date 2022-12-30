import type { MenuProps } from 'antd';
import { Dropdown, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { highlight, themes } from '../../constants/header';
import { mermaidMap } from '../../constants/mermaid';
import { setCurMainVisible, setCurSidebarVisible, store } from '../../store/markun';
import { ReactComponent as BoldIcon } from '../../svg/bold.svg';
import { ReactComponent as CateIcon } from '../../svg/cate.svg';
import { ReactComponent as CodeBlockIcon } from '../../svg/code-block.svg';
import { ReactComponent as CodeIcon } from '../../svg/code.svg';
import { ReactComponent as DelIcon } from '../../svg/del.svg';
import { ReactComponent as FormulaBlockIcon } from '../../svg/formula-block.svg';
import { ReactComponent as FormulaInlineIcon } from '../../svg/formula-inline.svg';
import { ReactComponent as FormulaIcon } from '../../svg/formula.svg';
import { ReactComponent as FullscreenIcon } from '../../svg/fullscreen.svg';
import { ReactComponent as HelpIcon } from '../../svg/help.svg';
import { ReactComponent as HighLightIcon } from '../../svg/highlight.svg';
import { ReactComponent as ImgShrinkIcon } from '../../svg/img-shrink.svg';
import { ReactComponent as ImgIcon } from '../../svg/img.svg';
import { ReactComponent as ItalicsIcon } from '../../svg/italics.svg';
import { ReactComponent as LinkIcon } from '../../svg/link.svg';
import { ReactComponent as MermaidIcon } from '../../svg/mermaid.svg';
import { ReactComponent as OlIcon } from '../../svg/ol.svg';
import { ReactComponent as OnlnEditorIcon } from '../../svg/only-editor.svg';
import { ReactComponent as OnlnViewerIcon } from '../../svg/only-viewer.svg';
import { ReactComponent as PositionLeftIcon } from '../../svg/position-left.svg';
import { ReactComponent as PositionMidIcon } from '../../svg/position-mid.svg';
import { ReactComponent as PositionRightIcon } from '../../svg/position-right.svg';
import { ReactComponent as QuoteIcon } from '../../svg/quote.svg';
import { ReactComponent as SourceIcon } from '../../svg/source.svg';
import { ReactComponent as TableIcon } from '../../svg/table.svg';
import { ReactComponent as ThemeIcon } from '../../svg/theme.svg';
import { ReactComponent as TitleIcon } from '../../svg/title.svg';
import { ReactComponent as Title1Icon } from '../../svg/title1.svg';
import { ReactComponent as Title2Icon } from '../../svg/title2.svg';
import { ReactComponent as Title3Icon } from '../../svg/title3.svg';
import { ReactComponent as Title4Icon } from '../../svg/title4.svg';
import { ReactComponent as Title5Icon } from '../../svg/title5.svg';
import { ReactComponent as Title6Icon } from '../../svg/title6.svg';
import { ReactComponent as UlIcon } from '../../svg/ul.svg';
import styles from './index.less';
import { MarkunHeaderProps } from './types';

const MarkunHeader: React.FC<MarkunHeaderProps> = props => {
  const [themeItems, setThemeItems] = useState<MenuProps['items']>();
  const [highlightItems, setHighlightItems] = useState<MenuProps['items']>();
  const [titleItems, setTitleItems] = useState<MenuProps['items']>();
  const [imgShrinkItems, setImgShrinkItems] = useState<MenuProps['items']>();
  const [fomulaItems, setFomulaItems] = useState<MenuProps['items']>();
  const [positionItems, setPositionItems] = useState<MenuProps['items']>();
  const [mermaidItems, setMermaidItems] = useState<MenuProps['items']>();

  const curMainVisible = useSelector((state: any) => {
    return state.curMainVisible;
  });

  useEffect(() => {
    let curTheme: HTMLElement;
    let curHighlight: HTMLElement;

    setMermaidItems(
      Object.keys(mermaidMap).map((item, index) => {
        return {
          key: `${index}`,
          label: (
            <div
              className="markun-drop-down-item"
              onClick={() => props.operateCode(`mermaid-${item}`)}
            >
              {mermaidMap[item]}
            </div>
          )
        };
      })
    );

    setPositionItems([
      {
        key: '1',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('position-left')}
          >
            <div className="drop-down-icon">
              <PositionLeftIcon />
            </div>
            左对齐
          </div>
        )
      },
      {
        key: '2',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('position-center')}
          >
            <div className="drop-down-icon">
              <PositionMidIcon />
            </div>
            居中对齐
          </div>
        )
      },
      {
        key: '3',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('position-right')}
          >
            <div className="drop-down-icon">
              <PositionRightIcon />
            </div>
            右对齐
          </div>
        )
      }
    ]);

    setFomulaItems([
      {
        key: '1',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('formulaInline')}
          >
            <div className="drop-down-icon">
              <FormulaInlineIcon />
            </div>
            行内公式
          </div>
        )
      },
      {
        key: '2',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('formulaBlock')}
          >
            <div className="drop-down-icon">
              <FormulaBlockIcon />
            </div>
            块级公式
          </div>
        )
      }
    ]);

    setImgShrinkItems([
      {
        key: '-1',
        type: 'group',
        label: <div className="markun-drop-down-title">图片缩放</div>,
        children: ['30%', '50%', '70%', '100%'].map((item, index) => {
          return {
            key: index,
            label: (
              <div
                className="markun-drop-down-item"
                onClick={() => props.operateCode(`imgShrink-${item}`)}
              >
                {item}
              </div>
            )
          };
        })
      }
    ]);

    setTitleItems([
      {
        key: '1',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-1')}
          >
            <div className="drop-down-icon">
              <Title1Icon />
            </div>
            一级标题
          </div>
        )
      },
      {
        key: '2',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-2')}
          >
            <div className="drop-down-icon">
              <Title2Icon />
            </div>
            二级标题
          </div>
        )
      },
      {
        key: '3',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-3')}
          >
            <div className="drop-down-icon">
              <Title3Icon />
            </div>
            三级标题
          </div>
        )
      },
      {
        key: '4',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-4')}
          >
            <div className="drop-down-icon">
              <Title4Icon />
            </div>
            四级标题
          </div>
        )
      },
      {
        key: '5',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-5')}
          >
            <div className="drop-down-icon">
              <Title5Icon />
            </div>
            五级标题
          </div>
        )
      },
      {
        key: '6',
        label: (
          <div
            className="markun-drop-down-item"
            onClick={() => props.operateCode('title-6')}
          >
            <div className="drop-down-icon">
              <Title6Icon />
            </div>
            六级标题
          </div>
        )
      }
    ]);

    setThemeItems([
      {
        key: '-1',
        type: 'group',
        label: <div className="markun-drop-down-title">编辑器主题</div>,
        children: themes.map((item, index) => {
          return {
            key: index,
            label: (
              <div
                className={`markun-drop-down-item ${
                  props.theme === item ? 'markun-drop-down-item-active' : ''
                }`}
                onClick={e => {
                  props.themeChange(item);
                  const target = e.target as HTMLElement;
                  if (!curTheme) {
                    const father =
                      target.parentElement?.parentElement?.parentElement;
                    for (let i = 0; i < (father?.childElementCount || 0); ++i) {
                      const div = father?.children[i]?.children[0].children[0];
                      if (
                        div?.classList.contains('markun-drop-down-item-active')
                      ) {
                        div.classList.remove('markun-drop-down-item-active');
                        break;
                      }
                    }
                  } else {
                    curTheme?.classList.remove('markun-drop-down-item-active');
                  }
                  target.classList.add('markun-drop-down-item-active');
                  curTheme = target;
                }}
              >
                {item}
              </div>
            )
          };
        })
      }
    ]);

    setHighlightItems([
      {
        key: '-1',
        type: 'group',
        label: <div className="markun-drop-down-title">代码高亮主题</div>,
        children: highlight.map((item, index) => {
          return {
            key: index,
            label: (
              <div
                className={`markun-drop-down-item ${
                  props.highlight === item ? 'markun-drop-down-item-active' : ''
                }`}
                onClick={e => {
                  props.highlightChange(item);
                  const target = e.target as HTMLElement;
                  if (!curHighlight) {
                    const father =
                      target.parentElement?.parentElement?.parentElement;
                    for (let i = 0; i < (father?.childElementCount || 0); ++i) {
                      const div = father?.children[i]?.children[0].children[0];
                      if (
                        div?.classList.contains('markun-drop-down-item-active')
                      ) {
                        div.classList.remove('markun-drop-down-item-active');
                        break;
                      }
                    }
                  } else {
                    curHighlight?.classList.remove(
                      'markun-drop-down-item-active'
                    );
                  }
                  target.classList.add('markun-drop-down-item-active');
                  curHighlight = target;
                }}
              >
                {item}
              </div>
            )
          };
        })
      }
    ]);
  }, []);

  return (
    <div className={styles['header']}>
      <div className={styles['header-simple']}>
        <div
          className={`${styles['word-btn']} ${
            curMainVisible !== 'viewer' ? styles['active'] : ''
          }`}
          onClick={() => store.dispatch(setCurMainVisible('editor'))}
        >
          编辑
        </div>
        <div
          className={`${styles['word-btn']} ${
            curMainVisible === 'viewer' ? styles['active'] : ''
          }`}
          onClick={() => store.dispatch(setCurMainVisible('viewer'))}
        >
          预览
        </div>
      </div>
      <div className={styles['header-whole']}>
        <Dropdown
          menu={{ items: titleItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down"
        >
          <div className={styles['header-icon']}>
            <TitleIcon />
          </div>
        </Dropdown>
        <Tooltip
          placement="top"
          title="粗体"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('bold')}
          >
            <BoldIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="斜体"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('italics')}
          >
            <ItalicsIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="引用"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('quote')}
          >
            <QuoteIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="链接"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('link')}
          >
            <LinkIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="图片"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('imgUpload')}
          >
            <ImgIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="代码"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('code')}
          >
            <CodeIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="代码块"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('codeBlock')}
          >
            <CodeBlockIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="无序列表"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('ul')}
          >
            <UlIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="有序列表"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('ol')}
          >
            <OlIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="删除线"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('del')}
          >
            <DelIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="表格"
        >
          <div
            className={styles['header-icon']}
            onClick={() => props.operateCode('table')}
          >
            <TableIcon />
          </div>
        </Tooltip>
        <Dropdown
          menu={{ items: positionItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down"
        >
          <div className={styles['header-icon']}>
            <PositionMidIcon />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: imgShrinkItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down"
        >
          <div className={styles['header-icon']}>
            <ImgShrinkIcon />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: fomulaItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down"
        >
          <div className={styles['header-icon']}>
            <FormulaIcon />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: mermaidItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down markun-drop-down-long"
        >
          <div className={styles['header-icon']}>
            <MermaidIcon />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: themeItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down markun-drop-down-long"
        >
          <div className={styles['header-icon']}>
            <ThemeIcon />
          </div>
        </Dropdown>
        <Dropdown
          menu={{ items: highlightItems }}
          placement="bottomLeft"
          overlayClassName="markun-drop-down markun-drop-down-long"
        >
          <div className={styles['header-icon']}>
            <HighLightIcon />
          </div>
        </Dropdown>
      </div>
      <div className={styles['header-right']}>
        <Tooltip
          placement="top"
          title="目录"
        >
          <div className={styles['header-icon']} onClick={() => store.dispatch(setCurSidebarVisible('cate'))}>
            <CateIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="帮助"
        >
          <div className={styles['header-icon']} onClick={() => store.dispatch(setCurSidebarVisible('helper'))}>
            <HelpIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="仅编辑区"
        >
          <div
            className={`${styles['header-icon']} ${styles['big-screen']}`}
            onClick={() => store.dispatch(setCurMainVisible('editor'))}
          >
            <OnlnEditorIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="仅预览区"
        >
          <div
            className={`${styles['header-icon']} ${styles['big-screen']}`}
            onClick={() => store.dispatch(setCurMainVisible('viewer'))}
          >
            <OnlnViewerIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="全屏"
        >
          <div className={styles['header-icon']} onClick={() => props.fullScreen()}>
            <FullscreenIcon />
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title="源代码"
        >
          <div className={styles['header-icon']}>
            <SourceIcon />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default MarkunHeader;
