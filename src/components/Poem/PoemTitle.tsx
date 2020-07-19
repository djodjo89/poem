import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import './PoemTitle.css';

interface PoemTitleProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemTitle = (props: PoemTitleProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  return <InputBase
    placeholder={props.placeholder}
    autoFocus
    style={{
      color: '#ffffff !important',
      fontSize: '1.5em',
      width: '15em',
    }}
    value={props.value}
    onChange={props.onChange}
    onFocus={e => e.preventDefault()}
    onDoubleClick={() => setIsDisabled(false)}
    onMouseLeave={() => setIsDisabled(true)}
    disabled={isDisabled}
  />;
}
