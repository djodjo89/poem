import React, { useState, useEffect } from 'react';
import Entry from './Entry';
import { Button } from '@material-ui/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import './AlphabetEditor.css';
import fs from 'fs';
import Grid from '@material-ui/core/Grid';
import * as oo from 'json8';

interface AlphabetEditorProps {
  alphabetPath: string
}

export default function AlphabetEditor(props: AlphabetEditorProps) {
  const objToStrMap = (obj: any) => {
    const strMap = new Map();
    Object.keys(obj).map(entry => strMap.set(entry, obj[entry]));
    return strMap;
  };
  const alphabet = () => objToStrMap(JSON.parse(fs.readFileSync(props.alphabetPath).toString()));

  const [translations, setEntries] = useState<Map<string, string>>(alphabet());

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
  }).then((result: SweetAlertResult) => {
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
  const save = async () => {
    try {
      const file = oo.serialize(translations);
      await fs.promises.writeFile(props.alphabetPath, file);
    } catch(e) {
      Swal.fire({
        title: 'Crotte de bique, ça a foiré',
        icon: 'error',
        text: 'Il doit y avoir une erreur avec l\'alphabet, essaie d\'y jeter un coup d\'oeil',
      });
    }
    Swal.fire({
      title: 'Ça alors, ça fonctionne !',
      icon: 'success',
      text: 'Tout roule, désormais tu peux utiliser ton nouvel alphabet',
    })
  };

  return (
    <Grid
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: 'black',
        padding: '5%',
      }}
    >
      <Grid
        container
        item
        xs={12}
        sm={10}
        md={10}
        lg={6}
        justify={'center'}
        style={{
          borderRadius: '20px',
          backgroundColor: 'white',
          margin: 'auto',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Editeur d'alphabet</h1>
        <Grid
          container
          item
          justify={'center'}
        >
          {(() => [...translations.entries()].map((entry, index) =>
            translations.size !== 0
              ? <Entry key={index} origin={entry[0]} translation={entry[1]} delete={() => deleteEntry(entry[0])} updateTranslation={e => {
                const value: string = e.target.value;
                const copy: Map<string, string> = new Map(translations);
                copy.set(entry[0], value);
                setEntries(copy);
              }} />
              : <p>Tu n'as pas encore de traduction, n'hésite à tester des trucs !</p>
          ))()}
        </Grid>
        <Grid
          container
          item
          spacing={2}
          direction={'row'}
          justify={'center'}
          alignItems={'center'}
          style={{
            paddingBottom: '1em',
          }}
        >
          <Grid
            item
            container
            xs={6}
          >
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
          </Grid>
          <Grid
            item
            container
            xs={6}
          >
            <Button
              onClick={save}
              style={{
                backgroundColor: '#3f3e59',
                width: '50%',
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              Sauvegarder
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
