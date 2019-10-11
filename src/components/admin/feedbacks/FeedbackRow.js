import React, { Fragment, useState } from 'react';
import { getReadableDate } from '../../../helper/date';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import FeedbackDetailDialog from './FeedbackDetailDialog';
import Checkbox from '@material-ui/core/Checkbox';

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
  },
  checkboxCell: {
    padding: 0
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
  selected,
  changeSelectedItem,
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
          <TableCell className={classes.checkboxCell}>
            <Checkbox
              checked={selected}
              onChange={() => changeSelectedItem(id)}
            />
          </TableCell>
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
