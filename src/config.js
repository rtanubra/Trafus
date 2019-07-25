export default {
<<<<<<< HEAD
  API_ENDPOINT: process.env.NODE_ENV==="development"?process.env.REACT_APP_BASE_URL_DEV:process.env.REACT_APP_BASE_URL,
  //use this to explicitly work production
  //API_ENDPOINT: process.env.REACT_APP_BASE_URL,
  //use this to explicitly work development
=======
  //use this if you deploy
  API_ENDPOINT: process.env.REACT_APP_BASE_URL,
  //use this instead when we are developing
>>>>>>> UI/v1.1
  //API_ENDPOINT:process.env.REACT_APP_BASE_URL_DEV,
  LOCAL:true,
  API_KEY: process.env.REACT_APP_API_KEY,

}
