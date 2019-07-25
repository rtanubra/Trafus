export default {
  API_ENDPOINT: process.env.NODE_ENV==="development"?process.env.REACT_APP_BASE_URL_DEV:process.env.REACT_APP_BASE_URL,
  //use this to explicitly work production
  //API_ENDPOINT: process.env.REACT_APP_BASE_URL,
  //use this to explicitly work development
  //API_ENDPOINT:process.env.REACT_APP_BASE_URL_DEV,
  LOCAL:true,
  API_KEY: process.env.REACT_APP_API_KEY,

}