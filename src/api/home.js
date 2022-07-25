import {
    post,
    get
} from '.';



export const getCategories = () => {
    return get("/categories")
}