import { post } from "."


export const addCollection = data => {
    console.log("data = ", data)
    return post('/collections', data)
}