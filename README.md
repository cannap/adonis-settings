```js
'use strict'

const Schema = use('Schema')

class CreateSystemSchema extends Schema {
  up () {
    this.create('options', table => {
      table.increments()
      table.timestamps()
      table.string('name').unique()
      table.boolean('value')
      table.boolean('autoload').defaultsTo(false)
    })
  }

  down () {
    this.drop('options')
  }
}

module.exports = CreateSystemSchema
```