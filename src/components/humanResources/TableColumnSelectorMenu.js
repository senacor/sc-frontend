import React from 'react';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TableColumnSelector from './TableColumSelector';
import Tooltip from '@material-ui/core/Tooltip';

export default class TableColumnSelectorMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      selectedContent: this.createSelectedContent(props.content),
      isUnselectedContent: false
    };
  }

  createSelectedContent = content => {
    let result = [];
    content.forEach(entry => {
      result.push({ label: entry.label, checked: true, value: entry.value });
    });
    return result;
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = event => {
    this.setState({
      anchorEl: null
    });
  };

  handleChange = content => {
    let result = [];
    content.forEach(entry => {
      if (entry.checked) {
        result.push(entry.value);
      }
    });

    this.setState({
      selectedContent: content,
      isUnselectedContent: content.length !== result.length
    });

    this.props.onChange(result);
  };

  getIcon = () => {
    return this.state.isUnselectedContent ? (
      <Icon>visibility_off</Icon>
    ) : (
      <Icon>visibility</Icon>
    );
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Tooltip title={'Spalten ein-/ausblenden'} key={'column-visibility'}>
          <IconButton onClick={this.handleClick}>
            {this.getIcon(this.props.subfilter)}
          </IconButton>
        </Tooltip>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <TableColumnSelector
            selectedContent={this.state.selectedContent}
            onChange={this.handleChange}
          />
        </Popover>
      </div>
    );
  }
}
