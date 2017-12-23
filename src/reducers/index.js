import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import circle from "./circle";
import circles from "./circles";
import common from "./common";
import poll from "./poll";
import polls from "./polls";
import user from "./user";

export default combineReducers({
  router: routerReducer,
  circle,
  circles,
  common,
  poll,
  polls,
  user,
})