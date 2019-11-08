import {
  default as fetch,
  default as authorizedFetch
} from '../helper/customFetch';
import cloneDeep from '../helper/cloneDeep';
import ROLES from '../helper/roles';

export const getUserInfo = async (userinfoContext, error, authContext) => {
  try {
    let userinfo = cloneDeep(userinfoContext.value);

    //Fetching userinfo
    let response = await authorizedFetch(
      `${process.env.REACT_APP_API}/oauth2/userinfo`,
      {
        mode: 'cors'
      }
    );

    if (!response.ok) {
      authContext.setValue({
        unauthorized: true,
        invalidCredentials: false
      });
    }

    const userinfoResponse = await response.json();

    if (userinfoResponse !== null) {
      userinfo.userinfo = userinfoResponse;
      userinfo.userinfo.username = userinfoResponse.userPrincipalName
        ? userinfoResponse.userPrincipalName
        : '';
      userinfo.userinfo.username = userinfo.userinfo.username.replace(
        '@polaris.senacor.com',
        ''
      );
    }

    //Fetching reviewer info
    response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/employee/overview`
    );
    if (!response.ok) {
      authContext.setValue(true);
    }
    const result = await response.json();
    const reviewerInfoResponse = result ? result : [];

    if (reviewerInfoResponse !== null) {
      for (let key in reviewerInfoResponse) {
        userinfo.userinfo[key] = reviewerInfoResponse[key];
        //Expected fields:
        // userId, numberOfPrsToReview, numberOfPrsToSupervise,
        // prsNotFilledByReviewer, prsNotFilledByEmployee, idOfNewestOpenPr,
        // deadlineOfNewestOpenPr, hasSupervisor, hasPrInProgress,
      }
      userinfo.userroles = reviewerInfoResponse.roles;
      userinfoContext.setValue(userinfo);

      //ROLEHACK
      // if (userinfo && userinfo.userinfo && userinfo.userinfo.username) {
      //   console.log('userroles', userinfo.userroles);
      //   const usernameValue = userinfo.userinfo.username;
      //   const roleMatrix = {
      //     'test.pr.mitarbeiter1': ['PR_Mitarbeiter'],
      //     'test.pr.mitarbeiter2': ['PR_Mitarbeiter'],
      //     'test.pr.vorgesetzter': ['PR_CST_Leiter'],
      //     'test.pr.beurteiler': ['PR_Mitarbeiter', 'PR_CST_Leiter'],
      //     'test.pr.hr': ['PR_HR'],
      //     'mpiroh': [ROLES.DEVELOPER]
      //   };
      //   if (Object.keys(roleMatrix).find(el => el === usernameValue)) {
      //     userinfo.userroles = roleMatrix[usernameValue];
      //   }
      // }
    }

    //Fetching photo
    if (
      userinfo.userphoto === '' &&
      !userinfo.userroles.includes(ROLES.ADMIN)
    ) {
      let response = await fetch(
        `${process.env.REACT_APP_API}/oauth2/userinfo/photo`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'image/jpeg'
          }
        }
      );

      if (response.status === 200) {
        let buffer = await response.arrayBuffer();

        let base64Flag = 'data:image/jpeg;base64,';
        let base64ImageString = arrayBufferToBase64(buffer);
        let imageString = base64Flag + base64ImageString;

        //update state of userinfo
        userinfo = cloneDeep(userinfo);
        userinfo.userphoto = imageString;
        userinfoContext.setValue(userinfo);
      }
    }
  } catch (err) {
    error.showGeneral();
  }
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}
