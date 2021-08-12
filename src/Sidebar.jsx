import './dnd.css'
import { useState } from 'react';
import { Form } from './component/Form/Form';
import {ACTIONS} from './redux/constant'
import { useDispatch } from 'react-redux';
export const Sidebar = () => {
  const [toggleForm, setToggleForm] = useState(false);
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
    const dispatch = useDispatch()
  const onClick = () => {
  dispatch({type: ACTIONS.TOGGLE_NODES_IN_FALSE})
    setToggleForm(true)
    console.log(toggleForm)
  }
    return (
      <aside>
      
        <div onMouseDown={onClick}  className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
          Input Node
        </div>
        <div onMouseDown={onClick} className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Default Node
        </div>
        <div onMouseDown={onClick} className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
          Output Node
        </div>
        {toggleForm ? <Form/> : ""}
      </aside>
    );
  };