import {
    post,
    get
} from '.';

export const resourceList = data => {
    return get(`/resource/page-list`, data)
}

export const getResources = videoId => {
    return get(`/resource/get`)
}

export const addResource = data => {
    return post('/resource/add-list', data)
}