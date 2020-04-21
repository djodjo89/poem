import React from 'react';
import styled from 'styled-components';
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
    }}
    multiline
    rows={10}
    value={props.value}
    onChange={props.onChange}/>
);
