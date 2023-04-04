import http from "./httpService";
const apiEndpoint = "/device";

export async function addNewDevice(data) {
  let res = await http.post(`${apiEndpoint}`, data);
  return res.data;
}

export async function getDevices(pageNo, perPage) {
  let res = await http.get(
    `${apiEndpoint}/?pageNo=${pageNo}&perPage=${perPage}`
  );
  return res.data;
}

export async function getDeviceById(id) {
  let res = await http.get(`${apiEndpoint}/${id}`);
  return res.data;
}

export async function deleteDeviceById(id) {
  let res = await http.delete(`${apiEndpoint}/${id}`);
  return res.data;
}

export async function updateDeviceById(id, data) {
  let res = await http.put(`${apiEndpoint}/${id}`, data);
  return res.data;
}

export async function getDeviceByImei(imei) {
  let res = await http.get(`${apiEndpoint}/imei/${imei}`);
  return res.data;
}

export async function searchDevices(pageNo, perPage, search) {
  console.log(search);
  let res = await http.get(`${apiEndpoint}/search`, {
    params: {
      pageNo: pageNo,
      perPage: perPage,
      ...search,
    },
  });
  return res.data;
}
