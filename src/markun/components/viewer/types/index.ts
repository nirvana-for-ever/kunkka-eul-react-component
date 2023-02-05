export interface ViewerProps {
  code: string;
  highlight: string;
  curSize: 'normal' | 'short';
  isListenTreeChange: boolean;
  onScroll?: Function;
}

export interface ViewerRef {
  root: HTMLDivElement | null;
  tree?: any;
}
