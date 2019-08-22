import {
  default as fetch,
  default as authorizedFetch
} from '../../helper/customFetch';
import ROLES from '../../helper/roles';
import cloneDeep from '../../helper/cloneDeep';

export const getUserInfo = async (userinfoContext, errorContext) => {
  try {
    let userinfo = cloneDeep(userinfoContext.value);
    let userinfoResponse = null;
    let rolesResponse = null;
    let reviewerInfoResponse = null;

    //Fetching groups
    let response = await authorizedFetch(
      `${process.env.REACT_APP_API}/oauth2/userinfo/groups`,
      {
        mode: 'cors'
      }
    );
    rolesResponse = await response.json();
    //ROLEHACK: HR
    // rolesResponse.value[0].displayName = 'PR_Mitarbeiter';
    // rolesResponse.value[0].displayName = 'PR_CST_Leiter';
    rolesResponse.value[0].displayName = 'PR_HR';

    userinfo.userroles = convertGroupsToArray(rolesResponse);
    userinfoContext.setValue(userinfo);
    userinfo = cloneDeep(userinfo);

    //Fetching userinfo
    response = await authorizedFetch(
      `${process.env.REACT_APP_API}/oauth2/userinfo`,
      {
        mode: 'cors'
      }
    );

    userinfoResponse = await response.json();

    userinfo.userinfo = userinfoResponse;
    userinfo.userinfo.username = userinfoResponse.userPrincipalName
      ? userinfoResponse.userPrincipalName
      : '';
    userinfo.userinfo.username = userinfo.userinfo.username.replace(
      '@polaris.senacor.com',
      ''
    );

    userinfoContext.setValue(userinfo);
    userinfo = cloneDeep(userinfo);

    //Fetching reviewer info
    response = await fetch(`${process.env.REACT_APP_API}/api/v3/user`);
    const result = await response.json();
    reviewerInfoResponse = result ? result : [];

    for (let key in reviewerInfoResponse) {
      userinfo.userinfo[key] = reviewerInfoResponse[key];
      //Expected fields:
      // userId, numberOfPrsToReview, numberOfPrsToSupervise,
      // prsNotFilledByReviewer, prsNotFilledByEmployee, idOfNewestOpenPr,
      // deadlineOfNewestOpenPr, hasSupervisor, hasPrInProgress,
    }
    userinfoContext.setValue(userinfo);

    //Fetching photo
    if (userinfo.userphoto === '') {
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
      } else return;
    }
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}

function convertGroupsToArray(adGroups) {
  if (adGroups && adGroups.value) {
    return adGroups.value.map(group => group.displayName);
  }

  return [ROLES.PR_MITARBEITER];
}
