document.getType = (data) => {
  if (typeof data === 'object') {
    if (typeof data.length !== 'undefined') {
      if (data.length > 0) {
        return `Array<${document.getType(data[0])}>`
      } else {
        return 'Array<any>'
      }
    }
    const keys = Object.keys(data)
    if (keys.length === 0) {
      return 'object'
    }
    let a = Object.keys(data).map(v => {
      const type = document.getType(data[v])
      return `${v}: ${type}`
    }).join(',\n')
    a = `{\n${a}\n}`
    return a
  } else {
    return typeof data
  }
}
