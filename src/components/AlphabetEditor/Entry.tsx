import React from 'react';
import { DeleteButton } from '../DeleteButton';

interface EntryProps {
  origin: string,
  translation: string,
  updateTranslation: (event: any) => void,
  delete: (param: any) => void,
}

export default function Entry(props: EntryProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        color: 'black',
      }}
    >
      <div>
        <p>{props.origin}</p>
      </div>
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <input
          type={'text'}
          maxLength={1}
          onChange={props.updateTranslation}
          value={props.translation}
          style={{
            height: '2.3em',
            textAlign: 'center',
          }}
        />
      </div>
      <div
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
      </div>
    </div>
  )
}
