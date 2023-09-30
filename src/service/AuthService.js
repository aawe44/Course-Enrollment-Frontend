// import axios from "axios";

import axios from "../axios/config"


export const AuthService = {
    getJWT: function (username, password) {

        return axios.post("/api/authenticate", {
            "username": username,
            "password": password
        });
    }
}