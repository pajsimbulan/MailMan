import { useState, useEffect } from 'react';

const useInbox = (userId, inboxName, accessToken, timeframe, search = '', currentPage = 1, currentLimit = 10) => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [statusCode, setStatusCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(currentLimit);

  const getInbox = async () => {
    let tempStatusCode = null;
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}/user/${userId}/inbox/${inboxName}?page=${page}&limit=${limit}&timeframe=${timeframe}&search=${search}`, {
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
        //console.log(`jsondata.pagination: ${JSON.stringify(jsondata.pagination)}`);
        setPaginationData({
          ...jsondata.pagination,
          page: parseInt(jsondata.pagination.page, 10),
          limit: parseInt(jsondata.pagination.limit, 10),
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

  useEffect(() => {
    getInbox();
  }, [userId, inboxName, accessToken, page, limit]);

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
