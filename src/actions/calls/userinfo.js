import {
  default as fetch,
  default as authorizedFetch
} from '../../helper/customFetch';
import ROLES from '../../helper/roles';

export const getUserPhoto = async userinfoContext => {
  let response = await fetch(
    `${process.env.REACT_APP_API}/oauth2/userinfo/photo`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'image/jpeg'
      }
    }
  );

  if (response.ok) {
    let buffer = await response.arrayBuffer();

    let base64Flag = 'data:image/jpeg;base64,';
    let base64ImageString = arrayBufferToBase64(buffer);
    let imageString = base64Flag + base64ImageString;

    //update state of userinfo
    const userinfo = userinfoContext.value;
    userinfo.userphoto = imageString;
    userinfoContext.setValue(userinfo);
  }
};

export const getUserInfo = async userinfoContext => {
  let userinfoResponse = null;
  let rolesResponse = null;
  let reviewerInfoResponse = null;

  //Fetching userinfo
  let response = await authorizedFetch(
    `${process.env.REACT_APP_API}/oauth2/userinfo`,
    {
      mode: 'cors'
    }
  );

  if (response.ok) {
    userinfoResponse = await response.json();
  }

  //Fetching groups
  response = await authorizedFetch(
    `${process.env.REACT_APP_API}/oauth2/userinfo/groups`,
    {
      mode: 'cors'
    }
  );

  if (response.ok) {
    rolesResponse = await response.json();
    //ROLEHACK: HR
    rolesResponse.value[0].displayName = 'PR_CST_Leiter';
  }

  response = await fetch(`${process.env.REACT_APP_API}/api/v3/user`);

  if (response.ok) {
    const result = await response.json();
    reviewerInfoResponse = result ? result : [];
    console.log('RESPONSE: ', reviewerInfoResponse);
  } else {
    //TODO: use errorContext? and insert status code with error
  }

  const userinfo = userinfoContext.value;
  if (userinfoResponse != null) {
    userinfo.userinfo = userinfoResponse;
    userinfo.userinfo.username = userinfoResponse.userPrincipalName
      ? userinfoResponse.userPrincipalName
      : '';
    userinfo.userinfo.username = userinfo.userinfo.username.replace(
      '@polaris.senacor.com',
      ''
    );
  }
  if (rolesResponse != null) {
    userinfo.userroles = convertGroupsToArray(rolesResponse);
  }

  if (reviewerInfoResponse != null) {
    for (let key in reviewerInfoResponse) {
      userinfo.userinfo[key] = reviewerInfoResponse[key];
      //Expected fields:
      // userId, numberOfPrsToReview, numberOfPrsToSupervise,
      // prsNotFilledByReviewer, prsNotFilledByEmployee, idOfNewestOpenPr,
      // deadlineOfNewestOpenPr, hasSupervisor, hasPrInProgress,
    }
    console.log('SUPER CONTEXT:', userinfo);
    userinfoContext.setValue(userinfo);
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
