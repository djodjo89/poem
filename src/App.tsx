import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalComponent } from './components/GlobalComponent';
import { Container, createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { AppContextInterface, AppContextProvider } from './AppContext';
import { Cypherer } from './model/Chypherer';
import { Mapping } from './model/Mapping';
import AlphabetEditor from './components/AlphabetEditor/AlphabetEditor';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#3f3e59',
    },
    primary: blue,
    secondary: {
      main: pink[100]
    },
    type: 'dark',
  },
});

const appContext: AppContextInterface = {
  poems: new Map(),
  cypherer: new Cypherer(new Mapping()),
};

ReactDOM.render(
  <Container
    style={{
      maxWidth: '100%',
      padding: '0px',
    }}
  >
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <AppContextProvider value={appContext}>
        <GlobalComponent/>
      </AppContextProvider>
    </MuiThemeProvider>
  </Container>,
    document.getElementById('root')
);
