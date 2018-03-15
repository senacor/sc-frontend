import { createMuiTheme } from 'material-ui/styles';

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
  A100: '#63d7ff',
  A200: '#30c9ff',
  A400: '#00bbfc',
  A700: '#00a8e3',
  contrastDefaultColor: 'light'
};

const theme = createMuiTheme({
  palette: {
    primary: senacorColorPalette,
    contrastThreshold: 3,
    contrastText: '#fff'
  }
});

export default theme;
