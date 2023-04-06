import { useState } from 'react';

const useSignUp = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitSignUp = async (email, password, firstName, lastName) => {
    let tempStatusCode = null;
    setLoading(true);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password, firstName, lastName,
      }),
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        if ((res.status === 403) || (res.status === 404)) {
          throw new Error(statusCode);
        }
        setAccountCreated(true);
      })
      .catch(() => {
        if (tempStatusCode === 403) {
          setErrorMessage('Error: Account already exists');
        } else {
          setErrorMessage("Error: Make sure to fill up the form correctly.  Forms with '  *  ' are required");
        }
      });
    setLoading(false);
  };

  return {
    submitSignUp, accountCreated, loading, statusCode, errorMessage,
  };
};

export default useSignUp;
