import { createMuiTheme } from '@material-ui/core/styles';

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
  900: '#002129'
};

const secondaryColorPalette = {
  main: '#01A688',
  green: '#01A688',
  darkGreen: '#004953',
  blue: '#56D9FE',
  darkBlue: '#007FFF',
  purple: '#A3A0FB',
  yellow: '#FFCE00',
  darkYellow: '#FFBA00',
  brightGrey: '#EAF0F4',
  brighterGrey: '#F2F2F2',
  grey: '#B3B3B3',
  mediumGrey: '#9B9AA0',
  darkGrey: '#4D4F5C',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FABCB7',
  darkRed: '#F44336',
  brightBlue: '#B3D9FF'
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: senacorColorPalette,
    secondary: secondaryColorPalette,
    contrastThreshold: 3,
    contrastText: secondaryColorPalette.white
  },
  styledComponents: {
    card: {
      flexGrow: 1,
      margin: 24,
      textDecoration: 'none',
      width: '100%'
    },
    cardTitle: {
      marginBottom: 16
    },
    cardParagraph: {
      lineHeight: 2
    },
    progressBarCentered: {
      width: '100%',
      paddingTop: 16,
      textAlign: 'center'
    },
    tableContent: {
      width: '100%',
      textAlign: 'center',
      overflow: 'auto'
    }
  }
});

export default theme;
