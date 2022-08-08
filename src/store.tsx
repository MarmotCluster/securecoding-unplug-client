import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';

export default createStore(rootReducer);
