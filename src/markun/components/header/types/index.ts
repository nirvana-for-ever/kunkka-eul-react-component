import { Theme, Highlight } from './../../../types/index';

export interface MarkunHeaderProps {
  theme: string;
  highlight: string;
  curSize: 'normal' | 'short';
  themeChange: (theme: Theme) => void;
  highlightChange: (theme: Highlight) => void;
  operateCode: (action: string) => void;
  fullScreen: () => void;
}
