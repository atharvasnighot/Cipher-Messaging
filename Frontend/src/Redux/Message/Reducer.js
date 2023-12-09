import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

const initialState = {
  messages: [],
  newMessage: null,
};

export const messageReducer = (store = initialState, { type, payload }) => {
  if (type === CREATE_NEW_MESSAGE) {
    return { ...store, newMessage: payload };
  } else if (type === GET_ALL_MESSAGE) {
    return { ...store, messages: payload };
  }
  return store;
};
