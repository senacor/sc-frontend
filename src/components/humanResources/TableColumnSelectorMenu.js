import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TableColumnSelector from './TableColumSelector';
import Tooltip from '@material-ui/core/Tooltip';
import { injectIntl } from 'react-intl';

const TableColumnSelectorMenu = props => {
  const createSelectedContent = content => {
    let result = [];
    content.forEach(entry => {
      result.push({ label: entry.label, checked: true, value: entry.value });
    });
    return result;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContent, setSelectedContent] = useState(
    createSelectedContent(props.content)
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
    content.forEach(entry => {
      if (entry.checked) {
        result.push(entry.value);
      }
    });

    setSelectedContent(content);
    setIsUnselectedContent(content.length !== result.length);

    props.onChange(result);
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
    <div>
      <Tooltip
        title={props.intl.formatMessage({
          id: 'tablecolumnselectormenu.columnvisibility'
        })}
        key={'column-visibility'}
      >
        <IconButton onClick={handleClick}>
          {getIcon(props.subfilter)}
        </IconButton>
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

export default injectIntl(TableColumnSelectorMenu);
