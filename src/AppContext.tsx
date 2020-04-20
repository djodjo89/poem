import * as React from 'react';
import { PoemModel } from './model/PoemModel';
import { Cypherer } from './model/Chypherer';
import { Mapping } from './model/Mapping';

export interface AppContextInterface {
  poems: Map<number, PoemModel>,
  cypherer: Cypherer,
}

export const AppContext = React.createContext<AppContextInterface>({
  poems: new Map(),
  cypherer: new Cypherer(new Mapping()),
});

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
