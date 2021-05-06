import axios from 'axios';

const baseURL="https://mmmquickchat.herokuapp.com";

const AxiosConfig=axios.create({
	baseURL:baseURL
});

export default AxiosConfig;