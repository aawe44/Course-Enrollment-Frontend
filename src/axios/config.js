import axios from "axios";

import cookie from "react-cookies"

import { JWT_COOKIE_NAME } from "../constant";

const jwt = cookie.load(JWT_COOKIE_NAME);

export default axios.create(
    {
        baseURL: "http://localhost:8080",
        headers: jwt ? {
            Authorization: `Bearer ${jwt}`
        } : {}
    }
)