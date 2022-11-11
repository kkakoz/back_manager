


export function snake2camel (data) {
    if (typeof data !== 'object' || !data) { return data }
    if (Array.isArray(data)) { return data.map(item => snake2camel(item)) }
    const newData = {}
    for (const key in data) {
        const newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase())
        newData[newKey] = snake2camel(data[key])
    }
    return newData
}

export function camel2snake (data) {
    if (typeof data !== 'object' || !data) { return data }
    if (Array.isArray(data)) { return data.map(item => camel2snake(item)) }
    const newData = {}
    for (const key in data) {
        const newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`)
        newData[newKey] = camel2snake(data[key])
    }
    return newData
}