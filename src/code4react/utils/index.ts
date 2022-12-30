/**
 * 忽略自动提示的 token
 */
const ignore = [
  '',
  '#',
  '!',
  '-',
  '=',
  '@',
  '$',
  '%',
  '&',
  '+',
  ';',
  '(',
  ')',
  '*',
  '{',
  '}',
  '[',
  ']',
  '()',
  '{}',
  '[]',
  ' ',
  '  ',
  '    '
];

export const ignoreToken = (text: string) => {
  if (text && text[0]) {
    for (const pre in ignore) {
      if (ignore[pre] === text[0]) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};

let timeoutObj: NodeJS.Timeout;
export const timeout = (fun: Function, delay: number) => {
  if (timeoutObj) clearTimeout(timeoutObj);
  timeoutObj = setTimeout(() => {
    fun();
  }, delay);
};
