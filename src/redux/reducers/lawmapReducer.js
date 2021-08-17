import { ACTIONS } from "../constant";

const defaultState = {
  nodes: [],
  edges: [],
};
export function lawmapReducer(state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.CHECK_IS_WORK: {
      let newNodes = [
        ...state.nodes,
        { node: action.newNode, clicked: false },
      ];

      return { ...state, nodes: newNodes };
    }
    case ACTIONS.ADD_EDGE: {
      let newEdges = [
        ...state.edges,
        action.params,
        (action.params.label = "React"),
      ];
      return { ...state, edges: newEdges };
    }
    case ACTIONS.SEND_NAME: {
      state.nodes.map((i) =>
        i.clicked ? (i.node.data.label = action.text) : ""
      );
    }
    case ACTIONS.CLICKED_NODE: {
      state.nodes.map((i) => {
        if (i.node.id === action.nodeId) {
          i.clicked = true;
         
        } else if (i.node.id !== action.nodeId && action.nodeId !== undefined) {
          i.clicked = false;
        }
      });
    }

    default:
      return state;
  }
}
