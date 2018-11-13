import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE,
  CHANGE_SORT_ORDER,
  CHANGE_FINAL_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  CHANGE_RATING_TARGETROLE_RESPONSE,
  FETCH_PRS_HR_RESPONSE,
  ADD_TEXT_RESPONSE,
  FETCH_OWN_PRS_RESPONSE,
  FETCH_MEETING_RESPONSE
} from '../helper/dispatchTypes';
import generateMapById from '../helper/generateMapById';
import { generateMapByIdAndRenameId } from '../helper/generateMapById';
import cloneDeep from '../helper/cloneDeep';
import objectGet from 'object-get';
import set from 'object-set';

export const prs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return cloneDeep(generateMapById(action.prs));
    case ADD_PR_RESPONSE:
      return cloneDeep(
        Object.assign({}, state, {
          [action.pr.id]: action.pr
        })
      );
    case DELEGATE_REVIEWER_RESPONSE: {
      let newPr = Object.assign({}, state[action.prNewReviewer.id], {
        reviewer: action.prNewReviewer.reviewer
      });
      return cloneDeep(
        Object.assign({}, state, {
          [action.prNewReviewer.id]: newPr
        })
      );
    }
    case FETCH_PR_BY_ID_RESPONSE: {
      let id = action.prById.id;
      let newPr = Object.assign({}, state[id], action.prById);
      return cloneDeep(
        Object.assign({}, state, {
          [action.prById.id]: newPr
        })
      );
    }
    case ADD_TEXT_RESPONSE: {
      const prReflectionSet = action.payload.prReflectionSet;
      const prId = action.payload.prId;

      return set(cloneDeep(state), `${prId}.prReflectionSet`, prReflectionSet);
    }
    case CHANGE_RATING_TARGETROLE_RESPONSE: {
      const prId = action.payload.prId;
      const targetRoleName = action.payload.targetRoleName;
      const rating = action.payload.rating;

      const prs = cloneDeep(state);
      const targetRoleSet = objectGet(prs, `${prId}.prTargetRoleSet`);

      const indexChangedRating = targetRoleSet.findIndex(
        targetRoleInfo => targetRoleInfo.prTargetRoleName === targetRoleName
      );

      return set(
        prs,
        `${prId}.prTargetRoleSet.${indexChangedRating}.rating`,
        rating
      );
    }

    case CHANGE_FINAL_COMMENT_RESPONSE: {
      const comment = action.payload.comment;
      const prId = action.payload.prId;

      return set(cloneDeep(state), `${prId}.finalCommentEmployee`, comment);
    }
    case FETCH_MEETING_RESPONSE: {
      const meeting = action.meeting;
      if (meeting) {
        let id = action.meeting.prId;
        return set(cloneDeep(state), `${id}.meeting`, meeting);
      } else return state;
    }
    default:
      return state;
  }
};

export const sortOrderPrs = (state = '', action) => {
  if (action.type === CHANGE_SORT_ORDER) {
    return action.sortOrder;
  }

  return 'desc';
};

export const tablePrs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OWN_PRS_RESPONSE:
      return cloneDeep(
        generateMapByIdAndRenameId(action.payload.prTableEntries, 'prId')
      );
    case FETCH_PRS_HR_RESPONSE:
      return cloneDeep(
        generateMapByIdAndRenameId(action.payload.prTableEntries, 'prId')
      );
    case DELEGATE_REVIEWER_RESPONSE: {
      let newPr = Object.assign({}, state[action.prNewReviewer.id], {
        reviewer: action.prNewReviewer.reviewer
      });
      return Object.assign({}, state, {
        [action.prNewReviewer.id]: newPr
      });
    }
    default:
      return state;
  }
};
