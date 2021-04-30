import axios from 'axios';

const baseURL="http://localhost:4000";

const AxiosConfig=axios.create({
	baseURL:baseURL
});

export default AxiosConfig;