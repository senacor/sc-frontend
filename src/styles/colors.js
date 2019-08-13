import { createMuiTheme } from '@material-ui/core/styles/index';

const senacorColorPalette = {
  50: '#e0e9ea',
  100: '#b3c8cb',
  200: '#80a4a9',
  300: '#4d8087',
  400: '#26646d',
  500: '#004953',
  600: '#00424c',
  700: '#003942',
  800: '#003139',
  900: '#002129',
  A100: '#56d9fe',
  G100: '#fafafa',
  G200: '#f5f6fa',
  G300: '#9b9aa0',
  G500: '#4d4f5c',
  W000: '#ffffff',
  contrastDefaultColor: 'light'
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: senacorColorPalette,
    contrastThreshold: 3,
    contrastText: '#fff'
  }
});

export default theme;
