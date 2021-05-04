import env from './../config/config';

const BASE_URL = `${env[process.env.REACT_APP_ENV].url}/api_v1`;
//const BASE_URL = `http://3.18.112.149:8080/api_v1`;

export default BASE_URL