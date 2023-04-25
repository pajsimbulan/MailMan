import { useState } from 'react';

const useEmail = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getEmail = async (emailId, accessToken) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/email/${emailId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: (`jwt ${accessToken.toString()}`) },
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
        return res.json();
      })
      .then((jsondata) => {
        setEmail(jsondata);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage('Error: Email doesn\'t exist');
        } else {
          setErrorMessage('Error: Please try again later.');
        }
      });
    setLoading(false);
  };

  const moveEmail = async (userId, fromInboxName, toInboxName, emailIdArray, accessToken) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/moveEmail`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        userId, fromInboxName, toInboxName, emailIdArray,
      }),
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
        return res.json();
      })
      .then(() => {
        getEmail(emailIdArray[0], accessToken);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Inbox doesn't exist");
        } else {
          setErrorMessage('Error: Please try again later.');
        }
      });
    setLoading(false);
  };

  const sendEmail = async (
    userId,
    from,
    fromFirstName,
    to,
    subject,
    contents,
    files,
    photos,
    accessToken,
  ) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        userId, from, fromFirstName, to, subject, contents, files, photos,
      }),
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
        return res.json();
      })
      .then((jsondata) => {
        setEmail(jsondata.email);
      })
      .catch(() => {
        if (tempStatusCode === 500) {
          setErrorMessage('Error: Failed to send email');
        } else {
          setErrorMessage('Error: Please try again later.');
        }
      });
    setLoading(false);
  };

  const replyEmail = async (
    userEmail,
    userFirstName,
    originalEmailId,
    contents,
    files,
    photos,
    accessToken,
  ) => {
    let tempStatusCode = null;
    setLoading(true);
    console.log(`beginning of replyEmail: ${userEmail} ${userFirstName} ${originalEmailId} ${contents} ${files} ${photos} ${accessToken}`);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        userEmail, userFirstName, originalEmailId, contents, files, photos,
      }),
    })
      .then((res) => {
        tempStatusCode = res.status;
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
        return res.json();
      })
      .then((jsondata) => {
        setEmail(jsondata.reply);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Email doesn't exist");
        } else {
          setErrorMessage('Error: Please try again later.');
        }
      });
    setLoading(false);
    console.log(`end of replyEmail: ${contents}`);
  };

  return {
    getEmail,
    moveEmail,
    sendEmail,
    replyEmail,
    email,
    loading,
    statusCode,
    errorMessage,
  };
};

export default useEmail;
