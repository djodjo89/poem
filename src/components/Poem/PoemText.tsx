import React, { useState } from 'react';
import { InputBase } from '@material-ui/core';

interface PoemTextProps {
  onChange: (event: any) => void,
  placeholder: string,
  value: string,
}

export const PoemText = (props: PoemTextProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  return <InputBase
    placeholder={props.placeholder}
    style={{
      color: 'white',
      width: '100%',
      padding: '5px',
    }}
    multiline
    rows={10}
    value={props.value}
    onChange={props.onChange}
    onFocus={e => e.preventDefault()}
    onDoubleClick={() => setIsDisabled(false)}
    onMouseLeave={() => setIsDisabled(true)}
    disabled={isDisabled}
  />;
}
