import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { translateContent } from '../translate/Translate';
import {
  getPrEmployeeContributions,
  getUserroles
} from '../../reducers/selector';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';

const styles = theme => ({
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '3pt 3pt',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  nestedText: {
    paddingLeft: '0px'
  },
  comment: {
    paddingLeft: '24px',
    paddingRight: '24px',
    color: '#26646d',
    fontStyle: 'italic'
  }
});

class PrSheetEmployee extends React.Component {
  constructor(props) {
    super(props);
    let { employeeContribution } = this.props;
    let comment = employeeContribution.text ? employeeContribution.text : '';
    this.state = {
      commentText: comment
    };
  }

  handleChangeComment = (prById, category) => event => {
    this.setState({ commentText: event.target.value });

    this.sendComment(
      prById,
      category,
      event.target.value,
      this.props.employeeContribution.id
    );
  };

  sendComment = debounce(this.props.addEmployeeContribution, 500);

  render() {
    const {
      prById,
      category,
      classes,
      employeeContribution,
      readOnly,
      isActionPerformer,
      nonActionPerformer,
      errorFlag
    } = this.props;
    const { commentText } = this.state;

    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setOpenEditing(true);
    service.setReadOnlyText(employeeContribution.text);
    service.setWriteableText(commentText);
    service.setErrorFlag(errorFlag);

    return (
      <div>
        <List component="div" disablePadding className={classes.nestedText}>
          <ListItem>
            <Grid container direction={'column'}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <PrTextField
                  fieldId={category + '_CommentId'}
                  state={service.getState()}
                  value={service.getValue()}
                  required
                  label={translateContent(category)}
                  helperText={translateContent(`PLACEHOLDER_${category}`)}
                  onChange={this.handleChangeComment(prById, category)}
                />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrSheetEmployee);
export default connect(
  (state, props) => ({
    userroles: getUserroles(state),
    employeeContribution: getPrEmployeeContributions(props.category)(state)
  }),
  {
    addEmployeeContribution: actions.addEmployeeContribution
  }
)(StyledComponent);
