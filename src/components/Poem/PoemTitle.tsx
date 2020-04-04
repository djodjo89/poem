import { InputBase } from '@material-ui/core';
import React from 'react';

interface PoemTitleProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemTitle = (props: PoemTitleProps) =>
  (<InputBase
    autoFocus
    style={{
      fontSize: '2.9em',
      color: '#3f3e59',
    }}
    color={'primary'}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
  />);
