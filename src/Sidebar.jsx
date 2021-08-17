import './dnd.css'
import { useState } from 'react';
import { Form } from './component/Form/Form';
import {ACTIONS} from './redux/constant'
import { useDispatch } from 'react-redux';
export const Sidebar = ({customRef}) => {
  
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
    const dispatch = useDispatch()
 
    return (
      <aside>
      
        <div  className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
          Input
        </div>
        <div  className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Default
        </div>
        <div  className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
          Output
        </div>
         {/* <Form customRef={customRef}/>  */}
      </aside>
    );
  };