import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from 'react-flow-renderer';
import '../../dnd.css'
import '../../style.scss'
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../redux/constant';



const initialElements = [];


function getID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

const DnDFlow = () => {
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
    event.dataTransfer.dropEffect = 'move';
  };
  const dispatch = useDispatch()
  const state = useSelector(i => i.lawmapReducer.Nodes)

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getID(),
      type,
      position,
      data: { label: `${type} node` },
    };
    console.log(elements)
    setElements((es) => es.concat(newNode));
    
  };
  const [value, setValue] = useState('')


  const checkNode = (event) => {
      let id;
  if(event.target.attributes[1] !== undefined ){
    id = event.target.attributes[1].value
    
  }

  }

  useEffect(() => {
    dispatch({type: ACTIONS.GET_NODES, elements})
  },[elements])

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={state}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={checkNode}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar  />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;