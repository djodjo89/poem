import React from 'react';
import { DeleteButton } from '../DeleteButton';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import './Entry.css';

interface EntryProps {
  origin: string,
  translation: string,
  updateTranslation: (event: any) => void,
  delete: (param: any) => void,
}

export default function Entry(props: EntryProps) {
  return (
    <Grid
      container
      item
      style={{ color: 'black' }}
      spacing={2}
      xs={12}
      justify={'center'}
      alignItems={'center'}
    >
      <Grid
        item
        xs={4}
        style={{ textAlign: 'center' }}
      >
        <p>{props.origin}</p>
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <TextField
          type={'text'}
          onChange={props.updateTranslation}
          value={props.translation}
          style={{
            height: '2.3em',
            textAlign: 'center',
          }}
        />
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <DeleteButton
          delete={props.delete}
          style={{
            height: '2.3em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Supprimer
        </DeleteButton>
      </Grid>
    </Grid>
  )
}
