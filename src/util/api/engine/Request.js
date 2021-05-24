import axios from 'axios';
// import store from 'store';
import BrowserProvider from '../../browser/BrowserProvider';
import APIProvider from '../../api/url/APIProvider';

import { getRefreshToken, getToken, login, logout, isLoggedIn, getInfo, storePermission } from '../../TokenProvider';

// let user = store.get('user');
// let loggedIn = store.get('loggedIn');
let refreshRequest = undefined;
let reGetPermissionRequest = undefined;
const Request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_STATE + process.env.REACT_APP_BASE_URL_PATH,
});

Request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (isLoggedIn()) {
        try {
          refreshRequest =
            refreshRequest ||
            axios.post(process.env.REACT_APP_BASE_URL_STATE + process.env.REACT_APP_BASE_URL_PATH + APIProvider.getUrl('REFRESH_TOKEN') + '?refreshToken=' + getRefreshToken(), {
              headers: { Authentication: getToken() },
            });
          const res = await refreshRequest;
          if (res.status === 200) {
            login(res.data);
            refreshRequest = undefined;
            reGetPermissionRequest =
              reGetPermissionRequest ||
              axios.get(process.env.REACT_APP_BASE_URL_STATE + process.env.REACT_APP_BASE_URL_PATH + `${APIProvider.getUrl('USER_FIND_PERMISSION')}?id=${getInfo().userId}`, {
                headers: { Authentication: getToken() },
              });
            const getPermissionRes = await reGetPermissionRequest;
            if (getPermissionRes.status === 200) {
              storePermission(getPermissionRes.data);
              reGetPermissionRequest = undefined;
              error.config = {
                ...error.config,
                headers: {
                  ...error.config.headers,
                  Authentication: res.data.accessToken,
                },
              };
              return axios.request(error.config);
            }
          }
        } catch (e) {
          console.log(e);
        }

        logout();
        window.location.replace(BrowserProvider.getUrl('LOGIN'));
      }
    }
    throw error;
  },
);

export default Request;
