import { ACTIONS } from "../constant";

const defaultState = {
   nodes : [],
   edges : []
  };
  export function lawmapReducer(state  , action) {
    switch (action.type) {
      case ACTIONS.CHECK_IS_WORK: {
      let newNodes = [...state.nodes, action.newNode]

        return {...state, nodes: newNodes }
       
      }
      case ACTIONS.ADD_EDGE: {
        let newEdges = [...state.edges, action.params, action.params.label='Я люблю React)))' ]
       return {...state, edges: newEdges}
      }

  
      default:
        return defaultState;
    }
  }