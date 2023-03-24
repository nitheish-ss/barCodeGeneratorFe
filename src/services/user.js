import http from "./httpService";
import { getJwt } from "./auth";
import jwtDecode from "jwt-decode";

const apiEndpoint = "users";

http.setJwt(getJwt());

export function getMe() {
  return http.get(`${apiEndpoint}/me`,{headers:{
    "cache-control": "no-cache" 
  }});
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
