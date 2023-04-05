import { useState } from 'react';

const useSignin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitSignIn = async (email, password) => {
    setLoading(true);
    let tempStatusCode = null;
    await fetch(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        return res.json();
      })
      .then((jsondata) => {
        setUserInfo(jsondata.user);
        setAccessToken(jsondata.accessToken);
      }).catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Account doesn't exist");
        } else if (tempStatusCode === 400) {
          setErrorMessage('Error: Invalid Input');
        } else {
          setErrorMessage('Error: Make sure to fill all the required forms');
        }
      });
    setLoading(false);
  };

  return {
    submitSignIn, userInfo, accessToken, loading, statusCode, errorMessage,
  };
};

export default useSignin;
