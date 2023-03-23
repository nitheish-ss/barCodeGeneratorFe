import http from "./httpService";

const apiEndpoint = "/auth";

export async function login(body) {
	let res = await http.post(`${apiEndpoint}/login`, body);

	const { headers } = res;
	let token = headers["x-auth-token"];
	localStorage.setItem("token", token);

	return res;
}


export function logout() {
	localStorage.removeItem("token");
	window.location = "/";
}

export function getJwt() {
	return localStorage.getItem("token");
}