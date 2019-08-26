import React, { useContext, useState } from 'react';
import { UserinfoContext } from '../App';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TableColumnSelector from './TableColumSelector';
import Tooltip from '@material-ui/core/Tooltip';
import { injectIntl } from 'react-intl';

const TableColumnSelectorMenu = ({ content, onChange, intl, subfilter }) => {
  const userinfoContext = useContext(UserinfoContext.context);
  const getRole = () => {
    if (userinfoContext.value.userroles.includes('PR_Mitarbeiter')) {
      return 'PR_Mitarbeiter';
    } else if (userinfoContext.value.userroles.includes('PR_CST_Leiter')) {
      return 'PR_CST_Leiter';
    } else if (userinfoContext.value.userroles.includes('PR_HR')) {
      return 'PR_HR';
    }
  };

  const role = getRole();
  const createSelectedContent = content => {
    let result = [];
    let columnsChecked;
    if (role === 'PR_Mitarbeiter') {
      columnsChecked = JSON.parse(
        localStorage.getItem('columnsCheckedEmployee')
      );
    } else if (role === 'PR_CST_Leiter') {
      columnsChecked = JSON.parse(
        localStorage.getItem('columnsCheckedSupervisor')
      );
    } else if (role === 'PR_HR') {
      columnsChecked = JSON.parse(localStorage.getItem('columnsCheckedHr'));
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

    if (role === 'PR_Mitarbeiter') {
      localStorage.setItem(
        'columnsCheckedEmployee',
        JSON.stringify(columnsChecked)
      );
    } else if (role === 'PR_CST_Leiter') {
      localStorage.setItem(
        'columnsCheckedSupervisor',
        JSON.stringify(columnsChecked)
      );
    } else if (role === 'PR_HR') {
      localStorage.setItem('columnsCheckedHr', JSON.stringify(columnsChecked));
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
    <div>
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

export default injectIntl(TableColumnSelectorMenu);
