import React, { useContext } from 'react';
import { injectIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography/Typography';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { withStyles } from '@material-ui/core';

import { PrContext } from '../App';
import { prStatusEnum } from '../../helper/prStatus';
import PrDelegate from './PrDelegate';
import getDisplayName from '../../helper/getDisplayName';

const styles = () => ({
  list: {
    margin: 0,
    padding: 0
  }
});

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

export default injectIntl(withStyles(styles)(ShowReviewer));
