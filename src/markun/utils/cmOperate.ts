import { mermaidContent } from '../constants/mermaid';

/**
 * replaceRange 最后一个参数的含义
 * Determines whether the selection history event may be merged with the previous one.
 * When an origin starts with the character +,
 * and the last recorded selection had the same origin and was similar
 * (close in time, both collapsed or both non-collapsed),
 * the new one will replace the old one. When it starts with *,
 * it will always replace the previous event (if that had the same origin).
 * Built-in motion uses the "+move" origin. User input uses the "+input" origin.
 */

const mdKeyWords = [
  ' ',
  '*',
  '~'
];

/**
 * 获取当前 codemirror 光标或者选中的词以及开始，结束坐标等信息
 * @param cmInstance codemirror 对象实例
 */
export const currentWordRange = (cmInstance: any) => {
  let start,
    end,
    isMultiLines = false;

  const selectAnchor = cmInstance.listSelections()[0].anchor;
  const selectHead = cmInstance.listSelections()[0].head;
  // line 是行，ch 是列
  if (
    selectAnchor.line !== selectHead.line ||
    selectAnchor.ch !== selectHead.ch
  ) {
    isMultiLines = selectAnchor.line !== selectHead.line;
    // 选择
    if (selectHead.line === selectAnchor.line) {
      if (selectHead.ch < selectAnchor.ch) {
        start = selectHead;
        end = selectAnchor;
      } else {
        start = selectAnchor;
        end = selectHead;
      }
    } else if (selectHead.line < selectAnchor.line) {
      start = selectHead;
      end = selectAnchor;
    } else {
      start = selectAnchor;
      end = selectHead;
    }
  } else {
    // 光标
    // 光标所在行(从0开始)
    const A1 = cmInstance.getCursor().line;
    // 光标所在列(从0开始)
    let A2 = cmInstance.getCursor().ch;
    // 找出光标所在位置的词语的左右列数
    // 由于 findWordAt 是向后找词的，当后面是空格或者md的特殊符号的时候尽量找前面的词加粗，所以判断需不需要往前找
    if (
      A2 > 0 &&
      mdKeyWords.includes(
        cmInstance.getRange({ line: A1, ch: A2 }, { line: A1, ch: A2 + 1 })
      ) &&
      !mdKeyWords.includes(
        cmInstance.getRange({ line: A1, ch: A2 - 1 }, { line: A1, ch: A2 })
      )
    ) {
      A2 -= 1;
    }
    const B1 = cmInstance.findWordAt({ line: A1, ch: A2 }).anchor.ch;
    const B2 = cmInstance.findWordAt({ line: A1, ch: A2 }).head.ch;
    start = { line: A1, ch: B1 };
    end = { line: A1, ch: B2 };
  }

  // 待替换字符串
  const origin = cmInstance.getRange(start, end);

  return {
    start,
    end,
    origin,
    isMultiLines // 是否选中多行
  }
};

/**
 * 简单操作选中/光标所在处的词语，且左右对称的操作，比如加粗，斜体
 * @param mdKeyWord 左右对称的操作的关键字，粗体是 **，斜体是 *
 */
export const operateSimpleCode = (
  cmInstance: any,
  mdKeyWord: string
) => {
  const len = mdKeyWord.length;
  const { start, end, origin, isMultiLines } = currentWordRange(cmInstance);

  // 判断是否是撤销操作
  const before = cmInstance.getRange(
    { line: start.line, ch: start.ch - len },
    { line: start.line, ch: start.ch }
  );
  const after = cmInstance.getRange(
    { line: end.line, ch: end.ch },
    { line: end.line, ch: end.ch + len }
  );
  if (before === mdKeyWord && after === mdKeyWord) {
    // 撤销操作
    cmInstance.replaceRange(
      origin,
      { line: start.line, ch: start.ch - len },
      { line: end.line, ch: end.ch + len }
    );
    cmInstance.setSelection(
      { line: start.line, ch: start.ch - len },
      { line: end.line, ch: isMultiLines ? end.ch : end.ch - len }
    );
  } else {
    // 批量替换
    cmInstance.replaceRange(`${mdKeyWord}${origin}${mdKeyWord}`, start, end);
    cmInstance.setSelection(
      { line: start.line, ch: start.ch + len },
      { line: end.line, ch: isMultiLines ? end.ch : end.ch + len }
    );
  }
  cmInstance.focus();
}

/**
 * 获取选中/光标横跨的行
 */
export const getCurrentLines = (cmInstance: any) => {
  const line1 = cmInstance.listSelections()[0].anchor.line;
  const line2 = cmInstance.listSelections()[0].head.line;
  return {
    start: Math.min(line1, line2),
    end: Math.max(line1, line2)
  }
}

/**
 * 是否有选中东西
 * @param cmInstance
 * @returns
 */
export const isSelectSth = (cmInstance: any) => {
  return !!cmInstance.getSelection();
}

/**
 * 根据当前光标的位置获取下一个可以插入新东西的行
 * 往下找到纯空白的行
 */
export const nextAvaliableLine = (cmInstance: any) => {
  const { end } = getCurrentLines(cmInstance);
  const lineCount = cmInstance.lineCount();
  for (let i = end; ; i += 1) {
    if (i >= lineCount) {
      return {
        line: i,
        needNewLine: true
      };
    }
    const content = cmInstance.getLine(i);
    if (!content || content === '\n') {
      return {
        line: i,
        needNewLine: false
      };
    }
  }
}

/**
 * 总方法表
 */
const operateMap: { [key: string]: Function } = {
  bold(cmInstance: any) {
    operateSimpleCode(cmInstance, '**');
  },
  italics(cmInstance: any) {
    operateSimpleCode(cmInstance, '*');
  },
  quote(cmInstance: any) {
    const { start, end } = getCurrentLines(cmInstance);
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    const content = cmInstance.getSelection();
    cmInstance.replaceSelection('> ' + content.replaceAll('\n', '\n> '));
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    cmInstance.focus();
  },
  enter(cmInstance: any) {
    // 回车键操作，主要是判断 引用/列表 要不要在新行续上 ">"/"-" 符号
    // 如果有选中东西则按常规操作
    if (isSelectSth(cmInstance)) {
      cmInstance.CodeMirrorObj.commands.newlineAndIndent(cmInstance);
      return;
    }
    // 如果光标所在行没有 ">"/"-" 就也是常规操作(找光标之前的内容就好，之前没有 ">"/"-" 也是常规操作)
    const { line, ch } = cmInstance.getCursor();
    const cursorContent = cmInstance.getLine(line).slice(0, ch);
    const trimContent = cursorContent.trim();
    let match = trimContent.match(/^(>|-\s|^[1-9]{1}[0-9]*\.\s)/);
    if (!match) {
      cmInstance.CodeMirrorObj.commands.newlineAndIndent(cmInstance);
      return;
    }
    // 对 match[0] ol 的情况做特殊处理
    const isOl = match[0].endsWith('. ');
    if (isOl && match[0].length > 7) {
      // 有序列表超过6位数就不管了
      cmInstance.CodeMirrorObj.commands.newlineAndIndent(cmInstance);
      return;
    }
    const isUl = match[0].startsWith('-');
    let index = cursorContent.indexOf(match[0]) + (isUl ? 1 : (isOl ? 2 : 0));
    // 找到最后一个 ">"/"-" 到光标位置的非空格元素的位置，这个位置之前的内容作为下一行的前缀
    for (let i = index + 1; i < ch; i += 1) {
      if (!cursorContent[i].match(/\s/) && cursorContent[i] !== match[0]) {
        index = i;
        break;
      }
    }
    const prefix = cursorContent.slice(0, index);
    if (isOl) {
      let count = (+match[0].slice(0, match[0].length - 1)) + 1;
      cmInstance.replaceRange('\n' + prefix.replace(/[1-9]{1}[0-9]*/, count), { line, ch }, { line, ch });
      // 弄完下一行的坐标之后还要循环往下调整坐标
      for (let i = line + 2; ; i += 1, count += 1) {
        const iContent = cmInstance.getLine(i);
        if (!iContent) return;
        const iTrim = iContent.trim();
        const iMatch = iTrim.match(/^[1-9]{1}[0-9]*\.\s/);
        const iCount = iMatch[0].match(/[0-9]*/);
        if (!iMatch || +iCount !== count) return;
        const iIndex = iContent.indexOf(iMatch[0]);
        cmInstance.replaceRange(
          `${count + 1}`,
          { line: i, ch: iIndex },
          { line: i, ch: iCount.length }
        );
      }
    } else {
      cmInstance.replaceRange('\n' + prefix, { line, ch }, { line, ch });
    }
  },
  link(cmInstance: any) {
    const { start, end } = currentWordRange(cmInstance);
    const origin = cmInstance.getRange(start, end);
    cmInstance.replaceRange(`[${origin}](url)`, start, end);
    cmInstance.setSelection(
      { line: end.line, ch: end.ch + 2 + (start.line === end.line ? 1 : 0) },
      { line: end.line, ch: end.ch + 5 + (start.line === end.line ? 1 : 0) }
    );
    cmInstance.focus();
  },
  title(cmInstance: any, [ level ]: Array<string>) {
    const prefix: { [key: string]: string } = {
      '1': '# ',
      '2': '## ',
      '3': '### ',
      '4': '#### ',
      '5': '##### ',
      '6': '###### '
    }
    const { start, end } = getCurrentLines(cmInstance);
    for (let i = start; i <= end; i += 1) {
      const origin = cmInstance.getLine(i);
      const content = origin.trim().replace(/^#*\s*/, prefix[level] || '');
      cmInstance.replaceRange(content, { line: i, ch: 0 }, { line: i, ch: origin.length }, `*title${level}`);
    }
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    cmInstance.focus();
  },
  code(cmInstance: any) {
    operateSimpleCode(cmInstance, '\`');
  },
  codeBlock(cmInstance: any) {
    const { line, needNewLine } = nextAvaliableLine(cmInstance);
    let content = '\n\`\`\`js\n\`\`\`';
    if (needNewLine) content = '\n' + content;
    const endPoint = { line, ch: 0 };
    cmInstance.replaceRange(content, endPoint, endPoint);
    cmInstance.setSelection({ line: line + 1, ch: 3 }, { line: line + 1, ch: 5 });
    cmInstance.focus();
  },
  ul(cmInstance: any) {
    const { start, end } = getCurrentLines(cmInstance);
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    const content = cmInstance.getSelection();
    cmInstance.replaceSelection('- ' + content.replaceAll('\n', '\n- '));
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    cmInstance.focus();
  },
  // ol 跟 ">"/"-" 很像，但要特殊处理
  ol(cmInstance: any) {
    const { start, end } = getCurrentLines(cmInstance);
    for (let i = start; i <= end; i += 1) {
      cmInstance.replaceRange(`${i - start + 1}. `, { line: i, ch: 0 }, { line: i, ch: 0 }, '*ol');
    }
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    cmInstance.focus();
  },
  del(cmInstance: any) {
    operateSimpleCode(cmInstance, '~~');
  },
  table(cmInstance: any) {
    const { line, needNewLine } = nextAvaliableLine(cmInstance);
    let content = '\n| 标题 |  |\n| --- | --- |\n|  |  |';
    if (needNewLine) content = '\n' + content;
    const endPoint = { line, ch: 0 };
    cmInstance.replaceRange(content, endPoint, endPoint);
    cmInstance.setSelection({ line: line + 1, ch: 2 }, { line: line + 1, ch: 4 });
    cmInstance.focus();
  },
  position(cmInstance: any, [ pos ]: Array<string>) {
    const { start, end } = getCurrentLines(cmInstance);
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    const selection = cmInstance.getSelection();
    if (selection.match(/<p\salign=(left|center|right)>.*<\/p>/)) {
      const content = selection.replace(/(<p[\s]*align=).*(>.*<\/p>)/g, `$1${pos}$2`);
      cmInstance.replaceSelection(content);
      cmInstance.setSelection(
        { line: start, ch: 0 },
        { line: end, ch: cmInstance.getLine(end).length }
      );
    } else {
      const res = currentWordRange(cmInstance);
      const start = res.start.line, end = res.end.line;
      if (start === end) {
        const content = cmInstance.getLine(start);
        const prefixLen = 10 + pos.length;
        cmInstance.replaceRange(`</p>`, { line: start, ch: content.length }, { line: start, ch: content.length }, `*position${pos}`);
        cmInstance.replaceRange(`<p align=${pos}>`, { line: start, ch: 0 }, { line: start, ch: 0 }, `*position${pos}`);
        cmInstance.setSelection({ line: start, ch: prefixLen }, { line: start, ch: prefixLen + content.length });
      } else {
        for (let i = start; i <= end; i += 1) {
          const content = cmInstance.getLine(i);
          if (!content) continue;
          const len = content.length;
          cmInstance.replaceRange(`</p>`, { line: i, ch: len }, { line: i, ch: len }, `*position${pos}`);
          cmInstance.replaceRange(`<p align=${pos}>`, { line: i, ch: 0 }, { line: i, ch: 0 }, `*position${pos}`);
        }
        // 扩选
        cmInstance.setSelection(
          { line: start, ch: 0 },
          { line: end, ch: cmInstance.getLine(end).length }
        );
      }
    }
    cmInstance.focus();
  },
  imgShrink(cmInstance: any, [ rate ]: Array<string>) {
    const { start, end } = getCurrentLines(cmInstance);
    // 扩选
    cmInstance.setSelection(
      { line: start, ch: 0 },
      { line: end, ch: cmInstance.getLine(end).length }
    );
    const selection = cmInstance.getSelection();
    // 如果有选中东西，就把其中的 ![]() 以及 <img> 的宽度变成 rate 的值
    if (selection) {
      const res = selection
        .replace(/\!\[(.*)\]\((.*)\)/g, '<img src="$2" alt="$1" width="" />')
        .replace(/(<img[\s]*[^>]*width=['"])[^'"]*(['"][^>]*>)/g, `$1${rate}$2`);
        cmInstance.replaceSelection(res);
      // 扩选
      cmInstance.setSelection(
        { line: start, ch: 0 },
        { line: end, ch: cmInstance.getLine(end).length }
      );
    } else {
      const line = cmInstance.getCursor().line;
      const content = cmInstance.getLine(line);
      const endPoint = { line, ch: content.length };
      if (content.trim().length === 0) {
        cmInstance.replaceRange(`<img src="" alt="" width="${rate}" />`, endPoint, endPoint);
        cmInstance.setSelection({ line, ch: content.length + 10 }, { line, ch: content.length + 10 });
      } else {
        cmInstance.replaceRange(`\n\n\<img src="" alt="" width="${rate}" />`, endPoint, endPoint);
        cmInstance.setSelection({ line: line + 2, ch: 10 }, { line: line + 2, ch: 10 });
      }
    }
    cmInstance.focus();
  },
  formulaInline(cmInstance: any) {
    operateSimpleCode(cmInstance, '$');
  },
  formulaBlock(cmInstance: any) {
    const { line, needNewLine } = nextAvaliableLine(cmInstance);
    let content = '\n\$\$\n\\TeX\n\$\$';
    if (needNewLine) content = '\n' + content;
    const endPoint = { line, ch: 0 };
    cmInstance.replaceRange(content, endPoint, endPoint);
    cmInstance.setSelection({ line: line + 2, ch: 0 }, { line: line + 2, ch: 4 });
    cmInstance.focus();
  },
  mermaid(cmInstance: any, type: string) {
    const { line, needNewLine } = nextAvaliableLine(cmInstance);
    let content = mermaidContent[type];
    if (needNewLine) content = `\n${content}`;
    cmInstance.replaceRange(content, { line, ch: 0 }, { line, ch: 0 });
    cmInstance.focus();
  },
  img(cmInstance: any, url: string) {
    const { line, needNewLine } = nextAvaliableLine(cmInstance);
    let content = `![](${url})`;
    if (needNewLine) content = `\n${content}`;
    cmInstance.replaceRange(content, { line, ch: 0 }, { line, ch: 0 });
    cmInstance.setCursor({ line, ch: 2 });
    cmInstance.focus();
  }
}

/**
 * 总方法，一般直接操作该方法就行
 * 操作编辑器
 * @param cmInstance
 * @param action
 */
export const operateCode4React = (cmInstance: any, action: string, args?: any) => {
  if (!cmInstance) return;
  const splits = action.split('-');
  if (splits.length > 1){
    operateMap[splits[0]](cmInstance, splits.slice(1, splits.length), args);
  } else {
    operateMap[action](cmInstance, args);
  }
};
