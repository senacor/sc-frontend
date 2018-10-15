import reducers from './index';
import app from './index';
import { LOGOUT } from '../helper/dispatchTypes';
import moment from 'moment-timezone';

describe('reducers', () => {
  it('should return combined reducers', () => {
    expect(reducers).toBeInstanceOf(Function);
  });

  describe('LOGOUT dispatch', () => {
    it('should wipe state', () => {
      let someValue = 'someValue';
      const action = {
        type: LOGOUT
      };
      const stateBefore = {
        appointmentsSearchResults: [someValue],
        cstMembers: [someValue],
        editTasks: {
          isChanging: false,
          list: [someValue]
        },
        errors: {
          hasErrors: false,
          message: null
        },
        events: [someValue],
        humanResourcesPrs: { someValue },
        filter: { someValue },
        finalCommentEmployee: { someValue },
        isLoading: false,
        login: {
          isLoggedIn: true,
          isUnauthorized: false
        },
        prDetailId: 0,
        prEmployeeContributions: {
          prEmployeeContribution: [someValue]
        },
        prRatings: { someValue },
        prVisibilityById: {
          prVisibility: {
            toEmployee: false,
            toSupervisor: false
          }
        },
        prs: { someValue },
        search: {
          prSearchResults: [someValue]
        },
        selectedDate: 'someValue',
        sortOrderPrs: 'des',
        tasks: {
          list: [someValue]
        },
        userinfo: { someValue },
        userphoto: '',
        userroles: [someValue]
      };

      const stateAfter = app(stateBefore, action);

      expect(stateAfter).toEqual({
        appointmentsSearchResults: [],
        cstMembers: [],
        editTasks: {
          isChanging: false,
          list: []
        },
        errors: {
          hasErrors: false,
          message: null
        },
        events: [],
        filter: [],
        finalCommentEmployee: {},
        humanResourcesPrs: {},
        isLoading: false,
        login: {
          isLoggedIn: false,
          isUnauthorized: false
        },
        meeting: null,
        prDetailId: 0,
        prEmployeeContributions: [],
        prRatings: {},
        prTargetRole: {
          prGetTargetRole: []
        },
        prVisibilityById: {
          prVisibility: {
            toEmployee: false,
            toSupervisor: false
          }
        },
        prFinalizationStatusById: {
          prFinalizationStatus: {
            isFinalizedByEmployee: false,
            isFinalizedByReviewer: false
          }
        },
        prs: {},
        search: {
          prSearchResults: []
        },
        selectedDate: moment.tz('Europe/Berlin').format('YYYY-MM-DDTHH:mmZ'),
        sortOrderPrs: 'desc',
        tasks: {
          list: []
        },
        userinfo: {},
        userphoto: '',
        userroles: []
      });
    });
  });
});
