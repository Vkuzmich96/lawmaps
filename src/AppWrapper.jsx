import App from "./App";

import { Provider } from 'react-redux'
import { store } from './redux/store'

function AppWrapper(){
    return (
        <Provider store={store}>
        <App/>
      </Provider>  
    )
}
export default AppWrapper;