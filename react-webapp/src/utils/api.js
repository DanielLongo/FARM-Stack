import { API_ENDPOINT } from '../constants';
// import useAxios from './useAxios';
import customAxios from './useAxios';
import Fetch from './Fetch';
export const testSecureEndpoint = async () => {
    console.log("testSecureEndpoint")
    let requestOptions = {
        method: 'GET',
        credentials: "include"
    }
    let res = await Fetch(`${API_ENDPOINT}/users/secret`, requestOptions)

    // const axios = customAxios();

    // const response = await axios.get("/users/secret", {withCredentials: true});
    

    // const request = new Request(`${API_ENDPOINT}/users/secret`, {
    //     method: "GET",
    //     headers: {
    //         Authorization: "token"
    //     },
    //     credentials: "include"
    // });
    // const response = await fetch(request);
    // window.location.href = "/"
    console.log("response", res);

}


