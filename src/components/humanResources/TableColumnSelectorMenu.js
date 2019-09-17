import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import TableColumnSelector from './TableColumSelector';

const styles = theme => ({
  spacing: {
    margin: theme.spacing.unit
  }
});

const TableColumnSelectorMenu = ({
  classes,
  content,
  onChange,
  intl,
  subfilter,
  tab
}) => {
  const createSelectedContent = content => {
    let result = [];
    let columnsChecked;
    if (tab === 'OWN_PRS') {
      columnsChecked = JSON.parse(localStorage.getItem('columnsCheckedOwn'));
    } else if (tab === 'PRS_FOR_PROCESSING') {
      columnsChecked = JSON.parse(
        localStorage.getItem('columnsCheckedProcessing')
      );
    } else if (tab === 'ALL_PRS') {
      columnsChecked = JSON.parse(localStorage.getItem('columnsCheckedAll'));
    }

    content.forEach((entry, index) => {
      result.push({
        label: entry.label,
        checked: columnsChecked[index],
        value: entry.value
      });
    });
    return result;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContent, setSelectedContent] = useState(
    createSelectedContent(content)
  );
  const [isUnselectedContent, setIsUnselectedContent] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = content => {
    let result = [];
    let columnsChecked = [];
    content.forEach(entry => {
      if (entry.checked) {
        result.push(entry.value);
        columnsChecked.push(true);
      } else {
        columnsChecked.push(false);
      }
    });

    if (result.length === 0) {
      return;
    }
    setSelectedContent(content);
    setIsUnselectedContent(content.length !== result.length);

    if (tab === 'OWN_PRS') {
      localStorage.setItem('columnsCheckedOwn', JSON.stringify(columnsChecked));
    } else if (tab === 'PRS_FOR_PROCESSING') {
      localStorage.setItem(
        'columnsCheckedProcessing',
        JSON.stringify(columnsChecked)
      );
    } else if (tab === 'ALL_PRS') {
      localStorage.setItem('columnsCheckedAll', JSON.stringify(columnsChecked));
    }
    onChange(result);
  };

  const getIcon = () => {
    return isUnselectedContent ? (
      <Icon>visibility_off</Icon>
    ) : (
      <Icon>visibility</Icon>
    );
  };

  const open = Boolean(anchorEl);
  return (
    <div className={classes.spacing}>
      <Tooltip
        title={intl.formatMessage({
          id: 'tablecolumnselectormenu.columnvisibility'
        })}
        key={'column-visibility'}
      >
        <IconButton onClick={handleClick}>{getIcon(subfilter)}</IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <TableColumnSelector
          selectedContent={selectedContent}
          onChange={handleChange}
        />
      </Popover>
    </div>
  );
};

export default injectIntl(withStyles(styles)(TableColumnSelectorMenu));
