const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  root: {
    width: '25%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  buttonMobile: {
    position: 'fixed',
    left: '80%',
    bottom: '10%'
  },
  icon: {
    position: 'fixed',
    left: '84%',
    bottom: '13%'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  filterDesktop: {
    padding: '2px 10px',
    borderRadius: '5px'
  },
  list: {
    backgroundColor: theme.palette.primary['400'],
    marginBottom: '5px'
  },
  openList: {
    backgroundColor: theme.palette.primary['200'],
    marginBottom: '5px'
  },
  typography: {
    color: theme.palette.primary['50'],
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  typographyDone: {
    color: theme.palette.primary['50'],
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  typographyGreen: {
    color: '#40bf40',
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  listItem: {
    textAlign: 'center',
    padding: '0'
  },
  divItemText: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardColumn: {
    alignSelf: 'top',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)',
    backgroundColor: 'inherit',
    marginBottom: '20px'
  },
  title: {
    backgroundColor: theme.palette.primary['200'],
    color: '#FFF',
    height: '40px',
    textAlign: 'center',
    paddingTop: '15px'
  },
  cardContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '74%',
    justifyContent: 'space-around'
  },
  cardColumnSheet: {
    width: '40%',
    alignSelf: 'top',
    backgroundColor: 'inherit',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)'
  },

  cardContainerColumn: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  buttonList: {
    fontSize: '0.675rem',
    textTransform: 'none',
    padding: '0'
  }
});

export default styles;
