import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import circle from "./circle";
import circles from "./circles";
import currentUser from "./currentUser";
import common from "./common";
import poll from "./poll";
import polls from "./polls";
import user from "./user";
import users from "./users";

export default combineReducers({
  router: routerReducer,
  circle,
  circles,
  currentUser,
  common,
  poll,
  polls,
  user,
  users,
})