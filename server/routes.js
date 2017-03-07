const paylike = require('paylike')
const express = require('express')
const router = express.Router()

const { CREDINTIALS, MAXIMUM_MERCHANTS } = require('./constants')
const client = paylike(CREDINTIALS.key)


/*** Router search
****/
router.get('/search', (req, res) => {

  const { name } = req.query

  client.apps.merchants.find(CREDINTIALS.id)
    .filter({ name })
    .limit(MAXIMUM_MERCHANTS)
    .toArray()
    .then(merchants => res.status(200).json({ merchants }))
    .catch(error => res.status(500).json({ error }))

})


/*** Router edit - update
****/
router.put('/merchant', (req, res) => {

  const { name, email, descriptor, id } = req.body

  client.merchants.update(id, { name, email, descriptor })
    .then(merchant => res.status(200).json({ merchant }))
    .catch(error => res.status(500).json({ error }))


})


module.exports = router
