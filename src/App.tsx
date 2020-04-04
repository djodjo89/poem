import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalComponent } from './components/GlobalComponent';
import { Container, createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

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

ReactDOM.render(
  <Container
    style={{
      maxWidth: '100%',
      padding: '0px',
    }}
  >
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalComponent/>
    </MuiThemeProvider>
  </Container>,
    document.getElementById('root')
);
