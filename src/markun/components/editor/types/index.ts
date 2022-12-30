export interface EditorProps {
  theme: string;
  onCodeChange: (code: string) => void;
  onImgUpload: (file: File) => Promise<string>;
  onScroll?: (cm: any) => void;
}

export interface EditorRef {
  operateCode: (action: string) => void;
  cmInstance: any;
}
