import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./auth";
import circle from "./circle";
import circles from "./circles";
import currentUser from "./currentUser";
import common from "./common";
import poll from "./poll";
import polls from "./polls";
import search from "./search";
import user from "./user";
import users from "./users";

export default combineReducers({
  router: routerReducer,
  auth,
  circle,
  circles,
  common,
  currentUser,
  poll,
  polls,
  search,
  user,
  users,
})