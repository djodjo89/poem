import React, { useState, useEffect } from 'react';
import Entry from './Entry';
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import './AlphabetEditor.css';

export default function AlphabetEditor() {
  const [translations, setEntries] = useState<Map<string, string>>(new Map());
  const addEntry = () => Swal.fire({
    title: 'Ajouter une lettre à l\'alphabet',
    icon: 'question',
    html: `
      <div style="display: flex; flex-direction: row; justify-content: space-around">
        <input id="swal-input1" class="swal2-input">
        <input id="swal-input2" class="swal2-input">
      </div>
    `,
    preConfirm: function () {
      return new Promise(function (resolve) {
        const input1: any = document.getElementById('swal-input1');
        const input2: any = document.getElementById('swal-input2');
        resolve([
          input1.value,
          input2.value,
        ])
      })
    },
    onOpen: function () {
      const input1: any = document.getElementById('swal-input1');
      input1.focus();
    }
  }).then(result => {
    const copy: Map<string, string> = new Map(translations);
    copy.set(result.value[0], result.value[1]);
    setEntries(copy);
  });
  const deleteEntry = (origin: string) => {
    const copy: Map<string, string> = new Map(translations);
    copy.delete(origin);
    setEntries(copy);
    Swal.fire({
      title: 'Traduction supprimée !',
    });
  };

  useEffect(() => console.log(translations));

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: 'black',
      }}
    >
      <div
        style={{
          borderRadius: '20px',
          backgroundColor: 'white',
          width: '80%',
          height: '80%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Editeur d'alphabet</h1>
        {(() => [...translations.entries()].map((entry, index) =>
          translations.size !== 0
            ? <Entry key={index} origin={entry[0]} translation={entry[1]} delete={() => deleteEntry(entry[0])} updateTranslation={e => {
              const value: string = e.target.value;
              if (value.length === 1 && value !== entry[1]) {
                const copy: Map<string, string> = new Map(translations);
                const copySize: number = copy.size;
                copy.set(entry[0], value);
                const newCopySize: number = copy.size;
                if (copySize === newCopySize) {
                  Swal.fire({
                    title: 'Désolé, ça n\'a pas marché : (',
                    text: 'Cette lettre était déjà dans la liste',
                    icon: 'warning',
                  });
                } else {
                  setEntries(copy);
                }
              }
            }} />
            : <p>Tu n'as pas encore de traduction, n'hésite à tester des trucs !</p>
        ))()}

        <Button
          onClick={addEntry}
          style={{
            backgroundColor: '#3f3e59',
            width: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          Ajouter une traduction
        </Button>
      </div>
    </div>
  )
}
