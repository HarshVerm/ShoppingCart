import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { dataReducer } from "./LoadData/reducer";
import { authReducer } from "./User/reducer";
import { cartReducer } from "./AddCart/reducer";
import { contactReducer } from "./Contact/reducer";

const rootReducer = combineReducers({
  products: dataReducer,
  users: authReducer,
  cart: cartReducer,
  contact: contactReducer,
});
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk)),
);
