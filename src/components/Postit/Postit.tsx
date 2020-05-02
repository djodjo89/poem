import React from 'react';
import { Box } from '@material-ui/core';
import { Poem } from '../Poem/Poem';
import Draggable from 'react-draggable';
import Layout from 'react-resizer-component';

interface PostitProps {
  id: number,
  key: number,
  x: number,
  y: number,
  poemPlaceholder: string,
  titlePlaceholder: string,
  deletePostit: (id: number) => void,
  colors: string[],
  toFirstPlan: (id: number) => void,
  firstPlan: boolean,
}

export const Postit: React.FC<PostitProps> = (props: PostitProps) => (
  <Draggable
    handle={'strong'}
    defaultPosition={{x: props.x, y: props.y}}
    onDrag={() => props.toFirstPlan(props.id)}
  >
    <Box
      display={'flex'}
      flexDirection={'column'}
      className={'box no-cursor'}
      style={{
        zIndex: (props.firstPlan ? 1 : 0),
        backgroundColor: props.colors[0],
        borderRadius: '3px',
      }}
      onFocus={() => props.toFirstPlan(props.id)}
      onClick={() => props.toFirstPlan(props.id)}
      css={{
        position: 'absolute',
      }}
    >
      <Layout
        width={550}
        height={370}
      >
        <strong
          className={'cursor'}
          style={{
            userSelect: 'none',
          }}
          onClick={() => props.toFirstPlan(props.id)}
          onFocus={() => props.toFirstPlan(props.id)}
        >
          <div
            style={{
              backgroundColor: props.colors[1],
              textAlign: 'center',
              fontSize: '2em',
              fontWeight: 'normal',
              cursor: 'move',
            }}
          >
            {props.id + 1}
          </div>
        </strong>
        <Poem
          id={props.id}
          titlePlaceholder={props.titlePlaceholder}
          poemPlaceholder={props.poemPlaceholder}
          onDelete={() => props.deletePostit(props.id)}
        />
      </Layout>
    </Box>
  </Draggable>
);
