import http from "./httpService";
const apiEndpoint = "/device";

export async function addNewDevice(data) {
  let res = await http.post(`${apiEndpoint}`, data);
  return res.data;
}
