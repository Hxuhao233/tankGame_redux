
let state = {};

export const getState = () => state;

export const setState = newState => Object.assign(state, newState);
