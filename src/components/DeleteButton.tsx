import React, { CSSProperties } from 'react';
import {DeleteRounded} from '@material-ui/icons';
import { Button } from '@material-ui/core';

interface DeleteButtonProps {
  delete: (param: any) => void,
  children: any,
  style?: CSSProperties,
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  let newStyle: CSSProperties = { backgroundColor: 'red' };
  if (props.style) {
    newStyle = Object.assign(props.style, newStyle);
  }

  return (
    <Button
      variant={'outlined'}
      size={'large'}
      startIcon={<DeleteRounded />}
      onClick={props.delete}
      style={newStyle}
    >
      {props.children}
    </Button>
  );
}
