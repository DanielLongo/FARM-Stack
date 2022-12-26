import Cookies from 'universal-cookie';

const cookies = new Cookies();
export class TokenStorage {
    static setItem(key, value, refreshEndpointOnly = false) {
        // create http only secure cookie samestite strict
        // todo: add expiration
        let options = { path: '/', httpOnly: true, secure: true, /* sameSite: 'strict' */ };
        if (refreshEndpointOnly) {
            options["path"] = "/refresh";
        }
        cookies.set(key, value, options);
    }
    static removeItem(key) {
        cookies.remove(key, { path: '/' });
    }
}

