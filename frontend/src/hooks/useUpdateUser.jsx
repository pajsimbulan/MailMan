import { useState } from 'react';

function useUpdateUser() {
  const [updatedUserInfo, setUpdatedUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const updateUserInfo = async (newUserData, accessToken) => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json ', Authorization: (`jwt ${accessToken.toString()}`) },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
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
