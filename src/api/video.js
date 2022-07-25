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

