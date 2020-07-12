import { InputBase } from '@material-ui/core';
import React from 'react';

interface PoemTitleProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemTitle = (props: PoemTitleProps) =>
  <InputBase
    autoFocus
    style={{
      color: '#ffffff',
      width: '15em',
      textAlign: 'left',
      marginLeft: '5px',
    }}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
  />;
