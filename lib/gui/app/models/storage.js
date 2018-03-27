

class Storage {
  constructor (superkey) {
    this.superkey = superkey
  }

  getRaw () {
    try {
      // JSON.parse(null) === null, so we have to fallback to {}
      return JSON.parse(window.localStorage.getItem(this.superkey)) || {}
    } catch (err) {
      return {}
    }
  }

  get (key, def) {
    console.log(this.getRaw())
    const value = this.getRaw()[key]

    if (value === undefined) {
      return def
    }

    return value
  }

  modify (key, func, def) {
    const json = this.getRaw()

    let result
    if (json[key] === undefined) {
      result = func(def)
    } else {
      result = func(json[key])
    }

    window.localStorage.setItem(this.superkey, JSON.stringify(_.assign(json, { [key]: result })))
    return result
  }
}

module.exports = Storage
