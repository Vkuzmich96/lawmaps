import { useState } from "react";
import "./form.css";
import { ACTIONS } from "../../redux/constant";
import { useDispatch } from "react-redux";

export const Form = ({ customRef }) => {
  const dispatch = useDispatch();


  const [text, setText] = useState("");

  const inputText = (event) => {
    setText(event.target.value);
  };
  const handleName = () => {
    dispatch({ type: ACTIONS.SEND_NAME, text });
     setText("")
  };

  return (
    <div className="form">
      <div className="inputName">
        <span className="spanName">Name: </span>
        <input
          onChange={inputText}
          ref={customRef}
          className="input_form"
          type="text"
          value={text}
        />
      </div>
      <span>Discription:</span>
      <textarea className="textArea" id="textArea"></textarea>
      <div className="buttonsWrap">
        <button onClick={handleName} className="buttonSend">
          Send
        </button>
      </div>
    </div>
  );
};
