import React, { ReactNode } from "react";
import { Box } from '@material-ui/core';
import { Postit } from './Postit/Postit';
import { ColorGenerator } from '../model/ColorGenerator';

interface GlobalComponentState {
  postits: any[];
}

export class GlobalComponent extends React.PureComponent<any, GlobalComponentState> {
  private poemPlaceholder: string = 'Ecris ton poème ici';
  private titlePlaceholder: string = 'Ecris le titre de ton poème ici';
  private colorGenerator: ColorGenerator;

  constructor(props: any) {
    super(props);
    this.state = {
      postits: [],
    };
    this.colorGenerator = new ColorGenerator(3, ['#ffffff']);
  }

  deletePostit = (id: number) => this.setState((state: GlobalComponentState) => {
      return {
        postits: state.postits.slice().filter(postit => postit.props.id !== id),
      };
    }
  );

  addPostIt = (event: any) => {
    const click: any = event.nativeEvent;
    if (click.which === 3) {
      const x: any = parseInt(click.offsetX);
      const y: any = parseInt(click.offsetY);
      this.colorGenerator.generateColors();
      this.setState((state: GlobalComponentState) => {
        const postitsCopy: any[] = state.postits.slice();
        postitsCopy.push(<Postit
          id={state.postits.length}
          key={state.postits.length}
          x={x}
          y={y}
          poemPlaceholder={this.poemPlaceholder}
          titlePlaceholder={this.titlePlaceholder}
          deletePostit={this.deletePostit}
          colors={this.colorGenerator.colors}
        />);
        return {
          postits: postitsCopy,
        };
      });
    }
  };

  render(): ReactNode {
    return (
      <Box
        style={{ height: '100vh', width: '100vh', outline: 'none' }}
        onClick={this.addPostIt}
        onMouseDown={this.addPostIt}
        tabIndex={0}
      >
        {this.state.postits}
      </Box>
    )
  }
}
