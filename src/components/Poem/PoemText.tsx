import React from 'react';
import { InputBase } from '@material-ui/core';

interface PoemTextProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemText = (props: PoemTextProps) => (
  <InputBase
    placeholder={props.placeholder}
    style={{
      color: '#ffffff',
      width: '100%',
      marginLeft: '5px',
    }}
    multiline
    rows={10}
    value={props.value}
    onChange={props.onChange}/>
);
