import { ACTIONS } from "../constant";

const defaultState = {
 
};
export function lawmapReducer(state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.GET_NODES : {
      let Nodes = action.elements
      return {...state, Nodes}
    }
    case ACTIONS.GET_ID: {
      
    }
    default:
      return state;
  }
}
