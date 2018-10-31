import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { Link } from 'react-router-dom';
import { getAllPrs } from '../../reducers/selector';
import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import { translateContent } from '../translate/Translate';
import { withStyles } from '@material-ui/core';
import PrOverviewReviewerDelegate from './PrOverviewReviewerDelegate';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    return [
      {
        key: 'employee',
        numeric: false,
        disablePadding: false,
        label: 'Mitarbeiter',
        mapper: variable => getDisplayName(variable),
        show: entry => {
          return (
            <Link to={`/prDetail/${entry.id}`}>
              {getDisplayName(entry['employee'])}
            </Link>
          );
        }
      },
      {
        key: 'deadline',
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        show: entry => formatDateForFrontend(entry['deadline'])
      },
      {
        key: 'occasion',
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        mapper: entry => translateContent(entry)
      },
      {
        key: 'supervisor',
        numeric: false,
        disablePadding: true,
        label: 'Vorgesetzte/r',
        mapper: variable => getDisplayName(variable)
      },
      {
        key: 'reviewer',
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        mapper: variable => getDisplayName(variable)
      },
      {
        key: 'employeePreparationDone',
        storeVariable: 'statuses',
        numeric: false,
        disablePadding: true,
        label: 'MA ausgefüllt',
        mapper: entry =>
          entry.includes('FILLED_SHEET_EMPLOYEE') ? 'ja' : 'nein'
      },
      {
        key: 'reviewerPreparationDone',
        storeVariable: 'statuses',
        numeric: false,
        disablePadding: true,
        label: 'Beurteiler ausgefüllt',
        mapper: entry =>
          entry.includes('FILLED_SHEET_REVIEWER') ? 'ja' : 'nein'
      },
      {
        key: 'delegieren',
        numeric: false,
        disablePadding: true,
        label: '',
        mapper: entry => '',
        show: entry => {
          return <PrOverviewReviewerDelegate prId={entry.id} />;
        }
      }
    ];
  };

  render() {
    const columns = this.getColumnDefinitions();
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={columns[1]}
        data={this.props.data}
      />
    );
  }
}

export const StyledComponent = withStyles(styles)(PrOverviewReviewer);
export default connect(
  state => ({
    data: getAllPrs(state),
    isLoading: state.isLoading
  }),
  {
    fetchPrs: actions.fetchPrs
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
