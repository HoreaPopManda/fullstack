const { test } = require('node:test')
const assert = require('node:assert')

const baseUrl = 'http://localhost:3001/api/notes'

test('create, read, update, delete note through local server', async () => {
  const createRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'test note from api', important: true }),
  })

  assert.strictEqual(createRes.status, 200)
  const created = await createRes.json()
  assert.strictEqual(created.content, 'test note from api')
  assert.strictEqual(created.important, true)
  const noteId = created.id || created._id

  const getRes = await fetch(`${baseUrl}/${noteId}`)
  assert.strictEqual(getRes.status, 200)
  const fetched = await getRes.json()
  assert.strictEqual(fetched.content, 'test note from api')
  assert.strictEqual(fetched.important, true)

  const updateRes = await fetch(`${baseUrl}/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'updated note', important: false }),
  })
  assert.strictEqual(updateRes.status, 200)
  const updated = await updateRes.json()
  assert.strictEqual(updated.content, 'updated note')
  assert.strictEqual(updated.important, false)

  const deleteRes = await fetch(`${baseUrl}/${noteId}`, { method: 'DELETE' })
  assert.strictEqual(deleteRes.status, 204)

  const getAfterRes = await fetch(`${baseUrl}/${noteId}`)
  assert.strictEqual(getAfterRes.status, 404)
})
