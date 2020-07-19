import Button from '@material-ui/core/Button';
import AlphabetEditor from './AlphabetEditor/AlphabetEditor';
import { GlobalComponent } from './GlobalComponent';
import React, { useState } from 'react';
import logoSrc from '../../static/images/logo-poem.svg';

export default function GlobalContainer() {
  const [alphabetEditorOpened, setAlphabetEditorState] = useState(false)

  const toggleAlphabetEditor = () =>
    setAlphabetEditorState(!alphabetEditorOpened)

  return (
    <>
      <Button
        style={{
          borderRadius: '50px',
          width: '50px',
          minWidth: 0,
          height: '50px',
          margin: '20px',
          zIndex: 2,
          position: 'absolute',
        }}
        onClick={toggleAlphabetEditor}
      >
        <img src={logoSrc} alt="logo" style={{
          width: '32px',
          height: '32px',
        }} />
      </Button>
      {alphabetEditorOpened ? (
        <AlphabetEditor alphabetPath={'alphabet.json'} />
      ) : null}
      <GlobalComponent />
    </>
  )
}
