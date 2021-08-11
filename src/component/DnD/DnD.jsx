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
import { useEffect } from "react";
import { ACTIONS } from "../../redux/constant";

const initialElements = [];
let id = 0;

const getId = () => `dndnode_${id++}`;

export const DnD = () => {
    const dispatch = useDispatch()
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

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
      x: event.clientX - reactFlowBounds.left - 115,
      y: event.clientY - reactFlowBounds.top - 22,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((els) => els.concat(newNode));
    dispatch({type: ACTIONS.CHECK_IS_WORK, newNode})
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Background style={{ position: "absolute", zIndex: "-100" }} />
        <Sidebar />
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
