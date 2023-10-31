import axios from 'axios';

const customFetch = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  },
});

export default customFetch;
