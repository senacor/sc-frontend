import React, { useContext } from 'react';
import PrDelegate from '../PrDelegate';
import getDisplayName from '../../../helper/getDisplayName';
import Typography from '@material-ui/core/Typography/Typography';
import { prStatusEnum } from '../../../helper/prStatus';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { PrContext } from '../../App';

const styles = {
  list: {
    margin: '0px',
    padding: '0px'
  }
};

const ShowReviewer = ({ prefix, pr, classes, intl, username }) => {
  const { setValue: setPr } = useContext(PrContext.context);
  const prDelegable = pr => {
    return (
      pr.supervisor.login === username &&
      pr.statusSet.includes(prStatusEnum.RELEASED_SHEET_REVIEWER) === false
    );
  };

  return prDelegable(pr) ? (
    <List className={classes.list}>
      <ListItem className={classes.list}>
        <Typography variant={'body2'} color={'textSecondary'}>
          {`${prefix}`}
        </Typography>
        <PrDelegate
          pr={pr}
          startValue={
            pr.supervisor.id !== pr.reviewer.id
              ? getDisplayName(pr.reviewer)
              : ''
          }
          defaultText={intl.formatMessage({
            id: 'showreviewer.nothandedover'
          })}
          isDelegated={pr.supervisor.id !== pr.reviewer.id}
          color={'textSecondary'}
          updatePr={setPr}
        />
      </ListItem>
    </List>
  ) : (
    <Typography variant={'body2'} color={'textSecondary'}>
      {pr.supervisor.id === pr.reviewer.id
        ? ''
        : `${prefix}${getDisplayName(pr.reviewer)}`}
    </Typography>
  );
};

export const StyledComponent = withStyles(styles)(ShowReviewer);
export default injectIntl(StyledComponent);
