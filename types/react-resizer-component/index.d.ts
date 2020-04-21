declare module 'react-resizer-component' {
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';

  export interface LayoutProps extends React.Props<any>{
    width?: number,
    height?: number,
    resize?: string,
    background?: string,
    backgroundRepeat?: string,
    backgroundSize?: string,
    overflow?: string,
    backgroundImage?: string,
  }

  export class Layout extends React.PureComponent<LayoutProps, any> {
    constructor(props?: LayoutProps, context?: any);
  }

  export default Layout;
}
