import axios from "axios";

export default axios.create({
  baseURL: "http://172.17.0.2:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});