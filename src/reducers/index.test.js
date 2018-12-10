import reducers from './index';
import app from './index';
import moment from 'moment-timezone';
import * as dispatchTypes from '../helper/dispatchTypes';
import { prTabEnum } from '../helper/prTabEnum';

describe('reducers', () => {
  it('should return combined reducers', () => {
    expect(reducers).toBeInstanceOf(Function);
  });

  describe('LOGOUT and LOGIN_UNAUTHORIZED dispatch', () => {
    [
      { type: dispatchTypes.LOGIN_UNAUTHORIZED, isUnautherized: true },
      { type: dispatchTypes.LOGOUT, isUnautherized: false }
    ].forEach(state => {
      it(`should wipe state if ${state.type} is dispatched`, () => {
        let someValue = 'someValue';
        const action = {
          type: state.type
        };
        const stateBefore = {
          appointmentsSearchResults: [someValue],
          errors: {
            hasErrors: false,
            message: { someValue }
          },
          filter: { someValue },
          filterPossibilities: { someValue },
          finalCommentEmployee: { someValue },
          isLoading: [someValue],
          login: {
            isLoggedIn: true,
            isUnauthorized: false
          },
          newPrId: 22,
          prDetailId: 21,
          prEmployeeContributions: {
            prEmployeeContribution: [someValue]
          },
          prRatings: { someValue },
          prTabs: prTabEnum.SCHEDULE_VIEW,
          prs: { someValue },
          requiredFields: { employee: false, reviewer: true },
          employeeSearchResults: [someValue],
          tablePrs: { someValue },
          selectedDate: 'someValue',
          sortOrderPrs: 'des',
          userinfo: { someValue },
          userphoto: '',
          userroles: [someValue]
        };

        const stateAfter = app(stateBefore, action);

        expect(stateAfter).toEqual({
          appointmentsSearchResults: [],
          errors: {
            hasErrors: false,
            message: null
          },
          filter: {},
          filterPossibilities: {},
          finalCommentEmployee: {},
          finalCommentHr: {},
          isLoading: [],
          login: {
            isLoggedIn: false,
            isUnauthorized: state.isUnautherized
          },
          meeting: null,
          newPrId: null,
          prDetailId: 0,
          prEmployeeContributions: [],
          prRatings: {},
          prTabs: prTabEnum.DETAIL_VIEW,
          prTargetRole: {
            prGetTargetRole: []
          },
          prFinalizationStatusById: {
            prFinalizationStatus: {
              isFinalizedByEmployee: false,
              isFinalizedByReviewer: false
            }
          },
          prs: {},
          requiredFields: { employee: true, reviewer: true },
          employeeSearchResults: [],
          tablePrs: {},
          selectedDate: moment.tz('Europe/Berlin').format('YYYY-MM-DDTHH:mmZ'),
          sortOrderPrs: 'desc',
          userinfo: {},
          userphoto: '',
          userroles: []
        });
      });
    });
  });
});
