'use strict'

const util = require('util')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return util.promisify((cid, opts, callback) => {
    if (typeof cid == 'function') {
      callback = cid
      cid = undefined
    }
    if(typeof opts == 'function') {
      callback = opts
      if(cid == 'string') {
        opts = undefined
      }
      else{
        opts = cid
        cid = undefined
      }
    }

    var syncPath = 'pins/sync'
    if (cid) {
      syncPath = `pins/${cid}/sync`
    }

    send({
      method: 'POST',
      path: syncPath,
      qs: opts
    }, callback)
  })
}
