const {
  ServiceProvider
} = require('@adonisjs/fold')

class SettingsProvider extends ServiceProvider {
  register () {
    // Register Model
    this.app.bind('Renka/Setting/Model', () => {
      const Option = require('../src/Models/Option')
      Option._bootIfNotBooted()
      return Option
    })

    // Register SettingsManager Class
    this.app.singleton('Renka/SettingManager', () => {
      return new (require('../src/Setting/SettingsManager.js'))()
    })

    this.app.alias('Renka/SettingManager', 'Setting')
  }
  async boot (app) {
    // Check preload is true
    // Todo: Use Config
    const setting = this.app.use('Setting')
    await setting._preload()
  }
}

module.exports = SettingsProvider
