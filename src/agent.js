import axios from 'axios';

let token
const API_ROOT = 'http://localhost:3200/';

const setToken = (_token) => { 
  token = _token;
  console.log("Token saved", token)
}

axios.defaults.baseURL = API_ROOT;

if (token) {
  axios.defaults.headers.common.Authorization = token;
}

const getHeaders = () => {
  return token ?
   { "authid": token, "Content-Type": "application/json" } :
   { "Content-Type": "application/json" }

}

// const getResponseData = res => res.data;
const getJsonResponse = res => res.json();

// const request = {
//   get: url => axios.get(url).then(getResponseData),
//   post: (url, body) => axios.post(url, body).then(getResponseData),
//   delete: (url, body) => axios.post(url, body).then(getResponseData),
// };

const request = {
  get(url) {
    return fetch(url, { headers: getHeaders() }).then(getJsonResponse)
  },
  post(url, body) {
    return fetch(url, { method: "POST", body: JSON.stringify(body), headers: getHeaders() }).then(getJsonResponse)
  },
  put(url, body) {
    return fetch(url, { method: "PUT", body: JSON.stringify(body), headers: getHeaders() }).then(getJsonResponse)
  },
  delete(url) {
    return fetch(url, { method: "DELETE", headers: getHeaders() }).then(getJsonResponse)
  }
}

const Poll = {
  // _getAll: () => request.get('/polls/all'),
  getAll: () => request.get('/polls'),
  create: body => request.post('/polls', body),
  circle: circleId => request.get(`/polls/circle/${circleId}`),
  get: pollId => request.get(`/polls/${pollId}`),
  delete: pollId => request.delete(`/polls/${pollId}`),
  search: query => request.get(`/polls/search?q=${query}`),
  vote: (pollId, optionId) => request.post(`/polls/${pollId}/vote/${optionId}`),
};

const Circle = {
  // _getAll: () => request.get('/circles/all'),
  getAll: () => request.get('/circles'),
  user: userId => request.get(`/circles/user/${userId}`),
  create: body => request.post('/circles', body),
  get: circleId => request.get(`/circles/${circleId}`),
  edit: (cirlceId, body) => request.post(`/circles/${cirlceId}`, body),
  delete: cirlceId => request.delete(`/circles/${cirlceId}`),
  search: query => request.get(`/circles/search?q=${query}`),
  join: cirlceId => request.post(`/circles/${cirlceId}/join`),
  fellows: cirlceId => request.get(`/circles/${cirlceId}/fellows`),
  addAdmin: (payload, circleId) => request.post(`/circles/${circleId}/admins`, payload),
  addfellow: (payload, circleId) => request.post(`/circles/${circleId}/fellows`, payload),
  removeAdmin: (payload, circleId) => request.delete(`/circles/${circleId}/admins`, payload),
  removefellow: (payload, circleId) => request.delete(`/circles/${circleId}/fellows`, payload),
};

const User = {
  // _getAll: () => request.get('/users/all'),
  getAll: () => request.get('/users/'),
  get: username => request.get(`/users/${username}`),
  getMe: () => request.get('/users/me'),
  signup: body => request.post('/users', body),
  login: body => request.post('/users/login', body),
  search: query => request.get(`/users/search?q=${query}`),
  followers: userId => request.get(`/users/${userId}/followers`),
  following: userId => request.get(`/users/${userId}/following`),
  editProfile: () => request.put('/users/'),
  verify: body => request.post('/users/verify', body),
  verifyMail: body => request.post('/users/verify_mail', body),
  verifyUsername: body => request.post('/users/verify_username', body),
  favouritePoll: pollId => request.post(`/users/star/${pollId}`),
  unfavouritePoll: pollId => request.post(`/users/star/${pollId}`),
};

export default {
  setToken,
  Poll,
  Circle,
  User,
};
