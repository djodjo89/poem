import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import * as electron from 'electron';
import OpenDialogReturnValue = Electron.OpenDialogReturnValue;

interface SaveButtonProps {
  savePath: (path: string) => void,
  children: any,
}

export const SaveButton: React.FC<SaveButtonProps> = (props: SaveButtonProps) => {
  const save = async (): Promise<void> =>
    electron.remote.dialog.showOpenDialog({
      properties: [
        'openDirectory',
        'multiSelections',
      ]
    })
      .then((selection: OpenDialogReturnValue) =>
        props.savePath(selection.filePaths[0]));

  return (
    <Button
      variant={'outlined'}
      size={'large'}
      startIcon={<SaveIcon />}
      onClick={save}
    >
      {props.children}
    </Button>
  );
};
