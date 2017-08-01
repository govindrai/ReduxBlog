import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

function postsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      let arrayToObjPayload = {};
      action.payload.data.forEach(post => (arrayToObjPayload[post.id] = post));
      return arrayToObjPayload;
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      const { [action.payload]: id, ...revisedState } = state;
      return revisedState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts: postsReducer,
  form: formReducer
});

export default rootReducer;
