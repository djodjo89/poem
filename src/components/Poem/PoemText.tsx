import React from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';

interface PoemTextProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemText = styled((props: PoemTextProps) => (
  <InputBase
    placeholder={props.placeholder}
    style={{
      color: '#3f3e59',
    }}
    multiline
    rows={10}
    value={props.value}
    onChange={props.onChange}/>
))`
    width: 100%;
    height: 100%;
`;
