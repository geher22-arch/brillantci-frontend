const API = process.env.REACT_APP_API_URL
  || (window.location.hostname === 'localhost' ? "http://localhost:3000" : "https://brillantci-api.onrender.com");
export default API;
