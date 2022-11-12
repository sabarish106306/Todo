import { combineReducers, createStore } from "redux";
import todoReducer from "../reducer/todoReducer";

const rootReducer = combineReducers({
  todo: todoReducer,
});

const store = createStore(rootReducer);
export default store;
