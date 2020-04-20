import fs from 'fs';
import { PoemTitle } from './PoemTitle';
import React, { ReactNode } from 'react';
import { PoemText } from './PoemText';
import { SaveButton } from '../SaveButton';
import { DeleteButton } from '../DeleteButton';
import { AppContextConsumer } from '../../AppContext';
import app = Electron.app;

interface PoemProps {
  id: number,
  titlePlaceholder: string,
  poemPlaceholder: string,
  onDelete: () => void,
}

interface PoemState {
  title: string,
  text: string,
}

export class Poem extends React.PureComponent<PoemProps, PoemState> {

  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }
  render(): ReactNode {
    return (
      <AppContextConsumer>
        {appContext => {
          appContext.poems.set(
            this.props.id,
            {
              title: this.state.title,
              text: this.state.text,
            }
          );

          return (
            <article>
              <header>
                <PoemTitle
                  onChange={(event: any) => this.setState({ title: appContext.cypherer.obfuscate(event.target.value) })}
                  placeholder={this.props.titlePlaceholder}
                  value={this.state.title}
                />
              </header>
              <section
                style={{
                  width: '100%',
                }}
              >
                <PoemText
                  onChange={(event: any) => this.setState({ text: appContext.cypherer.obfuscate(event.target.value) })}
                  placeholder={this.props.poemPlaceholder}
                  value={this.state.text}
                />
              </section>
              <footer
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <SaveButton
                  savePath={(path: string) => fs.promises.writeFile(`${path}/${appContext.cypherer.deobfuscate(this.state.title)}.txt`, appContext.cypherer.deobfuscate(this.state.text))}
                >
                  Enregistrer
                </SaveButton>
                <DeleteButton
                  delete={this.props.onDelete}
                >
                  Supprimer
                </DeleteButton>
              </footer>
            </article>
          );
        }
        }
      </AppContextConsumer>
    );
  }
}
