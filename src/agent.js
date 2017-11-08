import axios from 'axios';

const API_ROOT = 'http://localhost:3200/';

let token = "59ffe53d507d1009b03447fa";
axios.defaults.baseURL = API_ROOT;

if (token) {
  axios.defaults.headers.common.Authorization = token;
}
const headers = { "authid": token, "Content-Type": "application/json" } 

// const getResponseData = res => res.data;
const getJsonResponse = res => res.json();

// const request = {
//   get: url => axios.get(url).then(getResponseData),
//   post: (url, body) => axios.post(url, body).then(getResponseData),
//   delete: (url, body) => axios.post(url, body).then(getResponseData),
// };

const request = {
  get(url, body) {
    return fetch(url, { headers }).then(getJsonResponse)
  },
  post(url, body) {
    return fetch(url, { method: "POST", body: JSON.stringify(body), headers }).then(getJsonResponse)
  },
  delete(url) {
    return fetch(url, { method: "DELETE", headers }).then(getJsonResponse)
  }
}

const Poll = {
  _getAll: () => request.get('/polls/all'),
  getAll: () => request.get('/polls'),
  create: body => request.post('/polls', body),
  get: pollId => request.get(`/polls/${pollId}`),
  delete: pollId => request.delete(`/polls/${pollId}`),
  edit: (pollId, body) => request.post(`/polls/${pollId}`, body),
  vote: (pollId, option) => request.post(`/polls/${pollId}/vote/${option}`),
};

const Circle = {
  _getAll: () => request.get('/circles/all'),
  getAll: () => request.get('/circles'),
  create: body => request.post('/circles', body),
  get: circleId => request.get(`/circles/${circleId}`),
  edit: (cirlceID, body) => request.post(`/circles/${cirlceID}`, body),
  delete: cirlceID => request.delete(`/circles/${cirlceID}`),
  join: cirlceID => request.post(`/circles/${cirlceID}/join`),
  removeAdmin: (circleId, adminId) => request.delete(`/circles/${circleId}/admin/${adminId}`),
  removefellow: (circleId, fellowId) => request.delete(`/circles/${circleId}/fellow/${fellowId}`),
};

const User = {
  _getAll: () => request.get('/users/all'),
  getSelf: () => request.get('/users'),
  getAuser: userId => request.get(`/users/${userId}`),
  editProfile: () => request.put('/users/'),
  favouritePoll: pollId => request.post(`/users/star/${pollId}`),
  unfavouritePoll: pollId => request.post(`/users/star/${pollId}`),
};

export default {
  setToken: (_token) => { token = _token; },
  Poll,
  Circle,
  User,
};
