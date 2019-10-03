import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 3 * theme.spacing.unit,
    marginBottom: 0,
    textDecoration: 'none'
  },
  title: {
    marginBottom: 2 * theme.spacing.unit
  }
});

const PrsInProgressDialog = ({ classes, intl }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [newPath, setNewPath] = useState('');

  const dialogClose = () => {
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    setDialogOpened(true);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item sm={6}>
          <Card className={classes.card} onClick={dialogOpen}>
            <CardContent>
              <Typography className={classes.title} variant="h5">
                {intl.formatMessage({
                  id: 'dashboard.prsInProgress'
                })}
                :
              </Typography>
              <Typography color="textSecondary">Hello world</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} />
      </Grid>
      <Dialog open={dialogOpened} onClose={dialogClose}>
        <DialogContent>
          <IconButton onClick={dialogClose}>x</IconButton>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PrsInProgressDialog));
