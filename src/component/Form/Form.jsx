
import './form.css'
export const Form = () => {
    return (
        <div className="form">
            <div className='inputName'>
                <span className='spanName'>Name: </span>
            <input className='input_form' type="text" />
            </div>
            <span>Discription:</span>
            <textarea className='textArea'  id="textArea" ></textarea>
            <div className='buttonsWrap'><button className='buttonSend'>Send</button></div>
        </div>
    )
}


