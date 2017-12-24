import axios from 'axios';

let token;
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
  _getAll: () => request.get('/polls/all'),
  getAll: () => request.get('/polls'),
  create: body => request.post('/polls', body),
  get: pollId => request.get(`/polls/${pollId}`),
  delete: pollId => request.delete(`/polls/${pollId}`),
  search: query => request.get(`/polls/search?q=${query}`),
  vote: (pollId, optionId) => request.post(`/polls/${pollId}/vote/${optionId}`),
};

const Circle = {
  _getAll: () => request.get('/circles/all'),
  getAll: () => request.get('/circles'),
  create: body => request.post('/circles', body),
  get: circleId => request.get(`/circles/${circleId}`),
  edit: (cirlceID, body) => request.post(`/circles/${cirlceID}`, body),
  delete: cirlceID => request.delete(`/circles/${cirlceID}`),
  search: query => request.get(`/circles/search?q=${query}`),
  join: cirlceID => request.post(`/circles/${cirlceID}/join`),
  addAdmin: (circleId, adminId) => request.post(`/circles/${circleId}/admin/${adminId}`),
  addfellow: (circleId, fellowId) => request.post(`/circles/${circleId}/fellow/${fellowId}`),
  removeAdmin: (circleId, adminId) => request.delete(`/circles/${circleId}/admin/${adminId}`),
  removefellow: (circleId, fellowId) => request.delete(`/circles/${circleId}/fellow/${fellowId}`),
};

const User = {
  _getAll: () => request.get('/users/all'),
  get: () => request.get('/users/'),
  signup: body => request.post('/users', body),
  login: body => request.post('/users/login', body),
  getSelf: () => request.get('/users'),
  search: query => request.get(`/users/search?q=${query}`),
  getUser: username => request.get(`/users/${username}`),
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
