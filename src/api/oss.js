// import OSS from 'ali-oss'
// import {
//     OSSURL
// } from '@/services/api'
// import {
//     request,
//     METHOD
// } from '@/utils/request'


// export async function oss() {
//     return request(OSSURL, METHOD.GET, {})
// }


// export async function put(name, File) {
//     var res = await oss()
//     var data = res.data
//     console.log("data = ", data)
//     const client = new OSS({
//         region: data.region,
//         accessKeyId: data.accessKeyId,
//         accessKeySecret: data.accessKeySecret,
//         bucket: data.bucket,
//     })
//     return client.put(name, File)
// }

// export default {
//     put
// }