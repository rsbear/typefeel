export interface ITheme {
  isDarkTheme: boolean;
  borders: string[];
  breakpoints: number[];
  colors: {
    background: string;
    dividerColor: string;
    text: string;
    primaryAccent: string;
  };
  mediaQueries: {
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
    hover: string;
  };
  grid: any;
  space: any;
  typeSizes: any;
}
