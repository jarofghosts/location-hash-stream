const through = require('through2')

module.exports = locationHashStream

function locationHashStream ({stripHash = false} = {}) {
  const stream = through({encoding: 'utf8'}, write, end)

  window.addEventListener('hashchange', emitHash)

  stream.push(getHash())

  stream.getHash = getHash

  return stream

  function write (data, _, next) {
    window.location.hash = data.toString()

    next()
  }

  function end (done) {
    window.removeEventListener('hashchange', emitHash)

    done()
  }

  function getHash () {
    return window.location.hash.slice(stripHash ? 1 : 0)
  }

  function emitHash () {
    stream.push(getHash())
  }
}
