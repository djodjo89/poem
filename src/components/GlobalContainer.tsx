import Button from '@material-ui/core/Button';
import AlphabetEditor from './AlphabetEditor/AlphabetEditor';
import { GlobalComponent } from './GlobalComponent';
import React, { useState } from 'react';

export default function GlobalContainer() {

  const [alphabetEditorOpened, setAlphabetEditorState] = useState(false);


  const toggleAlphabetEditor = () => setAlphabetEditorState(!alphabetEditorOpened);

  return (
    <>
      <Button
        style={{
          borderRadius: '50px',
          backgroundColor: '#30056b',
          width: '50px',
          minWidth: 0,
          height: '50px',
          margin: '20px',
          zIndex: 2,
          position: 'absolute',
        }}
        onClick={toggleAlphabetEditor}
      >
        P
      </Button>
      {alphabetEditorOpened ? <AlphabetEditor alphabetPath={'alphabet.json'}/> : null}
      <GlobalComponent/>
    </>
  );
}
