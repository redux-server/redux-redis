const vorpal = require('vorpal')()
const config = require('../config')
const client = require('../lib/redis')(config)
const constants = require('../utils/constants')

let id = '123'
let defaults = {
  'ERROR': new Error('CLI ERROR'),
  'ADD_TODO': {payload: { id, done: false, todo: 'Buy Milk' }},
  'GET_TODO': {payload: { id }},
  'UPDATE_TODO': {payload: { id, done: false, todo: 'Buy Milk' }},
  'DELETE_TODO': {payload: { id, done: false, todo: 'Buy Milk' }}
}

vorpal
  .command('pub')
  .option('-c, --count')
  .action(function (args) {
    return this.prompt({
      type: 'list',
      name: 'type',
      message: 'What type of action should I dispatch',
      paginated: true,
      choices: Object.keys(constants)
    })
    .then(answers => {
      console.log(answers)
      return answers
    })
    .then(choice => {
      client.publish(config.redis.inbound, JSON.stringify(defaults[choice.type]))
    })
  })

vorpal
  .delimiter('redux-server$')
  .show()
vorpal
  .catch('[words...]', 'Catches incorrect commands')
  .action(function (args, cb) {
    this.log(args.words.join(' ') + ' is not a valid command.');
    process.nextTick(cb)
  })

setTimeout(() => {
  vorpal.ui.submit('help')
}, 2000)
