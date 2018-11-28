import React from 'react';
import { StyledComponent } from './PrSheet';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../helper/roles';
import { prStatusEnum } from '../../helper/prStatus';
import PrSheetEmployee from './PrSheetEmployee';
import PrOverallAssessment from './PrOverallAssessment';
import PrFinalCommentHr from './PrFinalCommentHr';
import PrFinalCommentEmployee from './PrFinalCommentEmployee';
import PrComment from './PrComment';

describe('PrSheet Fill-in', () => {
  let shallow = createShallow({ dive: true });

  const prById = { id: 1 };

  const fetchVisibilityMock = jest.fn();

  let isActionPerformer = (pr, component) => {
    let element = pr.find(component).map(field => field.get(0).props);
    let subelement = element[0];
    switch (true) {
      case element.includes({ isActionPerformer: true }):
        return true;
      case subelement.isActionPerformer === true:
        return true;
      default:
        return false;
    }
  };

  let nonActionPerformer = (pr, component) => {
    let element = pr.find(component).map(field => field.get(0).props);
    let subelement = element[0];
    switch (true) {
      case element.includes({ nonActionPerformer: true }):
        return true;
      case subelement.nonActionPerformer === true:
        return true;
      default:
        return false;
    }
  };

  let readOnly = (pr, component) => {
    let element = pr.find(component).map(field => field.get(0).props);
    let subelement = element[0];
    switch (true) {
      case element.includes({ readOnly: true }):
        return true;
      case subelement && subelement.readOnly === true:
        return true;
      default:
        return false;
    }
  };

  let errorElement = (pr, component) => {
    let element = pr.find(component).map(field => field.get(0).props);
    let subelement = element[0];
    switch (true) {
      case element.includes({ errorFlag: true }):
        return true;
      case subelement.errorFlag === true:
        return true;
      default:
        return false;
    }
  };

  let userEmployee = {
    login: 'test.pr.mitarbeiter1',
    userroles: [ROLES.PR_MITARBEITER],
    userPrincipalName: 'test.pr.mitarbeiter1'
  };
  let userReviewer = {
    login: 'test.pr.mitarbeiter2',
    userroles: [ROLES.PR_MITARBEITER],
    userPrincipalName: 'test.pr.mitarbeiter2'
  };
  let userCst = {
    login: 'test.pr.vorgesetzter',
    userroles: [ROLES.PR_CST_LEITER],
    userPrincipalName: 'test.pr.vorgesetzter'
  };
  let userHr = {
    login: 'test.pr.hr',
    userroles: [ROLES.PR_HR],
    userPrincipalName: 'test.pr.hr'
  };
  let statusEmptyEmployee = {
    statuses: [],
    requiredFields: { reviewer: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'INVISIBLE',
      visibilityToEmployee: 'INVISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    }
  };
  let statusFilledEmployee = {
    statuses: [prStatusEnum.RELEASED_SHEET_EMPLOYEE],
    requiredFields: { employee: true, reviewer: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'VISIBLE',
      visibilityToEmployee: 'INVISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    }
  };
  let statusEmptyReviewer = {
    statuses: [prStatusEnum.RELEASED_SHEET_EMPLOYEE],
    requiredFields: { employee: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'VISIBLE',
      visibilityToEmployee: 'INVISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    }
  };
  let statusFilledReviewer = {
    statuses: [
      prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      prStatusEnum.RELEASED_SHEET_REVIEWER
    ],
    requiredFields: { employee: true, reviewer: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'VISIBLE',
      visibilityToEmployee: 'VISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    }
  };
  let statusFinalizedReviewer = {
    statuses: [
      prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      prStatusEnum.RELEASED_SHEET_REVIEWER,
      prStatusEnum.FINALIZED_REVIEWER
    ],
    requiredFields: { employee: true, reviewer: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'VISIBLE',
      visibilityToEmployee: 'VISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'FINALIZED'
    }
  };
  let statusFinalizedEmployee = {
    statuses: [
      prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      prStatusEnum.RELEASED_SHEET_REVIEWER,
      prStatusEnum.FINALIZED_REVIEWER,
      prStatusEnum.FINALIZED_EMPLOYEE
    ],
    requiredFields: { employee: true, reviewer: true },
    prVisibilityEntry: {
      visibilityToReviewer: 'VISIBLE',
      visibilityToEmployee: 'VISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'FINALIZED',
      finalizationStatusOfReviewer: 'FINALIZED'
    }
  };
  let prComponent = (status, user) => {
    let pr = Object.assign({}, prById, status, {
      employee: userEmployee,
      reviewer: userReviewer,
      supervisor: userCst
    });
    return shallow(
      <StyledComponent
        prById={pr}
        fetchPrVisibilityById={fetchVisibilityMock}
        userroles={user.userroles}
        userinfo={user}
        requiredFields={status.requiredFields}
      />
    );
  };

  it('should mark the reflection fields as error elements, identify the employee correctly as Action- or non-Action-Performer, and not be in Read-only state for anything', () => {
    let pr1 = prComponent(statusEmptyEmployee, userEmployee);

    expect(pr1).toMatchSnapshot();

    expect(errorElement(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr1, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr1, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr1, PrComment)).toBe(false);
    expect(readOnly(pr1, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr1, PrSheetEmployee)).toBe(false);
  });

  it('should be nothing released as read-only, and the reviewer should be correctly assigned as non-Action or Action Performer for the components', () => {
    let pr2 = prComponent(statusEmptyEmployee, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(false);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(false);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer', () => {
    let pr3 = prComponent(statusEmptyEmployee, userCst);
    expect(pr3).toMatchSnapshot();

    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(false);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(false);
  });

  it('should be assigned to HR that they see everything as non-action-performer, and for this status there is nothing released as read-only', () => {
    let pr4 = prComponent(statusEmptyEmployee, userHr);

    expect(pr4).toMatchSnapshot();

    expect(nonActionPerformer(pr4, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr4, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr4, PrComment)).toBe(false);
    expect(readOnly(pr4, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr4, PrSheetEmployee)).toBe(false);
  });

  it('should identify the employee correctly as Action- or non-Action-Performer, and see the Reflection Fields as read-only', () => {
    let pr1 = prComponent(statusFilledEmployee, userEmployee);

    expect(pr1).toMatchSnapshot();

    expect(isActionPerformer(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr1, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr1, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr1, PrComment)).toBe(false);
    expect(readOnly(pr1, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr1, PrSheetEmployee)).toBe(true);
  });

  it('should see reflection fields released as read-only, and the reviewer should be correctly assigned as non-Action or Action Performer for the components', () => {
    let pr2 = prComponent(statusFilledEmployee, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(false);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(true);
  });

  it('should see reflection fields released as read-only, and the reviewer should be correctly assigned as non-Action or Action Performer for the components, and he should be in an error state with marked overallComment Field', () => {
    let pr2 = prComponent(statusEmptyReviewer, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(errorElement(pr2, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(false);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(true);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer statusFilledEmployee', () => {
    let pr3 = prComponent(statusFilledEmployee, userCst);

    expect(pr3).toMatchSnapshot();

    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(false);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(true);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer statusEmptyReviewer', () => {
    let pr3 = prComponent(statusEmptyReviewer, userCst);

    expect(pr3).toMatchSnapshot();

    expect(errorElement(pr3, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(false);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(true);
  });

  it('should be assigned to HR that they see everything as non-action-performer, and for this status they can see the pr-reflections as read-only', () => {
    let pr4 = prComponent(statusFilledEmployee, userHr);

    expect(pr4).toMatchSnapshot();

    expect(nonActionPerformer(pr4, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr4, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr4, PrComment)).toBe(false);
    expect(readOnly(pr4, PrOverallAssessment)).toBe(false);
    expect(readOnly(pr4, PrSheetEmployee)).toBe(true);
  });

  it('should identify the employee correctly as Action- or non-Action-Performer, and be in Read-only state for his reflections and the reviewer ratings', () => {
    let pr1 = prComponent(statusFilledReviewer, userEmployee);

    expect(pr1).toMatchSnapshot();

    expect(isActionPerformer(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr1, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr1, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr1, PrSheetEmployee)).toBe(true);
  });

  it('should be the reflections and ratings released as read-only, and the reviewer should be correctly assigned as non-Action or Action Performer for the components', () => {
    let pr2 = prComponent(statusFilledReviewer, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(true);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer statusFilledReviewer', () => {
    let pr3 = prComponent(statusFilledReviewer, userCst);

    expect(pr3).toMatchSnapshot();

    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(true);
  });

  it('should be assigned to HR that they see everything as non-action-performer, and for this status they see the first two steps as read-only', () => {
    let pr4 = prComponent(statusFilledReviewer, userHr);

    expect(pr4).toMatchSnapshot();

    expect(nonActionPerformer(pr4, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr4, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr4, PrSheetEmployee)).toBe(true);
  });

  it('should identify the employee correctly as Action- or non-Action-Performer, and be in Read-only state for reflections and ratings', () => {
    let pr1 = prComponent(statusFinalizedReviewer, userEmployee);

    expect(pr1).toMatchSnapshot();

    expect(isActionPerformer(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr1, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr1, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr1, PrSheetEmployee)).toBe(true);
  });

  it('should be  in Read-only state for reflections and ratings, and the reviewer should be correctly assigned as non-Action or Action Performer for the components', () => {
    let pr2 = prComponent(statusFinalizedReviewer, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(true);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer statusFinalizedReviewer', () => {
    let pr3 = prComponent(statusFinalizedReviewer, userCst);

    expect(pr3).toMatchSnapshot();

    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(true);
  });

  it('should be assigned to HR that they see everything as non-action-performer, and for this status they can see everything besides the finalCommentEmployee and their own comment as read-only', () => {
    let pr4 = prComponent(statusFinalizedReviewer, userHr);

    expect(pr4).toMatchSnapshot();

    expect(nonActionPerformer(pr4, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentEmployee)).toBe(false);
    expect(readOnly(pr4, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr4, PrSheetEmployee)).toBe(true);
  });

  it('should identify the employee correctly as Action- or non-Action-Performer, and be in Read-only state for reflections, ratings and the finalCommentEmployee', () => {
    let pr1 = prComponent(statusFinalizedEmployee, userEmployee);

    expect(pr1).toMatchSnapshot();

    expect(isActionPerformer(pr1, PrSheetEmployee)).toBe(true);
    expect(isActionPerformer(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr1, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentEmployee)).toBe(true);
    expect(readOnly(pr1, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr1, PrComment)).toBe(true);
    expect(readOnly(pr1, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr1, PrSheetEmployee)).toBe(true);
  });

  it('should be in Read-only state for reflections, ratings and the finalCommentEmployee, and the reviewer should be correctly assigned as non-Action or Action Performer for the components', () => {
    let pr2 = prComponent(statusFinalizedEmployee, userReviewer);

    expect(pr2).toMatchSnapshot();

    expect(nonActionPerformer(pr2, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr2, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentEmployee)).toBe(true);
    expect(readOnly(pr2, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr2, PrComment)).toBe(true);
    expect(readOnly(pr2, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr2, PrSheetEmployee)).toBe(true);
  });

  it('should be completely the same view for the supervisor as it was for the reviewer statusFinalizedEmployee', () => {
    let pr3 = prComponent(statusFinalizedEmployee, userCst);

    expect(pr3).toMatchSnapshot();

    expect(nonActionPerformer(pr3, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(isActionPerformer(pr3, PrOverallAssessment)).toBe(true);
    expect(isActionPerformer(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentEmployee)).toBe(true);
    expect(readOnly(pr3, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr3, PrComment)).toBe(true);
    expect(readOnly(pr3, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr3, PrSheetEmployee)).toBe(true);
  });

  it('should be assigned to HR that they see everything as non-action-performer, and for this status they can see all but their own comment as read-only', () => {
    let pr4 = prComponent(statusFinalizedEmployee, userHr);

    expect(pr4).toMatchSnapshot();

    expect(nonActionPerformer(pr4, PrSheetEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(nonActionPerformer(pr4, PrOverallAssessment)).toBe(true);
    expect(nonActionPerformer(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentEmployee)).toBe(true);
    expect(readOnly(pr4, PrFinalCommentHr)).toBe(false);
    expect(readOnly(pr4, PrComment)).toBe(true);
    expect(readOnly(pr4, PrOverallAssessment)).toBe(true);
    expect(readOnly(pr4, PrSheetEmployee)).toBe(true);
  });
});
