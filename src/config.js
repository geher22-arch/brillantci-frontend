const PROD_URL = "https://brillantci-api.onrender.com";
const DEV_URL = "http://localhost:3000";
const API = window.location.hostname === 'localhost' ? DEV_URL : PROD_URL;
export default API;
