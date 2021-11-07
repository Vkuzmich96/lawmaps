
import './form.scss'
export const Form = ({...props}) => {

    return (
        <div className="form_wrap">
            <input className="name" placeholder="name"></input>
            <hr />
            <textarea id="description" className="description" placeholder="description" ></textarea>
            <hr />
            <input className="file" type="file"></input>
            <hr />
            <button className="save">Save</button>
            <button className="delete_node">Delete node</button>
        </div>
    )
}