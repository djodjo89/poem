import React from 'react';
import {DeleteRounded} from '@material-ui/icons';
import { Button } from '@material-ui/core';

interface DeleteButtonProps {
  delete: (param: any) => void,
  children: any,
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => (
  <Button
    variant={'outlined'}
    size={'large'}
    startIcon={<DeleteRounded />}
    onClick={props.delete}
    style={{
      backgroundColor: 'red'
    }}
    >
    {props.children}
  </Button>
);
