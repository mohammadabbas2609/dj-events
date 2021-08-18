import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allEventReducer,
  createEventReducer,
  eventDetailReducer,
  eventReducer,
  myEventReducer,
  updateEventReducer,
} from "./reducers/eventReducer";
import {
  getProfileReducer,
  loginReducer,
  registerReducer,
  updateProfileReducer,
} from "./reducers/userReducers";
import { __DJ_EVENTS_USER } from "./constants/localStorageConstant";

const reducer = combineReducers({
  event: eventReducer,
  eventDetail: eventDetailReducer,
  allEvent: allEventReducer,
  myEvents: myEventReducer,
  createEvent: createEventReducer,
  updateEvent: updateEventReducer,
  login: loginReducer,
  register: registerReducer,
  getProfile: getProfileReducer,
  updateProfile: updateProfileReducer,
});

const USER_FROM_LOCAL = localStorage.getItem(__DJ_EVENTS_USER)
  ? JSON.parse(localStorage.getItem(__DJ_EVENTS_USER))
  : "";

const initialState = {
  login: {
    userInfo: USER_FROM_LOCAL,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
