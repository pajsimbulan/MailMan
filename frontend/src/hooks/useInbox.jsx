import { useState } from 'react';

const useInbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getInbox = async (userId, inboxName, accessToken, pageNumber = 1, limit = 10) => {
    let tempStatusCode = null;
    setLoading(true);

    await fetch(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION}/user/${userId}/inbox/${inboxName}?page=${pageNumber}&limit=${limit}`, {
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
        setEmails(jsondata.emails);
        setPaginationData(jsondata.paginationData);
      })
      .catch(() => {
        if (tempStatusCode === 404) {
          setErrorMessage('Error: Inbox doesn\'t exist');
        } else {
          setErrorMessage('Error: Failed to fetch inbox');
        }
      });

    setLoading(false);
  };

  return {
    getInbox,
    emails,
    paginationData,
    loading,
    statusCode,
    errorMessage,
  };
};

export default useInbox;
