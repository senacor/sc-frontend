import FILTER_GROUPS from '../components/humanResources/filterGroups';
import TABLE_PRS_ELEMENTS from '../components/pr/tablePrsElements';

class DefaultFilterService {
  constructor(userId) {
    this.userId = userId;
  }

  prsToReviewFilter = () => {
    return {
      filterGroup: FILTER_GROUPS.REVIEWER,
      filterBy: TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE,
      filter: {
        searchString: 'reviewerPreparationDone=false&reviewer=' + this.userId,
        values: ''
      }
    };
  };

  ownIncompletePrsFilter = () => {
    return {
      filterGroup: FILTER_GROUPS.EMPLOYEE,
      filterBy: TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE,
      filter: {
        searchString: 'employeePreparationDone=false',
        values: ''
      }
    };
  };

  prsAsSupervisorFilter = () => {
    return {
      filterGroup: FILTER_GROUPS.REVIEWER,
      filterBy: TABLE_PRS_ELEMENTS.SUPERVISOR,
      filter: {
        searchString: 'supervisor=' + this.userId,
        values: ''
      }
    };
  };

  prsAsSupervisorAndInProgressFilter = () => {
    return {
      filterGroup: FILTER_GROUPS.REVIEWER,
      filterBy: TABLE_PRS_ELEMENTS.SUPERVISOR,
      filter: {
        searchString: `supervisor=${this.userId}&inProgress=true`,
        values: ''
      }
    };
  };

  prsAsReviewerFilter = () => {
    return {
      filterGroup: FILTER_GROUPS.REVIEWER,
      filterBy: TABLE_PRS_ELEMENTS.REVIEWER,
      filter: {
        searchString: 'reviewer=' + this.userId,
        values: ''
      }
    };
  };
}
export default DefaultFilterService;
