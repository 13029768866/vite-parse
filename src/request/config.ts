let BASE_URL = '';
const TIME_OUT = 15000;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/';
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = '';
} else {
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT };
