import axios from 'axios';

const baseURL="https://condescending-albattani-ffb1e8.netlify.app";

const AxiosConfig=axios.create({
	baseURL:baseURL
});

export default AxiosConfig;