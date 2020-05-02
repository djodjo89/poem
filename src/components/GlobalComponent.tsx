import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import { Postit } from './Postit/Postit';
import { PostitModel } from '../model/PostitModel';
import { ColorGenerator } from '../model/ColorGenerator';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { remote } from 'electron';
import { AppContext } from '../AppContext';
import * as electron from "electron";
import OpenDialogReturnValue = Electron.OpenDialogReturnValue;
import fs from "fs";

interface GlobalComponentState {
  postits: PostitModel[];
  currentPostitId: number,
  deletingPostit: boolean,
  postitToDeleteId: number,
}

export class GlobalComponent extends React.PureComponent<any, GlobalComponentState> {
  private poemPlaceholder: string = 'Ecris ton poème ici';
  private titlePlaceholder: string = 'Ecris le titre de ton poème ici';
  private colorGenerator: ColorGenerator;
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      postits: [],
      currentPostitId: 0,
      deletingPostit: false,
      postitToDeleteId: -1,
    };

    this.colorGenerator = new ColorGenerator(['#ffffff', '#3f3e59']);

    const sendEvent = () =>
      electron.remote.dialog.showOpenDialog({
        properties: [
          'openDirectory',
          'multiSelections',
        ]
      })
        .then((selection: OpenDialogReturnValue) =>
          [...this.context.poems.entries()].forEach(
            entry => fs.promises.writeFile(
              `${selection.filePaths[0]}/${this.context.cypherer.deobfuscate(entry[1].title)}.txt`, this.context.cypherer.deobfuscate(entry[1].text)
            )
          )
        );

    const fileMenuItem: any =
      {
        label: 'Fichier',
        submenu: [
          // {label: 'New', click: sendEvent('file-new')},
          // {label: 'Open', click: OpenFile},
          // {label: 'Save', click: sendEvent('file-save')},
          {label: 'Sauvergarder sous', click: () => sendEvent()},
          // {label: 'Close', click: sendEvent('file-close')},
          // {type: 'separator'},
          // {label: 'Quit', click: () => remote.app.quit()}
        ],
      };


    const template: any[] = [
      fileMenuItem,
    ];

    const menu: any = remote.Menu.buildFromTemplate(template);
    remote.Menu.setApplicationMenu(menu);
  }



  toFirstPlan = (id: number) => {
    this.forceUpdate();
    this.setState({
      currentPostitId: id,
    });
  };

  askConfirmation = (id: number) => {
    Swal.fire({
      title: 'Supprimer ce poème',
      text: 'Attention, si tu ne l\'as pas sauvegardé son contenu sera perdu',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yup, vas-y !',
      cancelButtonText: 'Noooooooooooon !',
    }).then((result: SweetAlertResult) => {
        if (result.value) {
          Swal.fire(
            'Ca y est',
            'Le poème a été supprimé comme demandé',
            'success',
          );
          this.setState({
            deletingPostit: true,
            postitToDeleteId: id,
          }, () => this.deletePostit())
        } else {
          Swal.fire(
            'Annulation',
            'Ton poème va bien... pour l\'instant 😈',
            'error',
          );
        }
      }
    );
  }

  deletePostit = () => this.setState((state: GlobalComponentState) => {
      return {
        postits: state.postits.slice().filter(postit => postit.id !== this.state.postitToDeleteId),
        deletingPostit: false,
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
        postitsCopy.push({
          id: state.postits.length,
          key: state.postits.length,
          x: x,
          y: y,
          poemPlaceholder: this.poemPlaceholder,
          titlePlaceholder: this.titlePlaceholder,
          askConfirmation: this.askConfirmation,
          colors: this.colorGenerator.colors.slice(),
          toFirstPlan: this.toFirstPlan,
          firstPlan: true,
        });
        return {
          postits: postitsCopy,
        };
      });
    }
  };

  render(): ReactNode {
    return (
      <Box
        style={{ height: '100vh', width: '100%', outline: 'none' }}
        onClick={this.addPostIt}
        onMouseDown={this.addPostIt}
        tabIndex={0}
      >
        {this.state.postits.map(
          (posit: PostitModel) => {
            const {
              id,
              key,
              x,
              y,
              poemPlaceholder,
              titlePlaceholder,
              askConfirmation,
              colors,
              toFirstPlan,
            } = posit;

            return (
              <Postit
                id={id}
                key={key}
                x={x}
                y={y}
                poemPlaceholder={poemPlaceholder}
                titlePlaceholder={titlePlaceholder}
                deletePostit={askConfirmation}
                colors={colors}
                toFirstPlan={toFirstPlan}
                firstPlan={this.state.currentPostitId === id}
              />
            );
          }
        )}
      </Box>
    )
  }
}
