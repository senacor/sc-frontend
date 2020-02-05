import { default as fetch } from '../helper/customFetch';
import cloneDeep from '../helper/cloneDeep';
import ROLES from '../helper/roles';

export const getUserInfo = async (userinfoContext, error, authContext) => {
  try {
    let userinfo = cloneDeep(userinfoContext.value);

    let response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/overview`
    );
    if (!response.ok) {
      authContext.setValue(true);
    }
    const result = await response.json();
    const reviewerInfoResponse = result ? result : [];

    if (reviewerInfoResponse !== null) {
      for (let key in reviewerInfoResponse) {
        userinfo.userinfo[key] = reviewerInfoResponse[key];
      }
      userinfo.userroles = reviewerInfoResponse.roles;
      userinfoContext.setValue(userinfo);
    }

    //Fetching photo
    if (
      userinfo.userphoto === '' &&
      !userinfo.userroles.includes(ROLES.ADMIN) &&
      !userinfo.userroles.includes(ROLES.PERSONAL_DEV)
    ) {
      let response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/employee/photo`,
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
