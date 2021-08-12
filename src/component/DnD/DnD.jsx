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
import { Form } from "../Form/Form";
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
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((els) => els.concat(newNode));
    dispatch({ type: ACTIONS.CHECK_IS_WORK, newNode });
  };
  const checkAll = (event) => {
    if (
      event.target.className ===
        "react-flow__node react-flow__node-default selected selectable" ||
      "react-flow__node react-flow__node-default selected selectable" 
    ) {
      console.log("e");
    } else {
      console.log(event.target.className);
    }
  };

  return (
    <div onClick={checkAll} className="dndflow">
      <ReactFlowProvider>
        <Background style={{ position: "absolute", zIndex: "-100" }} />
        <Sidebar onDrop={onDrop} />

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
