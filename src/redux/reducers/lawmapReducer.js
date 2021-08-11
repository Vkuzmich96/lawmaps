import { ACTIONS } from "../constant";

const defaultState = {
   nodes : []
  };
  export function lawmapReducer(state  , action) {
    switch (action.type) {
      case ACTIONS.CHECK_IS_WORK: {
      let newNodes = [...state.nodes, action.newNode]

        return {...state, nodes: newNodes }
       
      }

  
      default:
        return defaultState;
    }
  }