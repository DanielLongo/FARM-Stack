import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'

const cookies = new Cookies();
export class TokenStorage {
    static storeToken(key, value, refreshEndpointOnly) {
        console.log("set cookie", key, value, refreshEndpointOnly)
        // get expiration of token 
        let decoded = jwt(value);
        let expirationDate = new Date(decoded.exp * 1000);

        // create http only secure cookie samestite strict
        // let options = { path: '/', secure: true, expires: expirationDate, httpOnly: true, /* sameSite: 'strict' */ };
        // if (refreshEndpointOnly) {
        //     options["path"] = "/refresh";
        // }
        let options = {path : '/', secure: true }; // , expires: expirationDate, httpOnly: true };
        // if (refreshEndpointOnly) {
        //     options["path"] = "/refresh";
        // }
        // let options = {path : '/'};
        cookies.set(key, value, options);
    }
    // static setItem(key, value) {
    //     console.log("set cookie", key, value)
    //     // create http only secure cookie samestite strict
    //     // TODO: uncomment sameSite: 'strict'
    //     // let options = { path: '/', httpOnly: true, secure: true, /* sameSite: 'strict' */ };
    //     let options = { path: '/' } //, httpOnly: true, secure: true, /* sameSite: 'strict' */ };
    //     // if (refreshEndpointOnly) {
    //     //     options["path"] = "/refresh";
    //     // }
    //     console.log("set cookie", key, value, options)
    //     cookies.set(key, value, options);
    //     console.log("cookies", cookies.getAll())
        
    // }
    static removeItem(key) {
        cookies.remove(key, { path: '/' });
    }
}

