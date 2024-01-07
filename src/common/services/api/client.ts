import axios from 'axios';
import 'dotenv/config';

axios.defaults.baseURL = process.env.API_BASE_URL;
export default axios.create({});
