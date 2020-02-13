import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  withStyles
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import PublishIcon from '@material-ui/icons/Publish';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Button from '@material-ui/core/Button';
import { getAllPatches, uploadPatchFile } from '../../../calls/admin';

const styles = theme => ({
  containerPaper: {
    margin: 3 * theme.spacing.unit,
    padding: theme.spacing.unit,
    paddingBottom: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  outdatedHint: {
    width: '100%',
    color: theme.palette.secondary.darkRed
  },
  statusIconSuccess: {
    color: theme.palette.secondary.green
  },
  statusIconFailure: {
    color: theme.palette.secondary.darkRed
  },
  btn: {
    backgroundColor: theme.palette.primary[400],
    color: theme.palette.secondary.white
  },
  publishIcon: {
    marginRight: theme.spacing.unit
  },
  title: {
    padding: 2 * theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '2rem'
    },
    '& h5': {
      paddingLeft: theme.spacing.unit
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  description: {
    padding: 2 * theme.spacing.unit,
    display: 'flex',
    alignItems: 'center'
  },
  fileFormatHint: {
    color: theme.palette.secondary.darkYellow
  }
});

const DatabasePatchesPanel = ({ classes, intl }) => {
  const [patchInfo, setPatchInfo] = useState({
    patches: [],
    outdated: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState('desc');

  let error = useErrorContext();
  let info = useInfoContext();

  useEffect(() => {
    getAllPatches(setPatchInfo, setIsLoading, error);
  }, []);

  const handleSort = () => {
    sortDirection === 'asc'
      ? setSortDirection('desc')
      : setSortDirection('asc');
  };

  const { patches } = patchInfo;
  patches.sort((first, second) => {
    if (sortDirection === 'asc') {
      return first.id - second.id;
    } else {
      return second.id - first.id;
    }
  });

  const callPatch = event => {
    const updatePatchInfo = responsePatchInfo => {
      //responsePatchInfo contains only last patch and current status of outdated flag
      if (!responsePatchInfo.patches || !responsePatchInfo.patches.length > 0) {
        error.showGeneral();
        return;
      }

      const newPatch = responsePatchInfo.patches[0];
      const newPatches = [...patchInfo.patches, newPatch];
      if (!newPatch.successful) {
        error.showGeneral();
      } else {
        info.msg('fissyncs.patch.success');
      }
      const newPatchInfo = {
        outdated: responsePatchInfo.outdated,
        patches: newPatches
      };
      setPatchInfo(newPatchInfo);
    };

    uploadPatchFile(
      event.target.files[0],
      setIsLoading,
      updatePatchInfo,
      info,
      error
    );
  };

  return (
    <Paper className={classes.containerPaper}>
      <div className={classes.title}>
        <Typography variant="h5">
          {intl.formatMessage({ id: 'sidebar.fissyncs' })}
        </Typography>
      </div>

      <div className={classes.description}>
        <Typography variant="body1">
          {intl.formatMessage({ id: 'fissyncs.description' })}
        </Typography>
      </div>

      <div className={classes.description}>
        <Typography variant="body1" className={classes.fileFormatHint}>
          {intl.formatMessage({ id: 'fissyncs.fileformathint' })}
        </Typography>
      </div>

      {patchInfo.outdated && (
        <div className={classes.description}>
          <Typography variant="body1" className={classes.outdatedHint}>
            {intl.formatMessage({ id: 'fissyncs.outdatedhint' })}
          </Typography>
        </div>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Button variant="contained" component="label" className={classes.btn}>
            <PublishIcon className={classes.publishIcon} />
            {intl.formatMessage({ id: 'fissyncs.btn.upload' })}
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={callPatch}
            />
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={sortDirection}
                    onClick={handleSort}
                  >
                    {intl.formatMessage({ id: 'fissyncs.date' })}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ id: 'fissyncs.status' })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patches.map(entry => {
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {' '}
                      {formatLocaleDateTime(
                        entry.date,
                        FRONTEND_DATE_FORMAT
                      )}{' '}
                    </TableCell>
                    <TableCell>
                      {entry.successful ? (
                        <CheckCircleOutlineIcon
                          className={classes.statusIconSuccess}
                        />
                      ) : (
                        <HighlightOffIcon
                          className={classes.statusIconFailure}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Fragment>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(DatabasePatchesPanel));
