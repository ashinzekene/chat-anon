import axios from 'axios';

const API_ROOT = 'http://localhost:3200/';

let token = null;
axios.defaults.baseURL = API_ROOT;

if (token) {
  axios.defaults.headers.common.Authorization = token;
}

const getResponseData = res => res.data;

const request = {
  get: url => axios.get(url).then(getResponseData),
  post: (url, body) => axios.post(url, body).then(getResponseData),
  delete: (url, body) => axios.post(url, body).then(getResponseData),
};

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
  get: circleId => request.get(`/polls/${circleId}`),
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
