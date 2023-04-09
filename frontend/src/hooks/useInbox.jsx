import { useState } from 'react';

const useInbox = () => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getInbox = async (userId, inboxName, accessToken, pageNumber = 1, limit = 10) => {
    let tempStatusCode = null;
    setLoading(true);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/user/${userId}/inbox/${inboxName}?page=${pageNumber}&limit=${limit}`, {
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
        setInbox(jsondata.inbox);
        setPaginationData({
          ...jsondata.pagination,
          page: parseInt(jsondata.pagination.page, 10),
          limit: parseInt(jsondata.pagination.limit, 10)
        });
        
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
    inbox,
    page,
    limit,
    paginationData,
    setPage,
    setLimit,
    loading,
    statusCode,
    errorMessage,
  };
};

export default useInbox;
