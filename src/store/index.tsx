import React, { Dispatch } from 'react';

type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};
type State = {
  user: Partial<User>;
};
type Action = { type: 'setUser'; payload: Partial<User> };

export const initialState = {
  user: {},
};
export const reducer = (state: State, { type, payload }: Action) => {
  const map = {
    setUser: () => ({ ...state, user: payload }),
  };
  return map[type]();
};
export const StoreContext = React.createContext<Context>({ state: initialState, dispatch: () => {} });
