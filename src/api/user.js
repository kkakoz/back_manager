import {
    post,
    get
} from '.';

export const login = data => {
    return post("/users/login", data)
}

export const register = data => {
    return post("/users", data)
}

export const current = () => {
    return get("/users/local")
}