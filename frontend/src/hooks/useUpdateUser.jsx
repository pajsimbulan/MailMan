import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function useUser({ accessToken, userInfo }) {
  const [data, setData] = useState(undefined);
  const statusCode = useRef(undefined);

  async function getUserInfo() {
    fetch('http://localhost:4000/v0/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ', Authorization: (`jwt ${accessToken.toString()}`) },
      body: JSON.stringify(userInfo),
    }).then((res) => {
      statusCode.current = res.status;
      return res.json();
    })
      .then((jsondata) => {
        setData(jsondata);
        return { data, statusCode };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateUserInfo(newUserData) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/v0/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json ', Authorization: (`jwt ${accessToken.toString()}`) },
        body: JSON.stringify(newUserData),
      })
        .then((res) => {
          console.log(`returning status ${res.status}`);
          resolve(res.status);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  async function updatePassword(firstName, email, newPassword) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/v0/changePassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          newPassword,
        }),
      })
        .then((res) => {
          console.log(`returning status ${res.status}`);
          resolve(res.status);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  useEffect(() => { getUserInfo(); }, []);

  return {
    data, statusCode, getUserInfo, updateUserInfo, updatePassword,
  };
}

useUser.propTypes = {
  accessToken: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default useUser;
