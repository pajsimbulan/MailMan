import { useState } from 'react';

function useUpdateUser() {
  const [updatedUserInfo, setUpdatedUserInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const updateUserInfo = (newUserData, accessToken) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json ', Authorization: (`jwt ${accessToken.toString()}`) },
      Authorization: (`jwt: ${accessToken.toString()}`),
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        console.log(`returning status ${res.status}`);
        setStatusCode(res.status);
        return res.json();
      })
      .then((jsondata) => {
        setUpdatedUserInfo(jsondata);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Error updating user info, please try again later');
      });
    setLoading(false);
  };
  return {
    updateUserInfo, updatedUserInfo, loading, statusCode, errorMessage,
  };
}

export default useUpdateUser;
