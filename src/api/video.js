import {
    post,
    get
} from '.';

export const getVideos = data => {
    return get(`/videos`, data)
}

export const getVideo = videoId => {
    return get(`/videos/${videoId}`)
}

export const addVideo = data => {
    console.log("data = ", data)
    return post('/videos', data)
}