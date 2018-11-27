import PerformanceReviewTableService from './PerformanceReviewTableService';
import FILTER_GROUPS from './filterGroups';

describe('PerformanceReviewTableService', () => {
  let filterPossibilities = {
    competences: ['DEVELOPMENT', 'CONSULTING'],
    levels: ['1', '2'],
    occasions: ['ON_DEMAND', 'YEARLY', 'END_PROBATION'],
    overallAssessments: ['1', '2', '3', '4', '5'],
    projectCsts: ['ACD_BOOT', 'DEV_CAMP']
  };

  it('prAlreadyDelegated should return true if reviewer is not supervisor', () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.HR,
      filterPossibilities
    );
    const pr = {
      supervisor: { login: 'mbock' },
      reviewer: { login: 'mmitarbeiterin' }
    };

    expect(prTableService.prAlreadyDelegated(pr)).toEqual(true);
  });

  it('prDelegable should return true if pr is delegable', () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.HR,
      filterPossibilities
    );
    const pr = {
      supervisor: { login: 'mbock' },
      reviewer: { login: 'mmitarbeiterin' },
      reviewerPreparationDone: false
    };

    expect(prTableService.prDelegable(pr, 'mbock')).toEqual(true);
  });
});
