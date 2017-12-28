const Setting = use('Renka/Setting/Model')

class SettingsManager {
  constructor (options) {
    this._settings = {}
    this._options = {
      preload: true
    }

    this._options = Object.assign({}, this._options, options)
  }
  /**
   * @description preload is async called on the Boot time we save the data in memory for faster access later
   */
  async _preload () {
    const settingsResults = await Setting.query().where('autoload', '=', true)

    if (settingsResults && settingsResults.length) {
      return
    }

    // Make an Object fronm the results array for faster/simpler access later
    settingsResults.forEach(setting => {
      this._settings[setting.name] = setting.value
    })
  }
  /**
   *
   * @param {String|Array} name
   * @returns {String|Object}
   */
  get (name, single = false) {
    // cast to  Array for simpler usage
    const options = Array.isArray(name) ? name : [name]
    let result = {}

    // When its just single we return the first value
    if (single) {
      console.log(this._settings[options[0]])
      return this._settings[options[0]]
    }

    Object.keys(this._settings).forEach(key => {
      if (typeof this._settings[key].value !== 'undefined') {
        result[key] = this._settings[key].value
      }
    })

    return result
    // return singleIsPossible ? result[0].value : result
  }
  save (name, value, autoload = true) {}
  /**
  *
  * @param {String} name
  * @param {String} value
  * @param {Boolean} autoload
  */
  async update (name, value, autoload = true) {
    const data = { name, value, autoload }

    const setting = await Setting.findBy('name', name)
    // When we found setting we merge the data (update)
    if (setting) {
      setting.merge(data)
      await setting.save()
    } else {
      // When setting is null we create a new entry in the database
      await Setting.create(data)
    }
    // Add or Update the Object
    this._settings[data.name] = data.value
    // Todo: check for some errors
    // we just return the passed settings
    return data
  }
  /**
   *
   * @param {String} name
   */
  async remove (name) {}
}

module.exports = SettingsManager
