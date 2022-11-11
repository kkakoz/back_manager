import {
    post,
    get
} from '.';

export const login = data => {
    return post("/user/login", data)
}

export const register = data => {
    return post("/user", data)
}

export const profile = () => {
    return get("/user/local")
}


export const current = () => {
    return get("/user/current")
}
