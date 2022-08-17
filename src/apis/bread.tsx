import axios from 'axios';
import { setLoading } from '../modules/defaults';
import { setToastMessage } from '../modules/toast';
import store from '../store';

const bread = axios.create({
    baseURL: 'http://localhost:8000',
    // withCredentials: true,
});

bread.interceptors.response.use(
    function (res) {
        // return res;
        store.dispatch(setLoading(false));
    },
    function (err) {
        store.dispatch(setToastMessage(err.message));
        store.dispatch(setLoading(false));

        // return Promise.reject(err);
    }
);

export default bread;
