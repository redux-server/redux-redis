const Table = require('cli-table')

var table = new Table({ head: ['Verb', 'Path'], colWidths: [10, 70] })

function RestTableView (routes) {
  console.log('\n API for this service \n')
  console.log('*'.repeat(20))
  for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
      var val = routes[key]
      var _o = {}
      _o[val.method] = [val.spec.path ]
      table.push(_o)
    }
  }
  console.log(table.toString())
  console.log('*'.repeat(20), '\n')

  return table
}

module.exports = RestTableView
