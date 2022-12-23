import { API_ENDPOINT } from '../constants';

export const testSecureEndpoint = async () => {
    const request = new Request(`${API_ENDPOINT}/users/secret`, {
        method: "GET",
        headers: {
            Authorization: "token"
        },
        credentials: "include"
    });
    const response = await fetch(request);
    console.log("response", response);
}


