import Cookies from 'universal-cookie';

const cookies = new Cookies();
export class TokenStorage {
    static setItem(key, value) {
        // create http only secure cookie samestite strict
        // todo: add expiration
        cookies.set(key, value, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
    }
    static removeItem(key) {
        cookies.remove(key, { path: '/' });
    }
    static setLoggedInStatus(status) {
        cookies.set("isLoggedIn", status, { path: '/'});
    }
    static isLoggedIn() {
        return cookies.get("isLoggedIn") === "true";
    }
  }

  