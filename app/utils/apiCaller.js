/* eslint-disable import/named */
// eslint-disable-next-line import/no-unresolved
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from './constants';
import 'react-toastify/dist/ReactToastify.css';

const toastTify = err => {
  toast.error(err, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default function callApi(enpoint, method = 'get', body) {
  return axios({
    method,
    url: `${API_URL}${enpoint}`,
    data: body,
  }).catch(err => {
    toastTify(err.message);
  });
}
