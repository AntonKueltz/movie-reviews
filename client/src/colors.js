import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ff4081',
      dark: '#9ea7aa',
      contrastText: '#000',
    },
    secondary: {
      light: '#6d6d6d',
      main: '#84ffff',
      dark: '#0097a7',
      contrastText: '#fff',
    },
  },
});