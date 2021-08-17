import "../../dnd.css";
import { Background } from "react-flow-renderer";
import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { Sidebar } from "../../Sidebar";

import { ACTIONS } from "../../redux/constant";

const initialElements = [];
let id = 0;

const getId = () => `dndnode_${id++}`;

export const DnD = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) =>
    setElements((els) => {
      dispatch({ type: ACTIONS.ADD_EDGE, params });
      return addEdge(params, els);
    });

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => {
      return removeElements(elementsToRemove, els);
    });
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 80,
      y: event.clientY - reactFlowBounds.top - 20,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: {
        label: (
          <>
            <h2>{`${type} node`}</h2>
            <hr/>
            <div>{`${type} node`}</div>
            <button style={{width:"150px",height:"25px"}}>option</button>
          </>
        ),
      },
    };

    setElements((els) => els.concat(newNode));
    dispatch({ type: ACTIONS.CHECK_IS_WORK, newNode });
  };
  const ref = useRef(null);
  const handleRef = () => {
    ref.current.focus();
  };

  let nodeId;

  const checkAll = (event) => {
    if (event.target.attributes[1] !== undefined) {
      nodeId = event.nativeEvent.path[0].dataset.id;
      dispatch({ type: ACTIONS.CLICKED_NODE, nodeId });
    }
  };

  return (
    <div onClick={checkAll} className="dndflow">
      <ReactFlowProvider>
        <Background style={{ position: "absolute", zIndex: "-100" }} />
        <Sidebar handleRef={handleRef} customRef={ref} onDrop={onDrop} />

        <Controls />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          ></ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};
