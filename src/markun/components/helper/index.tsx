import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.less';
import { ReactComponent as LinkBlueIcon } from '../../svg/link-blue.svg';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';
import { ReactComponent as BoldIcon } from '../../svg/bold.svg';
import { ReactComponent as CodeBlockIcon } from '../../svg/code-block.svg';
import { ReactComponent as CodeIcon } from '../../svg/code.svg';
import { ReactComponent as DelIcon } from '../../svg/del.svg';
import { ReactComponent as FormulaBlockIcon } from '../../svg/formula-block.svg';
import { ReactComponent as FormulaInlineIcon } from '../../svg/formula-inline.svg';
import { ReactComponent as ImgIcon } from '../../svg/img.svg';
import { ReactComponent as ItalicsIcon } from '../../svg/italics.svg';
import { ReactComponent as LinkIcon } from '../../svg/link.svg';
import { ReactComponent as MermaidIcon } from '../../svg/mermaid.svg';
import { ReactComponent as OlIcon } from '../../svg/ol.svg';
import { ReactComponent as QuoteIcon } from '../../svg/quote.svg';
import { ReactComponent as Title1Icon } from '../../svg/title1.svg';
import { ReactComponent as Title2Icon } from '../../svg/title2.svg';
import { ReactComponent as Title3Icon } from '../../svg/title3.svg';
import { ReactComponent as UlIcon } from '../../svg/ul.svg';
import { setCurSidebarVisible, store } from '../../store/markun';
import { isMac } from '../../utils'

const markdownGrammers = [
  {
    icon: <Title1Icon />,
    title: '一级标题',
    desc: '# 标题'
  },
  {
    icon: <Title2Icon />,
    title: '二级标题',
    desc: '## 标题'
  },
  {
    icon: <Title3Icon />,
    title: '三级标题',
    desc: '### 标题'
  },
  {
    icon: <BoldIcon />,
    title: '粗体',
    desc: '**粗体文本**'
  },
  {
    icon: <ItalicsIcon />,
    title: '斜体',
    desc: '*斜体文本*'
  },
  {
    icon: <QuoteIcon />,
    title: '引用',
    desc: '> 引用文本'
  },
  {
    icon: <LinkIcon />,
    title: '链接',
    desc: '[链接描述](url)'
  },
  {
    icon: <ImgIcon />,
    title: '图片',
    desc: '![alt](url "图片描述")'
  },
  {
    icon: <CodeIcon />,
    title: '代码',
    desc: '\`代码\`'
  },
  {
    icon: <CodeBlockIcon />,
    title: '代码块',
    desc: '\`\`\`编程语言↵'
  },
  {
    icon: <UlIcon />,
    title: '无序列表',
    desc: '- 项目'
  },
  {
    icon: <OlIcon />,
    title: '有序列表',
    desc: '1. 项目'
  },
  {
    icon: <DelIcon />,
    title: '删除线',
    desc: '~~文本~~'
  },
  {
    icon: <FormulaInlineIcon />,
    title: '行内公式',
    desc: '$公式$'
  },
  {
    icon: <FormulaBlockIcon />,
    title: '块级公式',
    desc: '$$↵公式↵$$'
  },
  {
    icon: <MermaidIcon />,
    title: 'Mermaid图表',
    desc: '\`\`\`mermaid'
  }
];

const quicklyKey = [
  {
    icon: <BoldIcon />,
    title: '粗体',
    desc: isMac ? 'Cmd-B' : 'Ctrl-B'
  },
  {
    icon: <ItalicsIcon />,
    title: '斜体',
    desc: isMac ? 'Cmd-I' : 'Ctrl-I'
  },
  {
    icon: <LinkIcon />,
    title: '链接',
    desc: isMac ? 'Cmd-K' : 'Ctrl-K'
  },
  {
    icon: <ImgIcon />,
    title: '图片',
    desc: isMac ? 'Shift-Cmd-I' : 'Shift-Ctrl-I'
  },
  {
    icon: <CodeIcon />,
    title: '代码',
    desc: isMac ? 'Shift-Cmd-K' : 'Shift-Ctrl-K'
  },
  {
    icon: <CodeBlockIcon />,
    title: '代码块',
    desc: isMac ? 'Shift-Cmd-C' : 'Shift-Ctrl-C'
  },
  {
    icon: <UlIcon />,
    title: '无序列表',
    desc: isMac ? 'Shift-Cmd-U' : 'Shift-Ctrl-U'
  },
  {
    icon: <OlIcon />,
    title: '有序列表',
    desc: isMac ? 'Shift-Cmd-O' : 'Shift-Ctrl-O'
  }
]

export default function HelperPage() {
  const curSidebarVisible = useSelector((state: any) => {
    return state.curSidebarVisible;
  });

  return (
    <div className={styles['helper']} style={{ display: `${curSidebarVisible === 'helper' ? 'block' : 'none'}` }}>
      <div className={styles['close-tag']} onClick={() => store.dispatch(setCurSidebarVisible('none'))}><CloseIcon /></div>
      <h2>帮助</h2>
      <div className={styles['link']} onClick={() => window.open('https://www.markdownguide.org/basic-syntax')}>
        <LinkBlueIcon />
        如何编写 Markdown
      </div>
      <h2>Markdown 语法</h2>
      {
        markdownGrammers.map(item => {
          return (
            <div className={styles['md-gram-item']} key={item.title}>
              <div className={styles['icon']}>{item.icon}</div>
              <div className={styles['title']}>{item.title}</div>
              <div className={styles['desc']}>{item.desc}</div>
            </div>
          );
        })
      }
      <h2>快捷键</h2>
      {
        quicklyKey.map(item => {
          return (
            <div className={styles['md-gram-item']} key={item.title}>
              <div className={styles['icon']}>{item.icon}</div>
              <div className={styles['title']}>{item.title}</div>
              <div className={styles['desc']}>{item.desc}</div>
            </div>
          );
        })
      }
    </div>
  )
}

