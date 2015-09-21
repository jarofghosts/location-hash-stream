const test = require('tape')

const hashStream = require('../lib')

test('emits hash changes', t => {
  t.plan(1)

  const stream = hashStream()

  stream.on('data', data => {
    t.equal(data, '#lol')
    stream.end()
    stream.destroy()
  })

  window.location.hash = 'lol'
})

test('sets hash on write', t => {
  t.plan(1)

  const stream = hashStream()

  stream.write('lol')

  t.equal(window.location.hash, '#lol')
  stream.end()
  stream.destroy()
})

test('configurable to strip hash on emit', t => {
  t.plan(2)

  const stream = hashStream({stripHash: true})

  stream.once('data', (data) => {
    // first emit is of the current hash, before change
    t.equal(data, 'lol')
    stream.once('data', data => {
      t.equal(data, 'rofl')
      stream.end()
      stream.destroy()
    })
  })

  window.location.hash = 'rofl'
})

test('.getHash() reads current hash', t => {
  t.plan(1)

  window.location.hash = 'lmbo'

  const stream = hashStream()

  t.equal(stream.getHash(), '#lmbo')

  stream.end()
  stream.destroy()
})

test('.getHash() respects stripHash', t => {
  t.plan(1)

  window.location.hash = 'laffo'

  const stream = hashStream({stripHash: true})

  t.equal(stream.getHash(), 'laffo')

  stream.end()
  stream.destroy()
})
