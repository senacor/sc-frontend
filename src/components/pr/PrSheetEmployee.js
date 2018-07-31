import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { isSupervisor } from '../../helper/checkRole';
import Typography from '@material-ui/core/Typography';
import { translateContent } from '../translate/Translate';
import {
  getUserroles,
  getPrEmployeeContributions
} from '../../reducers/selector';

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
    this.state = {
      prVisible: this.props.prVisible
    };
  }

  handleChangeComment = (prById, category) => event => {
    this.setState({ text: event.target.value });

    this.props.employeeContribution.text = event.target.value;
    this.sendComment(
      prById,
      category,
      event.target.value,
      this.props.employeeContribution.id
    );
  };

  sendComment = debounce(this.props.addEmployeeContribution, 500);

  render() {
    const { prById, category, classes, employeeContribution } = this.props;
    return (
      <div>
        <List component="div" disablePadding className={classes.nestedText}>
          <ListItem>
            <Grid container direction={'column'}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography component="p">
                  {translateContent(category)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {isSupervisor(this.props.userroles) ? (
                  <Typography
                    id={category + '_Description'}
                    className={classes.comment}
                    variant="body1"
                  >
                    {employeeContribution.text && this.state.prVisible
                      ? employeeContribution.text
                      : 'Noch kein Eintrag'}
                  </Typography>
                ) : (
                  <TextField
                    id={category + '_CommentId'}
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    margin="none"
                    helperText={translateContent(`PLACEHOLDER_${category}`)}
                    value={
                      employeeContribution.text ? employeeContribution.text : ''
                    }
                    onChange={this.handleChangeComment(prById, category)}
                    InputProps={{
                      disableUnderline: true,
                      name: 'comment',
                      classes: {
                        input: classes.bootstrapInput
                      }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
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
