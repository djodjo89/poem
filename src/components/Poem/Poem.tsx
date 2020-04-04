import fs from 'fs';
import { PoemTitle } from './PoemTitle';
import React, { ReactNode } from 'react';
import { PoemText } from './PoemText';
import { SaveButton } from '../SaveButton';
import { Cypherer } from '../../model/Chypherer';
import { Mapping } from '../../model/Mapping';

interface PoemProps {
  titlePlaceholder: string,
  poemPlaceholder: string,
}

interface PoemState {
  title: string,
  text: string,
}

export class Poem extends React.PureComponent<PoemProps, PoemState> {
  private cypherer: Cypherer;

  constructor(props: any) {
    super(props);
    this.cypherer = new Cypherer(new Mapping());
    this.state = {
      title: '',
      text: '',
    };
  }

  onTitleChange = (event: any) => this.setState({ title: this.cypherer.obfuscate(event.target.value) });
  onTextChange = (event: any) => this.setState({ text: this.cypherer.obfuscate(event.target.value) });
  save = (path: string) => fs.promises.writeFile(`${path}/${this.cypherer.deobfuscate(this.state.title)}.txt`, this.cypherer.deobfuscate(this.state.text));

  render(): ReactNode {
    return (
      <article>
        <header>
          <PoemTitle
            onChange={this.onTitleChange}
            placeholder={this.props.titlePlaceholder}
            value={this.state.title}
          />
        </header>
        <section>
          <PoemText
            onChange={this.onTextChange}
            placeholder={this.props.poemPlaceholder}
            value={this.state.text}
          />
        </section>
        <footer>
          <SaveButton
            savePath={this.save}
          >
            Enregistrer
          </SaveButton>
        </footer>
      </article>
    );
  }
}
