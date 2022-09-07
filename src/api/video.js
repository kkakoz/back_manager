import { get, post } from "."


export const addVideo = data => {
    return post('/video/add', data)
}

export const getVideos = (data)=> {
    return get("video/page-list", data)
}