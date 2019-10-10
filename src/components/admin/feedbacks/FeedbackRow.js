import React, { Fragment, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { getReadableDate } from '../../../helper/date';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import FeedbackDetailDialog from './FeedbackDetailDialog';

const styles = theme => ({
  ...theme.styledComponents,
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  },
  tableRow: {
    height: 80,
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      transition: 'all 0.3s',
      backgroundColor: theme.palette.secondary.brighterGrey
    }
  },
  cell: {
    padding: theme.spacing.unit * 2
  },
  subjectCell: {
    overflowWrap: 'break-word',
    maxWidth: 150,
    padding: theme.spacing.unit * 2
  },
  bodyCell: {
    overflowWrap: 'break-word',
    minWidth: 150,
    padding: theme.spacing.unit * 2
  }
});

const FeedbackRow = ({
  classes,
  intl,
  entry: {
    id,
    senderfirstName,
    senderLastName,
    context,
    subject,
    body,
    sentAt
  },
  handleOnDeleteClick,
  isLoading
}) => {
  const [dialogDetailsOpen, setDialogDetailsOpen] = useState(false);

  const handleDialogDetailsOpen = () => {
    setDialogDetailsOpen(true);
  };

  const handleDialogDetailsClose = () => {
    setDialogDetailsOpen(false);
  };

  if (!isLoading) {
    return (
      <Fragment>
        <TableRow className={classes.tableRow}>
          <TableCell
            onClick={handleDialogDetailsOpen}
            className={classes.cell}
          >{`${senderfirstName} ${senderLastName}`}</TableCell>
          <TableCell onClick={handleDialogDetailsOpen} className={classes.cell}>
            {context}
          </TableCell>
          <Tooltip
            title={subject}
            placement="bottom"
            disableHoverListener={subject.length < 20}
          >
            <TableCell
              onClick={handleDialogDetailsOpen}
              className={classes.subjectCell}
            >
              {subject.length >= 40 ? `${subject.slice(0, 40)}...` : subject}
            </TableCell>
          </Tooltip>
          <TableCell
            onClick={handleDialogDetailsOpen}
            className={classes.bodyCell}
          >
            {body.length >= 80 ? `${body.slice(0, 80)}...` : body}
          </TableCell>
          <TableCell onClick={handleDialogDetailsOpen} className={classes.cell}>
            {getReadableDate(sentAt)}
          </TableCell>
          <TableCell className={classes.cell}>
            <IconButton
              onClick={event => handleOnDeleteClick(event, id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <FeedbackDetailDialog
          dialogDetailsOpen={dialogDetailsOpen}
          handleDialogDetailsClose={handleDialogDetailsClose}
          message={body}
          subject={subject}
          senderFirstName={senderfirstName}
          senderLastName={senderLastName}
          context={context}
        />
      </Fragment>
    );
  }
};

export default injectIntl(withStyles(styles)(FeedbackRow));
