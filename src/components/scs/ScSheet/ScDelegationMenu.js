import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import EmployeeFilter from '../../admin/EmployeeFilter';
import Button from '@material-ui/core/Button';
import getDisplayName from '../../../helper/getDisplayName';
import { saveDelegation } from '../../../calls/sc';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  saveBtn: {
    margin: 2 * theme.spacing.unit
  },
  root: {
    padding: 3 * theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  heading: {
    flex: '1 1 auto'
  },
  names: {
    display: 'flex',
    '& p:not(:first-child)': {
      paddingLeft: theme.spacing.unit
    }
  }
});

const ScDelegationMenu = ({
  classes,
  sc,
  intl,
  employees,
  info,
  error,
  activeDelegationButtons
}) => {
  const [scReviewers, setScReviewers] = useState({
    reviewer1: sc.reviewer1,
    reviewer2: sc.reviewer2
  });
  const [selectedReviewer1, setSelectedReviewer1] = useState(sc.reviewer1);
  const [selectedReviewer2, setSelectedReviewer2] = useState(sc.reviewer2);

  const addReviewer = employee => {
    if (selectedReviewer1) {
      setSelectedReviewer2(employee);
    } else {
      setSelectedReviewer1(employee);
    }
  };

  const im = id =>
    intl.formatMessage({
      id: id
    });

  const supervisorAndReviewersText = () => {
    //Supervisor: Michal Beres,
    let resultText = `${im('sc.supervisor')} ${getDisplayName(
      sc.supervisor
    )}, `;

    //Supervisor: Michael Beres, Kein Reviewer
    if (!selectedReviewer1 && !selectedReviewer2) {
      resultText += im('sc.no.reviewer');
      return resultText;
    }

    //Supervisor: Michael Beres, Beurteiler: Boris Kollar
    if (
      (selectedReviewer1 && !selectedReviewer2) ||
      (!selectedReviewer1 && selectedReviewer2)
    ) {
      resultText += `${im('sc.reviewer')} ${getDisplayName(
        selectedReviewer1 ? selectedReviewer1 : selectedReviewer2
      )}`;
      return resultText;
    }

    //Supervisor: Michael Beres, 1. Beurteiler: Boris Kollar, 2. Beurteiler: Katharina Kollar
    resultText += `${im('sc.firstReviewer')} ${getDisplayName(
      selectedReviewer1
    )}, ${im('sc.secondReviewer')} ${getDisplayName(selectedReviewer2)}`;
    return resultText;
  };

  const employeesMenu = employees
    ? employees.filter(e => {
        if (selectedReviewer1 && selectedReviewer1.id === e.id) {
          return false;
        }
        return !(selectedReviewer2 && selectedReviewer2.id === e.id);
      })
    : [];

  const reviewersUpdated = () => {
    const checkFields = (oldField, newField) => {
      if (!oldField && !newField) return false;
      if ((!oldField && newField) || (oldField && !newField)) return true;
      if (oldField.id !== newField.id) return true;
    };
    return (
      checkFields(scReviewers.reviewer1, selectedReviewer1) ||
      checkFields(scReviewers.reviewer2, selectedReviewer2)
    );
  };

  const saveDelegationChanges = () => {
    const data = {
      reviewer1Id: selectedReviewer1 ? selectedReviewer1.id : null,
      reviewer2Id: selectedReviewer2 ? selectedReviewer2.id : null
    };
    const afterDelegation = () => {
      setScReviewers({
        reviewer1: selectedReviewer1,
        reviewer2: selectedReviewer2
      });
    };
    saveDelegation(sc.id, data, info, error, afterDelegation);
  };

  return (
    <Fragment>
      <div className={classes.names}>
        <Typography variant="body2" color="textSecondary">
          {supervisorAndReviewersText()}
        </Typography>
      </div>
      {activeDelegationButtons && (
        <div className={classes.names}>
          {selectedReviewer1 && (
            <EmployeeFilter
              data={employeesMenu}
              setSelectedEmployee={setSelectedReviewer1}
              delegation={'sc.reviewerbutton.edit.1'}
            />
          )}
          {selectedReviewer2 && (
            <EmployeeFilter
              data={employeesMenu}
              setSelectedEmployee={setSelectedReviewer2}
              delegation={'sc.reviewerbutton.edit.2'}
            />
          )}
          {(!selectedReviewer1 || !selectedReviewer2) && (
            <EmployeeFilter
              data={employeesMenu}
              setSelectedEmployee={addReviewer}
              delegation={'sc.reviewerbutton.add'}
            />
          )}
          {reviewersUpdated() && (
            <Button
              className={classes.saveBtn}
              variant="contained"
              color="secondary"
              onClick={saveDelegationChanges}
            >
              {intl.formatMessage({
                id: 'sc.reviewerbutton.save'
              })}
            </Button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScDelegationMenu));
