export interface Code4ReactProps {
  options: any;
  code: string;
  onChange?: (text: string) => void;
  onChangeRaw?: (cm: any, change: any) => void;
  onScrollRaw?: (cm: any) => void;
}

export interface Code4ReactRef {
  cmInstance: any;
}
