import axios from 'axios';
import { setLoading } from '../modules/defaults';
import { setToastMessage } from '../modules/toast';
import store from '../store';

const bread = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://175.45.201.158:8000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

bread.defaults.headers.get['Content-Type'] = `application/json`;

bread.interceptors.response.use(
    function (res) {
        store.dispatch(setLoading(false));
        return res;
    },
    function (err) {
        store.dispatch(setToastMessage(err.message));
        store.dispatch(setLoading(false));

        // return Promise.reject(err);
    }
);

export default bread;
