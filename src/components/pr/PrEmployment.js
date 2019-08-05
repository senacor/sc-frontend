import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ObjectGet from 'object-get';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  title: {
    color: theme.palette.primary['400']
  },
  listItems: {
    paddingLeft: '20px'
  }
});

//TODO: unused component, delete ?
class PrEmployment extends React.Component {
  render() {
    const { prById, classes, intl } = this.props;

    if (ObjectGet(this.props, 'prById.employee.employment') == null) {
      return null;
    }
    return (
      <Paper>
        {prById.employee.employment &&
        prById.employee.employment.endOfProbationPeriod ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({
                      id: 'premployment.endofprobationperiod'
                    })}
                  </Typography>
                  <Typography className={classes.listItems}>
                    {`${moment(
                      prById.employee.employment.endOfProbationPeriod
                    ).format('DD.MM.YY')}`}
                  </Typography>
                </div>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        ) : null}
        {prById.employee.employment &&
        prById.employee.employment.leaves.maternityLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({
                      id: 'premployment.maternityprotection'
                    })}
                  </Typography>

                  {prById.employee.employment.leaves.maternityLeave.map(
                    maternityLeave => (
                      <Typography
                        className={classes.listItems}
                        key={prById.employee.employment.leaves.maternityLeave.indexOf(
                          maternityLeave
                        )}
                      >
                        {`${moment(maternityLeave.from).format(
                          'DD.MM.YY'
                        )} ${this.props.intl.formatMessage({
                          id: 'datefilter.to'
                        })} ${moment(maternityLeave.to).format('DD.MM.YY')}`}
                      </Typography>
                    )
                  )}
                </div>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        ) : null}
        {prById.employee.employment &&
        prById.employee.employment.leaves.parentalLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({
                      id: 'premployment.parentalleave'
                    })}
                  </Typography>

                  {prById.employee.employment.leaves.parentalLeave.map(
                    parentalLeave => (
                      <Typography
                        className={classes.listItems}
                        key={prById.employee.employment.leaves.parentalLeave.indexOf(
                          parentalLeave
                        )}
                      >
                        {` ${moment(parentalLeave.from).format(
                          'DD.MM.YY'
                        )} ${this.props.intl.formatMessage({
                          id: 'datefilter.to'
                        })} ${moment(parentalLeave.to).format('DD.MM.YY')}`}
                      </Typography>
                    )
                  )}
                </div>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        ) : null}
        {prById.employee.employment &&
        prById.employee.employment.leaves.sabbatical ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({
                      id: 'premployment.sabbatical'
                    })}
                  </Typography>
                  {prById.employee.employment.leaves.sabbatical.map(
                    sabbatical => (
                      <Typography
                        className={classes.listItems}
                        key={prById.employee.employment.leaves.sabbatical.indexOf(
                          sabbatical
                        )}
                      >
                        {` ${moment(sabbatical.from).format(
                          'DD.MM.YY'
                        )} ${this.props.intl.formatMessage({
                          id: 'datefilter.to'
                        })} ${moment(sabbatical.to).format('DD.MM.YY')}`}
                      </Typography>
                    )
                  )}
                </div>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        ) : null}
        {prById.employee.employment &&
        prById.employee.employment.leaves.unpaidLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({
                      id: 'premployment.unpaid'
                    })}
                  </Typography>
                  {prById.employee.employment.leaves.unpaidLeave.map(
                    unpaidLeave => (
                      <Typography
                        className={classes.listItems}
                        key={prById.employee.employment.leaves.unpaidLeave.indexOf(
                          unpaidLeave
                        )}
                      >
                        {` ${moment(unpaidLeave.from).format(
                          'DD.MM.YY'
                        )} ${this.props.intl.formatMessage({
                          id: 'datefilter.to'
                        })} ${moment(unpaidLeave.to).format('DD.MM.YY')}`}
                      </Typography>
                    )
                  )}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : null}
      </Paper>
    );
  }
}
export default injectIntl(withStyles(styles)(PrEmployment));
