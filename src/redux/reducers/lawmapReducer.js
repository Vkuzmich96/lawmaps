import { ACTIONS } from "../constant";

const defaultState = {
   nodes : [],
   edges : []
   
  };
  export function lawmapReducer( state = defaultState  , action) {
    switch (action.type) {
      case ACTIONS.CHECK_IS_WORK: {
      let newNodes = [...state.nodes, {node: action.newNode, toggle: true} ]

        return {...state, nodes: newNodes }
       
      }
      case ACTIONS.ADD_EDGE: {
        let newEdges = [...state.edges, action.params, action.params.label='Я люблю React)))' ]
       return {...state, edges: newEdges}
      }
      case ACTIONS.TOGGLE_NODES_IN_FALSE: {
        state.nodes.forEach( (i)=> i.toggle = false
          );
      }

  
      default:
        return state; 
    }
  }