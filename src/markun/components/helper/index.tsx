import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import LinkBlueIcon from '../../svg/link-blue';
import CloseIcon from '../../svg/close';
import BoldIcon from '../../svg/bold';
import CodeBlockIcon from '../../svg/code-block';
import CodeIcon from '../../svg/code';
import DelIcon from '../../svg/del';
import FormulaBlockIcon from '../../svg/formula-block';
import FormulaInlineIcon from '../../svg/formula-inline';
import ImgIcon from '../../svg/img';
import ItalicsIcon from '../../svg/italics';
import LinkIcon from '../../svg/link';
import MermaidIcon from '../../svg/mermaid';
import OlIcon from '../../svg/ol';
import QuoteIcon from '../../svg/quote';
import Title1Icon from '../../svg/title1';
import Title2Icon from '../../svg/title2';
import Title3Icon from '../../svg/title3';
import UlIcon from '../../svg/ul';
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

const HelperPage: React.FC = () => {
  const curSidebarVisible = useSelector((state: any) => {
    return state.curSidebarVisible;
  });

  return (
    <div className={'helper'} style={{ display: `${curSidebarVisible === 'helper' ? 'block' : 'none'}` }}>
      <div className={'close-tag'} onClick={() => store.dispatch(setCurSidebarVisible('none'))}><CloseIcon /></div>
      <h2>帮助</h2>
      <div className={'link'} onClick={() => window.open('https://www.markdownguide.org/basic-syntax')}>
        <LinkBlueIcon />
        如何编写 Markdown
      </div>
      <h2>Markdown 语法</h2>
      {
        markdownGrammers.map(item => {
          return (
            <div className={'md-gram-item'} key={item.title}>
              <div className={'icon'}>{item.icon}</div>
              <div className={'title'}>{item.title}</div>
              <div className={'desc'}>{item.desc}</div>
            </div>
          );
        })
      }
      <h2>快捷键</h2>
      {
        quicklyKey.map(item => {
          return (
            <div className={'md-gram-item'} key={item.title}>
              <div className={'icon'}>{item.icon}</div>
              <div className={'title'}>{item.title}</div>
              <div className={'desc'}>{item.desc}</div>
            </div>
          );
        })
      }
    </div>
  )
}

export default HelperPage;
