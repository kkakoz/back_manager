import OSS from 'ali-oss'
import {
    get
} from '.'


export const oss = () => {
    return get('/oss/get-conf')
}


export function put(name, File, data) {
    console.log("data = ", data)
    const client = new OSS({
        region: data.region,
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        bucket: data.bucket,
    })
    return client.put(name, File)
}

export default {
    put
}

