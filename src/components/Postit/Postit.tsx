import React from 'react';
import { Button, withTheme } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Poem } from '../Poem/Poem';
import Draggable from 'react-draggable';
import { palette } from '@material-ui/system';
import styled, { StyledComponent } from 'styled-components';
import { ResizableBox } from 'react-resizable';

interface PostitProps {
  id: number,
  key: number,
  x: number,
  y: number,
  poemPlaceholder: string,
  titlePlaceholder: string,
  deletePostit: (key: number) => void,
  colors: string[],
}

/*const StyledBox: StyledComponent<any, any> = styled(Box)`
  background-color: ${theme.secondary};
`;*/

export const Postit: React.FC<PostitProps> = (props: PostitProps) => (
  <ResizableBox
    height={100}
    width={100}
  >
    <Draggable
      handle={'strong'}
      defaultPosition={{x: props.x, y: props.y}}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        className={'box no-cursor'}
        style={{
          backgroundColor: props.colors[0],
        }}
        css={{
          position: 'absolute',
        }}
      >
        <strong
          className={'cursor'}
        >
          <div
            style={{
              backgroundColor: props.colors[1],
              textAlign: 'center',
              fontSize: '2em',
              fontWeight: 'normal',
            }}
          >
            Poème {props.id + 1}
          </div>
        </strong>
        <Poem
          titlePlaceholder={props.titlePlaceholder}
          poemPlaceholder={props.poemPlaceholder}
        />
        <Button
          onClick={() => props.deletePostit(props.id)}
        >
          Supprimer
        </Button>
      </Box>
    </Draggable>
  </ResizableBox>
);
/*
export const Postit = (props: string) => withTheme(styled(PostitRaw)`
  background-color: ${props.theme.primary}
`*/