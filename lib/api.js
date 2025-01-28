import axios from 'axios';
import { Auth, Hub } from 'aws-amplify';

let jwt_id_token = null;
let isListener = false;

function retrieveCurrentToken() {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((data) => {
        const token = data.getIdToken().getJwtToken();
        setJwtIdToken(token);
        resolve(token);
      })
      .catch((err) => reject(err));
  });
}

const authListener = (data) => {
  switch (data.payload.event) {
    case 'autoSignIn':
    case 'configured':
    case 'tokenRefresh':
    case 'signIn':
    case 'signOut':
      retrieveCurrentToken()
        .then(() => {
          console.log('token refreshed');
        })
        .catch(() => {
          console.log('token refresh failed');
        });
      break;
  }
};

function createAxiosInstance(path = '') {
  axios.defaults.headers.common['Authorization'] = jwt_id_token;
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`,
    withCredentials: false,
    headers: {
      Authorization: `${jwt_id_token}`,
    },
  });
}

const setJwtIdToken = (token) => {
  jwt_id_token = token;
  api = createAxiosInstance('applicant');
};

const initialize = async () => {
  await retrieveCurrentToken().catch((e) => {
    console.log('initialize: retrieveCurrentToken - err', e);
  });

  if (!isListener) {
    Hub.listen('auth', authListener);
    isListener = true;
  }
};

initialize();

export var api = createAxiosInstance('applicant');
export var api_public = createAxiosInstance('public/v1');
export var api_webhook = createAxiosInstance('webhooks');
