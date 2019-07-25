export default {
  //use this if you deploy
  API_ENDPOINT: process.env.NODE_ENV==="development"?process.env.REACT_APP_BASE_URL_DEV:process.env.REACT_APP_BASE_URL,
  //API_ENDPOINT: process.env.REACT_APP_BASE_URL,
  //use this instead when we are developing
  //API_ENDPOINT:process.env.REACT_APP_BASE_URL_DEV,
  LOCAL:true,
  API_KEY: process.env.REACT_APP_API_KEY,

}
