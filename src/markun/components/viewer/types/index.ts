export interface ViewerProps {
  code: string;
  highlight: string;
  isListenTreeChange: boolean;
  onScroll?: Function;
}

export interface ViewerRef {
  root: HTMLDivElement | null;
  tree?: any;
}
