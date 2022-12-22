import { authToken } from './auth';
import { API_ENDPOINT } from '../constants';

export const testSecureEndpoint = async () => {
    const token = await authToken();
    const request = new Request(`${API_ENDPOINT}/users/me`, {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
    const response = await fetch(request);
    console.log("response", response);
}


