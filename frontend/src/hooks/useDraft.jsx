import { useState } from 'react';

const useDraft = () => {
  const [draft, setDraft] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const createDraft = async (userId, to, subject, contents, files, accessToken) => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        userId, to, subject, contents, files,
      }),
    })
      .then((res) => {
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(statusCode);
        }
        return res.json();
      })
      .then((jsondata) => {
        setDraft(jsondata);
      })
      .catch(() => {
        setErrorMessage('Error: Failed to create draft');
      });
    setLoading(false);
  };

  const updateDraft = async (draftId, to, subject, contents, files, accessToken) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/draft`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        draftId, to, subject, contents, files,
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
        setDraft(jsondata.draft);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage('Error: Draft doesn\'t exist');
        } else {
          setErrorMessage('Error: Failed to update draft');
        }
      });
    setLoading(false);
  };

  const getDraft = async (draftId, accessToken) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/draft/${draftId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
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
        setDraft(jsondata);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Draft doesn't exist");
        } else {
          setErrorMessage('Error: Failed to get draft');
        }
      });
    setLoading(false);
  };

  const postDraft = async (
    userId,
    draftId,
    from,
    fromFirstName,
    to,
    subject,
    contents,
    files,
    accessToken,
  ) => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/postDraft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({
        userId, draftId, from, fromFirstName, to, subject, contents, files,
      }),
    })
      .then((res) => {
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
        setErrorMessage('Error: Failed to post draft');
      });
    setLoading(false);
  };

  const deleteDrafts = async (userId, draftIdArray, accessToken) => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/deleteDrafts`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `jwt ${accessToken.toString()}` },
      body: JSON.stringify({ userId, draftIdArray }),
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
        setDraft(null);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage("Error: Draft doesn't exist");
        } else {
          setErrorMessage('Error: Failed to delete drafts');
        }
      });
    setLoading(false);
  };

  return {
    createDraft,
    updateDraft,
    getDraft,
    postDraft,
    deleteDrafts,
    draft,
    loading,
    email,
    statusCode,
    errorMessage,
  };
};

export default useDraft;
