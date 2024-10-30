import axios from 'axios';

const config = axios.create({
  baseURL: 'https://buybestthemes.com/mobile_app_api/pet_saver/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default config;