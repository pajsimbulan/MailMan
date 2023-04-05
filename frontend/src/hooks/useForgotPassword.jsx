import { useState } from 'react';

const useForgotPassword = () => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitForgotPassword = async (email, newPassword, firstName) => {
    setLoading(true);
    let tempStatusCode = null;
    await fetch(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION}/changePassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, newPassword, firstName,
      }),
    }).then((res) => {
      tempStatusCode = res.status;
      setStatusCode(res.status);
      setPasswordChanged(true);
    })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Account doesn't exist");
        } else {
          setErrorMessage("Error: Invalid Input.  Make sure to fill up the form correctly.  Forms with '  *  ' are required");
        }
      });
    setLoading(false);
  };

  return {
    passwordChanged, loading, statusCode, errorMessage, submitForgotPassword,
  };
};

export default useForgotPassword;
