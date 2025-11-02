import axios from "axios";

export const BaseUrl = axios.create({
  baseURL: `http://51.21.80.203:8080`,
  // baseURL: `http://localhost:8080`,
});

// import axios from "axios";

// export const BaseUrl = axios.create({
//   baseURL: `http://localhost:8080`,
// });
