import { Background } from "react-flow-renderer";
// import "./flow.css";
// import "./dnd.css";
import "./App.css";
import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";

import { Sidebar } from "./Sidebar";

const initialElements = [{}];

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [element, setElements] = useState(initialElements);
  const onConnect = () =>
    setElements((els) =>
      addEdge(
        {
          id: "e5-7",
          type: "step",
          style: { stroke: "#f6ab6c" },
          label: "a step edge",
          animated: true,
          labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
        },
        els
      )
    );
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

    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Background style={{ position: "absolute", zIndex: "-100" }} />
        <Sidebar />
        <Controls />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={element}
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
}

export default App;
