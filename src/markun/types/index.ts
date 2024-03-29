import { CSSProperties } from "react";

export type Theme =
'3024-day' |
'3024-night' |
'abbott' |
'abcdef' |
'ambiance-mobile' |
'ambiance' |
'ayu-dark' |
'ayu-mirage' |
'base16-dark' |
'base16-light' |
'bespin' |
'blackboard' |
'cobalt' |
'colorforth' |
'darcula' |
'dracula' |
'duotone-dark' |
'duotone-light' |
'eclipse' |
'elegant' |
'erlang-dark' |
'gruvbox-dark' |
'hopscotch' |
'icecoder' |
'idea' |
'isotope' |
'juejin' |
'lesser-dark' |
'liquibyte' |
'lucario' |
'material-darker' |
'material-ocean' |
'material-palenight' |
'material' |
'mbo' |
'mdn-like' |
'midnight' |
'monokai' |
'moxer' |
'neat' |
'neo' |
'night' |
'nord' |
'oceanic-next' |
'panda-syntax' |
'paraiso-dark' |
'paraiso-light' |
'pastel-on-dark' |
'railscasts' |
'rubyblue' |
'seti' |
'shadowfox' |
'solarized' |
'ssms' |
'the-matrix' |
'tomorrow-night-bright' |
'tomorrow-night-eighties' |
'ttcn' |
'twilight' |
'vibrant-ink' |
'xq-dark' |
'xq-light' |
'yeti' |
'yonce' |
'zenburn';

export type Highlight =
'coy' |
'dark' |
'funky' |
'okaidia' |
'solarizedlight' |
'tomorrow' |
'twilight' |
'prism' |
'a11yDark' |
'atomDark' |
'base16AteliersulphurpoolLight' |
'cb' |
'coldarkCold' |
'coldarkDark' |
'coyWithoutShadows' |
'darcula' |
'dracula' |
'duotoneDark' |
'duotoneEarth' |
'duotoneForest' |
'duotoneLight' |
'duotoneSea' |
'duotoneSpace' |
'ghcolors' |
'gruvboxDark' |
'gruvboxLight' |
'holiTheme' |
'hopscotch' |
'lucario' |
'materialDark' |
'materialLight' |
'materialOceanic' |
'nightOwl' |
'nord' |
'oneDark' |
'oneLight' |
'pojoaque' |
'shadesOfPurple' |
'solarizedDarkAtom' |
'synthwave84' |
'vs' |
'vscDarkPlus' |
'xonokai' |
'zTouch';

export interface MarkunProps {
  style?: CSSProperties | undefined;
  className?: string | undefined;
  code: string;
  defaultTheme?: Theme;
  defaultHighlight?: Highlight;
  onImgUpload: (file: File) => Promise<string>;
  fullScreen?: () => void;
  onCodeChange: (code: string) => void;
  onHighlightChange?: (highlight: Highlight) => void;
}

export interface MarkunRef {
  getHtml: () => string;
}

export interface RendererProps {
  className?: string | undefined;
  code: string;
  highlight: string;
  onRenderFinished?: () => void;
}

export interface RendererRef {
  root: HTMLDivElement | null;
}
